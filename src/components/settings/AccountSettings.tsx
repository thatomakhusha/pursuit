
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type AccountSettingsProps = {
    email: string;
    passwordMessage: string;
    deleteAccount: (formData: FormData) => Promise<void>;
    deleteMessage: string;
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
    deleteMessage,
    deleteAccount,
}: AccountSettingsProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [downloadMessage, setDownloadMessage] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [showDeletePassword, setShowDeletePassword] = useState(false);
    
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
            link.remove();

            setTimeout(() => URL.revokeObjectURL(url), 1000);
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
                        <span className="relative mt-1 block">
                            <input
                                id="new_password"
                                name="new_password"
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={8}
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="At least 8 characters"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((visible) => !visible)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-900"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </span>
                    </div>

                    <div>
                        <label
                            htmlFor="confirm_password"
                            className="mb-2 block text-sm font-medium"
                        >
                            Confirm new password
                        </label>
                        <span className="relative mt-1 block">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                minLength={8}
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter the password again"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((visible) => !visible)}
                                aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                                aria-pressed={showConfirmPassword}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-900"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </span>
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
                
                <hr className="border-gray-200" />

                <section className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-red-700">
                            Danger zone
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Permanently delete your Pursuit account, profile, tracked
                            applications, and status history. This action cannot be undone.
                        </p>
                    </div>

                    <form action={deleteAccount} className="space-y-4">
                        <div>
                            <label
                                htmlFor="delete_current_password"
                                className="mb-2 block text-sm font-medium"
                            >
                                Current password
                            </label>

                            <span className="relative mt-1 block">
                                <input
                                    id="delete_current_password"
                                    name="current_password"
                                    type={showDeletePassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                    placeholder="Enter your current password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowDeletePassword((visible) => !visible)}
                                    aria-label={showDeletePassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-900"
                                >
                                    {showDeletePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </span>
                        </div>

                        <div>
                            <label
                                htmlFor="delete_confirmation"
                                className="mb-2 block text-sm font-medium"
                            >
                                Type DELETE to confirm
                            </label>

                            <input
                                id="delete_confirmation"
                                name="delete_confirmation"
                                type="text"
                                required
                                autoComplete="off"
                                spellCheck={false}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                placeholder="DELETE"
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={(event) => {
                                if (!window.confirm(
                                    "Are you absolutely sure? Your account and all associated data will be permanently deleted."
                                )) {
                                    event.preventDefault();
                                }
                            }}
                            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                            Permanently delete account
                        </button>
                    </form>
                </section>


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

                {deleteMessage && (
                    <p role="alert" className="text-sm text-red-700">
                        {deleteMessage}
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
