import { Suspense } from "react";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";
import { Target } from "lucide-react";

async function SignupFormSlot({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const { error } = await searchParams;
    return <SignupForm error={error} />;
}

export default function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }){
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
                    Start free. Never miss a bursary or application deadline again.
                </p>

                <p className="text-sm text-text-muted">
                    © 2026 Pursuit
                </p>
            </section>
            <section className="flex items-center justify-center p-6">
                 <div className="w-full max-w-sm">
                     <p className="mb-6 text-xl font-bold md:hidden">Pursuit</p>
                    <Suspense fallback={null}>
                        <SignupFormSlot searchParams={searchParams} />
                    </Suspense>
                </div>
            </section>
        </main>
        
    );
}