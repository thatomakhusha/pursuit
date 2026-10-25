import type { LucideIcon } from "lucide-react";

export default function StatsCard({ icon: Icon, tint, label, value, note }: { icon: LucideIcon; tint: string; label: string; value: number; note?: string }){
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
                    <Icon size={20} />
                </div>
                {note && <span className="text-xs text-slate-500">{note}</span>}
            </div>
            
            <p className="mt-4 text-3xl font-bold text-slate-900">
                {value}
            </p>

            <p className="text-sm text-slate-500">
                {label}
            </p>
        </div>
    );
}