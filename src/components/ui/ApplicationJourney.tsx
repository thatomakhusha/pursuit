import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { StatusBadge, TypeBadge } from "@/components/ui/Badges";

type JourneyItem = {
    id: number;
    title: string;
    organisation: string | null;
    type: string;
    status: string;
    deadline: string | null;
    source_url: string | null;
};

export default function ApplicationJourney({ items }: { items: JourneyItem[] }){
    return(
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="font-bold">Your Application Journey</h2>
                <Link href="/applications" className="hover:underline flex items-center gap-1 text-xs font-bold text-primary-dark">
                    View all 
                    <ChevronRight size={16}/>
                </Link>
            </div>
            <ul className="mt-4 divide-y divide-slate-100">
                {items.map((a) => (
                    <li key={a.id} className="flex items-center gap-4 py-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-primary-dark">
                            {a.organisation?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-slate-900">{a.organisation ?? "No organisation"}</p>
                            <p className="text-sm text-slate-500">{a.title}</p>
                            <p className="mt-1 text-xs text-slate-500">Deadline: {a.deadline ?? "No deadline"}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
                            <TypeBadge type={a.type} />
                            <StatusBadge status={a.status} />
                            {a.source_url && (
                                <a href={a.source_url} target="_blank" rel="noopener noreferrer" aria-label="Open application page" className="text-slate-400 hover:text-primary-dark">
                                <ArrowUpRight size={16} />
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}