import { STATUS_STYLES } from "./Badges";

export default function PipelineSummary({ items }: { items: { status: string; count: number }[] }) {
    const total = items.reduce((sum, p) => sum + p.count, 0);

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="font-bold">Pipeline Summary</h2>
            {items.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">Nothing tracked yet.</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {items.map((p) => (
                        <li key={p.status}>
                            <div className="flex justify-between text-sm">
                                <span>{p.status}</span>
                                <span className="text-slate-500">{p.count}</span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                                <div
                                    className={`h-1.5 rounded-full ${STATUS_STYLES[p.status]?.dot ?? "bg-slate-400"}`}
                                    style={{ width: `${(p.count / total) * 100}%` }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}