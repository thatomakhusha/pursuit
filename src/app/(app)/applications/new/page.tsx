import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddApplicationForm from "@/components/applications/AddApplicationForm";

export default function NewApplicationPage() {
    return (
        <div>
            <Link href="/applications" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Applications
            </Link>
            <div className="mt-4 max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-bold">Add Application</h1>
                <div className="mt-6">
                    <AddApplicationForm />
                </div>
            </div>
        </div>
    );
}