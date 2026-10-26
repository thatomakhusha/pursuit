
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { STAGES } from "@/lib/stages";
import Profile from "@/components/profile/Profile";

function validateOptionalUrl(value: string): boolean {
    if (!value) return true;

    try {
        const url = new URL(value);
        return (
            (url.protocol === "https:" || url.protocol === "http:") &&
            Boolean(url.hostname)
        );
    } catch {
        return false;
    }
}

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
        .select(
            "display_name, stage, profile_completed, linkedin_url, github_url, portfolio_url"
        )
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

        const linkedinUrl = String(
            formData.get("linkedin_url") ?? ""
        ).trim();

        const githubUrl = String(
            formData.get("github_url") ?? ""
        ).trim();

        const portfolioUrl = String(
            formData.get("portfolio_url") ?? ""
        ).trim();

        if (
            displayName.length < 2 ||
            displayName.length > 80 ||
            !STAGES.some((option) => option.value === stage) ||
            [linkedinUrl, githubUrl, portfolioUrl].some(
                (url) => url.length > 2048 || !validateOptionalUrl(url)
            )
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
                    linkedin_url: linkedinUrl || null,
                    github_url: githubUrl || null,
                    portfolio_url: portfolioUrl || null,
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
            linkedinUrl={profile?.linkedin_url ?? ""}
            githubUrl={profile?.github_url ?? ""}
            portfolioUrl={profile?.portfolio_url ?? ""}
            saveProfile={saveProfile}
            errorMessage={
                urlError === "save"
                    ? "We couldn't save your profile. Please try again."
                    : urlError === "invalid"
                      ? "Please enter a valid name, select a stage, and use valid HTTP or HTTPS links."
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
