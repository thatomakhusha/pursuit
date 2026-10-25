import { Check } from "lucide-react";

const TIMELINE_STEPS = ["Saved", "Preparing", "Applied", "Assessment", "Interview", "Offer"];

export default function ApplicationTimeline({ status }: { status: string }) {
    const currentIndex = TIMELINE_STEPS.indexOf(status);

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold">Application Timeline</h2>
            <ol className="mt-5">
                {TIMELINE_STEPS.map((step, i) => {
                    const done = i < currentIndex;
                    const current = i === currentIndex;
                    const isLast = i === TIMELINE_STEPS.length - 1;

                    return (
                        <li key={step} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs ${
                                        done || current
                                            ? "bg-primary-dark text-white"
                                            : "border border-slate-200 bg-white text-slate-400"
                                    } ${current ? "ring-4 ring-sky-100" : ""}`}
                                >
                                    {done || current ? <Check size={14} aria-hidden="true" /> : i + 1}
                                </div>
                                {!isLast && <div className="w-0.5 flex-1 bg-slate-200" />}
                            </div>
                            <p
                                className={`pb-8 pt-1 ${
                                    current ? "font-semibold text-primary-dark" : done ? "text-slate-900" : "text-slate-400"
                                }`}
                            >
                                {step}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}