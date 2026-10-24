import LoginForm from "@/components/auth/LoginForm";
import { Target } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function LoginFormSlot({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const { error } = await searchParams;
    return <LoginForm error={error} />;
}

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    return(

        <main className="grid min-h-screen md:grid-cols-2">

            <section className="hidden bg-sidebar p-12 text-white md:flex md:flex-col md:justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 text-white rounded-md">
                        <Target size={22}/>
                    </div>
                    <span className="text-white font-bold text-[1.2rem]">
                        Pursuit
                    </span>
                </Link>

                <p className="text-3xl font-bold leading-snug">
                    Every bursary, university and job application in one place, with the next deadline to tackle first.
                </p>

                <p className="text-sm text-text-muted">
                    © 2026 Pursuit
                </p>
            </section>

            <section className="flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    <p className="mb-6 text-xl font-bold md:hidden">Pursuit</p>
                    <Suspense fallback={null}>
                        <LoginFormSlot searchParams={searchParams} />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}