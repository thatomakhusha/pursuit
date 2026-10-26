
"use server";

import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function changePassword(formData: FormData): Promise<void> {
    const newPassword = formData.get("new_password");
    const confirmPassword = formData.get("confirm_password");

    if (
        typeof newPassword !== "string" ||
        typeof confirmPassword !== "string" ||
        newPassword.length < 8
    ) {
        redirect("/settings?password_error=invalid");
    }

    if (newPassword !== confirmPassword) {
        redirect("/settings?password_error=mismatch");
    }

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        redirect("/settings?password_error=failed");
    }

    redirect("/settings?password=updated");
}

export async function downloadData(): Promise<{
    error?: string;
    data?: {
        filename: string;
        content: string;
    };
}> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Please sign in before downloading your data." };
    }

    const [
        { data: profile, error: profileError },
        { data: applications, error: applicationsError },
        { data: statusHistory, error: historyError },
    ] = await Promise.all([
        supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle(),

        supabase
            .from("applications")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false }),

        supabase
            .from("status_history")
            .select("*")
            .eq("user_id", user.id)
            .order("changed_at", { ascending: false }),
    ]);

    if (profileError || applicationsError || historyError) {
        return {
            error: "We couldn't prepare your data. Please try again.",
        };
    }

    const exportData = {
        exported_at: new Date().toISOString(),
        email: user.email,
        profile,
        applications,
        status_history: statusHistory,
    };

    return {
        data: {
            filename: "pursuit-my-data.json",
            content: JSON.stringify(exportData, null, 2),
        },
    };
}

export async function deleteAccount(formData: FormData): Promise<void> {
    const currentPassword = formData.get("current_password");
    const confirmation = formData.get("delete_confirmation");

    if (
        typeof currentPassword !== "string" ||
        currentPassword.length === 0 ||
        typeof confirmation !== "string" ||
        confirmation !== "DELETE"
    ) {
        redirect("/settings?delete_error=confirmation");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/login");
    }

    if (!user.email) {
        redirect("/settings?delete_error=unavailable");
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
        redirect("/settings?delete_error=unavailable");
    }

    // Verify the password using a separate client so the current
    // browser session is not replaced during verification.
    const verifier = createSupabaseClient(supabaseUrl, anonKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
        },
    });

    const { data: verified, error: verificationError } =
        await verifier.auth.signInWithPassword({
            email: user.email,
            password: currentPassword,
        });

    if (
        verificationError ||
        verified.user?.id !== user.id
    ) {
        redirect("/settings?delete_error=password");
    }

    // Admin credentials are only used on the server.
    const admin = createSupabaseClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
        },
    });

    const { error: deletionError } =
        await admin.auth.admin.deleteUser(user.id);

    if (deletionError) {
        redirect("/settings?delete_error=failed");
    }

    await supabase.auth.signOut();

    redirect("/login?account=deleted");
}
