
"use client";

import { signup } from "@/app/(auth)/actions";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignupForm({ error }: { error?: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Create your account
            </h1>

            <p className="text-text-secondary mt-1">
                Start tracking every opportunity in one place
            </p>

            {error && (
                <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </p>
            )}

            <form action={signup} className="mt-6 space-y-4">
                <label className="block text-sm font-medium">
                    Name
                    <input
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"
                    />
                </label>

                <label className="block text-sm font-medium">
                    Email address
                    <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"
                    />
                </label>

                <label className="block text-sm font-medium">
                    Password (8+ characters)
                    <span className="relative mt-1 block">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            autoComplete="new-password"
                            minLength={8}
                            className="focus:border-primary-dark focus:outline-none w-full rounded-xl border border-gray-200 bg-surface p-3 pr-12 text-base"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((visible) => !visible)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            aria-pressed={showPassword}
                            className="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-primary-dark"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </span>
                </label>

                <label className="block text-sm font-medium">
                    Confirm password
                    <span className="relative mt-1 block">
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            autoComplete="new-password"
                            minLength={8}
                            className="focus:border-primary-dark focus:outline-none w-full rounded-xl border border-gray-200 bg-surface p-3 pr-12 text-base"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((visible) => !visible)}
                            aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                            aria-pressed={showConfirmPassword}
                            className="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-primary-dark"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </span>
                </label>

                <p className="text-xs text-text-secondary">
                    Pursuit stores your email, name and the opportunities you track. We never sell your data. If you are under 18, a parent or guardian must agree before you sign up.
                </p>

                <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-primary-dark p-3 font-semibold text-white"
                >
                    Create account
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-text-secondary">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary-dark">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
