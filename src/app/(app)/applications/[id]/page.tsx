import { Suspense } from "react";
import { connection } from "next/server";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { StatusBadge, TypeBadge } from "@/components/ui/Badges";
import ApplicationTimeline from "@/components/ui/ApplicationTimeline";
import QuickActions from "@/components/applications/QuickActions";

async function ApplicationContent({ params }: { params: Promise<{ id: string }> }) {
    await connection();
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: application, error } = await supabase
        .from("applications")
        .select("id, title, organisation, type, status, deadline, source_url, notes")
        .eq("id", id)
        .maybeSingle();
    if (error) throw error;
    if (!application) notFound();

    return (
        <div>
            <Link href="/applications" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Applications
            </Link>

            <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold text-primary-dark">
                        {application.organisation?.[0]?.toUpperCase() ?? "?"}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">
                            {application.organisation ?? "No organisation"}
                        </h1>

                        <p className="text-slate-500">
                            {application.title}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <StatusBadge status={application.status} />
                    <TypeBadge type={application.type} />
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <Calendar size={18} className="text-slate-400" />

                    <div>
                        <p className="text-xs text-slate-500">
                            Deadline
                        </p>
                        
                        <p className="font-semibold">
                            {application.deadline ?? "No deadline"}
                        </p>
                    </div>
                </div>
                
                {application.source_url && (
                    <a
                        href={application.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:underline"
                    >
                        <ExternalLink size={16} aria-hidden="true" />
                        View application portal
                    </a>
                )}
            </div>

            <div className="mt-6">
                <ApplicationTimeline status={application.status} />
            </div>
            <div className="mt-6">
                <QuickActions id={application.id} status={application.status} />
            </div>
        </div>
    );
}

export default function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<p className="p-4">Loading...</p>}>
            <ApplicationContent params={params} />
        </Suspense>
    );
}