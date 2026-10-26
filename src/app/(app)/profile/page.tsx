
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { STAGES } from "@/lib/stages";
import Profile from "@/components/profile/Profile";

async function ProfileContent({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    await connection();

    const { error: urlError } = await searchParams;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("display_name, stage, profile_completed")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    async function saveProfile(formData: FormData) {
        "use server";

        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            redirect("/login");
        }

        const displayName = String(
            formData.get("display_name") ?? ""
        ).trim();

        const stage = String(formData.get("stage") ?? "");

        if (
            displayName.length < 2 ||
            displayName.length > 80 ||
            !STAGES.some((option) => option.value === stage)
        ) {
            redirect("/profile?error=invalid");
        }

        const { error } = await supabase
            .from("profiles")
            .upsert(
                {
                    user_id: user.id,
                    display_name: displayName,
                    stage,
                    profile_completed: true,
                },
                { onConflict: "user_id" }
            );

        if (error) {
            console.error("Profile save failed:", error.code, error.message);
            redirect("/profile?error=save");
        }

        revalidatePath("/profile");
        revalidatePath("/dashboard");
        redirect("/dashboard");
    }

    const displayName =
        profile?.display_name ??
        (typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : "");

    const stage = STAGES.some(
        (option) => option.value === profile?.stage
    )
        ? profile!.stage!
        : "";

    return (
        <Profile
            displayName={displayName}
            email={user.email ?? ""}
            stage={stage}
            profileCompleted={profile?.profile_completed === true}
            saveProfile={saveProfile}
            errorMessage={
                urlError === "save"
                    ? "We couldn't save your profile. Please try again."
                    : urlError === "invalid"
                    ? "Please enter a valid name and select a stage."
                    : ""
            }
        />
    );
}

export default function ProfilePage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    return (
        <Suspense fallback={<p className="p-4">Loading...</p>}>
            <ProfileContent searchParams={searchParams} />
        </Suspense>
    );
}
