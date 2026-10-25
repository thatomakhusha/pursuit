import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";
import { TypeBadge } from "@/components/ui/Badges";
import type { Application } from "../applications/LiveApplications";

export default function ApplicationCard({ application: a }: { application: Application }) {
    return (
        <Link href={`/applications/${a.id}`} draggable={false} className="block rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-primary-dark">
                    {a.organisation?.[0]?.toUpperCase() ?? "?"}
                </div>
                <TypeBadge type={a.type} />
            </div>
            <div>
                <p className="mt-3 font-semibold">{a.organisation ?? "No organisation"}</p>
                <p className="text-sm text-slate-500">{a.title}</p>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                <span className="flex items-center gap-1.5"> 
                    <Calendar size={14} aria-hidden="true" />
                    {a.deadline ?? "No deadline"}
                </span>
                {a.source_url && <ExternalLink size={14} aria-hidden="true" />}
            </div>
        </Link>
    );
}