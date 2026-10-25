import { Calendar } from "lucide-react";
import type { RiskItem } from "@/lib/intelligence/risk";
import { RiskBadge } from "@/components/ui/Badges";

export default function UpcomingDeadlines({ risks }: { risks: RiskItem[] }){
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary-dark"/>
                <h2 className="font-bold">Upcoming Deadlines</h2>
            </div>
            {risks.length === 0 ? (
                    <p className="mt-2 text-text-secondary">No open deadlines. Add an application with a deadline to see its risk.</p>
                ) : (
                <ul className="mt-4 divide-y divide-slate-100">
                    {risks.slice(0, 5).map((r) => (
                        <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                            <div className="min-w-0">
                                <p className="truncate font-semibold text-sm text-slate-900">{r.title}</p>
                                <p className="mt-0.5 text-xs text-slate-500">{r.level === "overdue" ? "Deadline passed" : `${Math.ceil(r.daysLeft)}d left`} {r.order > 0 && ` · Start #${r.order}`}</p>
                                <p></p>
                            </div>
                            <div className="shrink-0">
                                <RiskBadge level={r.level} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}