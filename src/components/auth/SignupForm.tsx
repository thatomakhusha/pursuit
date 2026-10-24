import { signup } from "@/app/(auth)/actions";
import Link from "next/link";

export default function SignupForm({ error }: { error?: string }){
    return(
        <div>
            <h1 className="text-3xl font-bold">
                Create your account
            </h1>
            <p className="text-text-secondary mt-1">
                Start tracking every opportunity in one place
            </p>
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <form action={signup} className="mt-6 space-y-4">
                <label className="block text-sm font-medium">
                    Name
                    <input name="name" type="text" required autoComplete="name" className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"/>
                </label>
                <label className="block text-sm font-medium">
                    Email address
                    <input name="email" type="email" required autoComplete="email" className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"/>
                </label>
                <label className="block text-sm font-medium">
                    Password (8+ characters)
                    <input name="password" type="password" required autoComplete="new-password" minLength={8} className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"/>
                </label>
                <label className="block text-sm font-medium">
                    Confirm password
                    <input name="confirmPassword" type="password" required autoComplete="new-password" minLength={8} className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"/>
                </label>
                <p className="text-xs text-text-secondary">
                    Pursuit stores your email, name and the opportunities you track. We never sell your data. If you are under 18, a parent or guardian must agree before you sign up.
                </p>
                <button type="submit" className="mt-2 w-full rounded-xl bg-primary-dark p-3 font-semibold text-white">
                    Create account
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-text-secondary">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary-dark">Sign in</Link>
            </p>
            
        </div>
    );
}