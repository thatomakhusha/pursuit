import type { RiskLevel } from "@/lib/intelligence/risk";

export const STATUS_STYLES: Record<string, { pill: string; dot: string }> = {
  Saved: { pill: "bg-gray-100 text-gray-700", dot: "bg-gray-400" },
  Preparing: { pill: "bg-amber-50 text-amber-800", dot: "bg-amber-500" },
  Applied: { pill: "bg-sky-50 text-sky-800", dot: "bg-sky-500" },
  Assessment: { pill: "bg-orange-50 text-orange-800", dot: "bg-orange-500" },
  Interview: { pill: "bg-violet-50 text-violet-800", dot: "bg-violet-500" },
  Offer: { pill: "bg-green-50 text-green-800", dot: "bg-green-500" },
  Rejected: { pill: "bg-red-50 text-red-800", dot: "bg-red-500" },
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Saved;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

const TYPE_STYLES: Record<string, { pill: string; label: string }> = {
  job: { pill: "bg-blue-50 text-blue-800", label: "Job" },
  internship: { pill: "bg-teal-50 text-teal-800", label: "Internship" },
  learnership: { pill: "bg-indigo-50 text-indigo-800", label: "Learnership" },
  graduate_programme: { pill: "bg-purple-50 text-purple-800", label: "Graduate Programme" },
  bursary: { pill: "bg-yellow-50 text-yellow-800", label: "Bursary" },
  university: { pill: "bg-rose-50 text-rose-800", label: "University" },
  nsfas: { pill: "bg-emerald-50 text-emerald-800", label: "NSFAS" },
};

export function TypeBadge({ type }: { type: string }){
    const style = TYPE_STYLES[type] ?? { pill: "bg-gray-100 text-gray-700", label: type.replace("_", " ") };
    return (
        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${style.pill}`}>
            {style.label}
        </span>
    );
}

const RISK_STYLES: Record<RiskLevel, { pill: string; label: string }> = {
  overdue: { pill: "bg-gray-900 text-white", label: "Overdue" },
  high: { pill: "bg-red-100 text-red-900", label: "High risk" },
  medium: { pill: "bg-yellow-100 text-yellow-900", label: "Medium risk" },
  low: { pill: "bg-green-100 text-green-900", label: "Low risk" },
};

export function RiskBadge({ level }: { level: RiskLevel }){
    const style = RISK_STYLES[level];
    return (
        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${style.pill}`}>
            {style.label}
        </span>
    );
}