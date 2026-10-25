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
                    <li key={a.id} className="-mx-2 rounded-xl px-2">
                        <Link href={`/applications#application-${a.id}`} className="group flex items-center gap-4 py-4 hover:bg-slate-50">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-primary-dark">
                                {a.organisation?.[0]?.toUpperCase() ?? "?"}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm text-slate-900">{a.organisation ?? "No organisation"}</p>
                                <p className="text-[0.8rem] text-slate-500">{a.title}</p>
                                <p className="mt-1 text-xs text-slate-500">Deadline: {a.deadline ?? "No deadline"}</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
                                <TypeBadge type={a.type} />
                                <StatusBadge status={a.status} />
                                <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-slate-400 group-hover:text-primary-dark" />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}