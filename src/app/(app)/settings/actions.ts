
"use server";

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
