
import { Suspense } from "react";
import AccountSettings from "@/components/settings/AccountSettings";
import {
    changePassword,
    downloadData,
    deleteAccount,
} from "./actions";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";

type SettingsPageProps = {
    searchParams: Promise<{
        password?: string;
        password_error?: string;
        delete_error?: string;
        account?: string;
    }>;
};

export default function SettingsPage({
    searchParams,
}: SettingsPageProps) {
    return (
        <Suspense fallback={<p className="p-6">Loading account settings...</p>}>
            <SettingsContent searchParams={searchParams} />
        </Suspense>
    );
}

async function SettingsContent({
    searchParams,
}: SettingsPageProps) {
    await connection();

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const params = await searchParams;

    const passwordMessage =
        params.password === "updated"
            ? "Your password has been updated successfully."
            : params.password_error === "mismatch"
              ? "The passwords do not match."
              : params.password_error === "invalid"
                ? "Your password must contain at least 8 characters."
                : params.password_error === "failed"
                  ? "We couldn't update your password. Please try again."
                  : "";

    const deleteMessages: Record<string, string> = {
        confirmation: 'Type DELETE exactly as shown to confirm account deletion.',
        password: 'Your current password is incorrect.',
        failed: 'We could not delete your account. Please try again.',
        unavailable: 'Account deletion is temporarily unavailable. Please try again later.',
    };

    const deleteMessage = params.delete_error
        ? deleteMessages[params.delete_error] ?? ''
        : '';

    return (
        <AccountSettings
            email={user.email ?? ""}
            changePassword={changePassword}
            downloadData={downloadData}
            deleteAccount={deleteAccount}
            passwordMessage={passwordMessage}
            deleteMessage={deleteMessage}
        />
    );
}
