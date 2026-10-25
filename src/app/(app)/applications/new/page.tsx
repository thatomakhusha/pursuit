import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddApplicationForm from "@/components/applications/AddApplicationForm";

async function NewApplicationContent({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const { error } = await searchParams;

    return (
        <div>
            <Link href="/applications" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Applications
            </Link>
            <div className="mt-4 max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-bold">Add Application</h1>
                {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div className="mt-6">
                    <AddApplicationForm />
                </div>
            </div>
        </div>
    );
}

export default function NewApplicationPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    return (
        <Suspense fallback={<p className="p-4">Loading...</p>}>
            <NewApplicationContent searchParams={searchParams} />
        </Suspense>
    );
}