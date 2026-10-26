
"use client";

import { useState } from "react";

type AccountSettingsProps = {
    email: string;
    passwordMessage: string;
    changePassword: (formData: FormData) => Promise<void>;
    downloadData: () => Promise<{
        error?: string;
        data?: {
            filename: string;
            content: string;
        };
    }>;
};

export default function AccountSettings({
    email,
    changePassword,
    downloadData,
    passwordMessage,
}: AccountSettingsProps) {
    const [downloadMessage, setDownloadMessage] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);

    async function handleDownload() {
        setIsDownloading(true);
        setDownloadMessage("");

        try {
            const result = await downloadData();

            if (result.error || !result.data) {
                setDownloadMessage(
                    result.error ?? "We couldn't download your data."
                );
                return;
            }

            const blob = new Blob([result.data.content], {
                type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = result.data.filename;
            link.click();

            URL.revokeObjectURL(url);
        } catch {
            setDownloadMessage("We couldn't download your data. Try again.");
        } finally {
            setIsDownloading(false);
        }
    }

    return (
        <main className="mx-auto max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Account settings
                </h1>
                <p className="mt-2 text-gray-500">
                    Manage your sign-in and personal data.
                </p>
            </div>

            <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                    <h2 className="text-lg font-semibold">Email address</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Your sign-in email address cannot be changed here.
                    </p>
                    <p className="mt-3 rounded-xl bg-gray-50 px-4 py-3 text-sm">
                        {email}
                    </p>
                </div>

                <hr className="border-gray-200" />

                <form action={changePassword} className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Change password
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Choose a strong password you don't use elsewhere.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="new_password"
                            className="mb-2 block text-sm font-medium"
                        >
                            New password
                        </label>
                        <input
                            id="new_password"
                            name="new_password"
                            type="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="At least 8 characters"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm_password"
                            className="mb-2 block text-sm font-medium"
                        >
                            Confirm new password
                        </label>
                        <input
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter the password again"
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-xl bg-primary-dark px-5 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Update password
                    </button>
                </form>

                <hr className="border-gray-200" />

                <div>
                    <h2 className="text-lg font-semibold">Download my data</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Download a JSON copy of your profile and tracked
                        applications.
                    </p>

                    <button
                        type="button"
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="mt-4 rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isDownloading ? "Preparing download..." : "Download my data"}
                    </button>
                </div>

                {passwordMessage && (
                    <p
                        role="status"
                        className={
                            passwordMessage.includes("successfully")
                                ? "text-sm text-green-700"
                                : "text-sm text-red-700"
                        }
                    >
                        {passwordMessage}
                    </p>
                )}

                {downloadMessage && (
                    <p role="alert" className="text-sm text-red-700">
                        {downloadMessage}
                    </p>
                )}
            </section>
        </main>
    );
}
