import { STAGES } from "@/lib/stages";

type ProfileProps = {
    displayName: string;
    email: string;
    stage: string;
    profileCompleted: boolean;
    saveProfile: (formData: FormData) => Promise<void>;
    errorMessage: string;
};

export default function Profile({
    displayName,
    email,
    stage,
    profileCompleted,
    saveProfile,
    errorMessage,
}: ProfileProps) {
    const initial = displayName || email || "?";

    return (
        <main className="mx-auto max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Your profile
                </h1>
                <p className="mt-2 text-gray-500">
                    Manage your personal information and current stage.
                </p>
            </div>

            {!profileCompleted && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                    Welcome to Pursuit! Complete your profile to get started.
                </div>
            )}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-dark text-xl font-bold text-white">
                        {initial.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            {displayName || "Complete your profile"}
                        </h2>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>
                {errorMessage && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                        {errorMessage}
                    </div>
                )}
                <form action={saveProfile} className="space-y-6">
                    <div>
                        <label
                            htmlFor="display_name"
                            className="mb-2 block text-sm font-medium"
                        >
                            Full name
                        </label>
                        <input
                            id="display_name"
                            name="display_name"
                            type="text"
                            required
                            minLength={2}
                            maxLength={80}
                            defaultValue={displayName}
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            readOnly
                            className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="stage"
                            className="mb-2 block text-sm font-medium"
                        >
                            Current stage
                        </label>
                        <select
                            id="stage"
                            name="stage"
                            required
                            defaultValue={stage}
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="" disabled>
                                Select your current stage
                            </option>
                            {STAGES.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-primary-dark px-5 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
                    >
                        Save profile
                    </button>
                </form>
            </section>
        </main>
    );
}
