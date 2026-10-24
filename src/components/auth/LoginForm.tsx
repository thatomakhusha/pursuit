import { login } from "@/app/(auth)/actions";
import Link from "next/link";

export default function LoginForm({ error }: { error?: string }){
    return(
        <div>
            <h1 className="text-3xl font-bold">
                Welcome back
            </h1>
            <p className="text-text-secondary mt-1">
                Sign in to your Pursuit account
            </p>
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <form action={login} className="mt-6 space-y-4">
                <label className="block text-sm font-medium">
                    Email address
                    <input name="email" type="email" required autoComplete="email" className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"/>
                </label>
                <label className="block text-sm font-medium">
                    Password
                    <input name="password" type="password" required autoComplete="current-password" className="focus:border-primary-dark focus:outline-none mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"/>
                </label>
                
                <button type="submit" className="mt-2 w-full rounded-xl bg-primary-dark p-3 font-semibold text-white">Sign in</button>
            </form>
            <p className="mt-6 text-center text-sm text-text-secondary">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-primary-dark">Sign up free</Link>
            </p>
            
        </div>
    );
}