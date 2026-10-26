import Link from "next/link";
import { ArrowRight } from "lucide-react";

const workflowSteps = [
    {
        number: "01",
        label: "Save an opportunity",
        detail:
            "Found a graduate programme or job worth pursuing? Add the company, role, and relevant details to Pursuit.",
        color: "bg-primary",
    },
    {
        number: "02",
        label: "Track your progress",
        detail:
            "Update its status as you prepare your application, apply, complete assessments, or reach interviews.",
        color: "bg-status-assessment",
    },
    {
        number: "03",
        label: "Stay organised",
        detail:
            "See where every application stands in one place, so you can keep track of opportunities and follow-ups.",
        color: "bg-status-interview",
    },
];

const Workflow = () => {
    return (
        <section
            id="workflow"
            className="border-y border-gray-200 bg-surface"
        >
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20">

                <div className="lg:col-span-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark">
                        How it works
                    </p>

                    <h2 className="max-w-sm font-heading text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                        From first search to final outcome.
                    </h2>

                    <p className="mt-4 max-w-sm font-body text-sm leading-6 text-text-secondary">
                        Job hunting gets complicated when applications,
                        deadlines, and updates are scattered everywhere.
                        Pursuit helps you manage the process from one place.
                    </p>

                    <Link
                        href="/signup"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        Start tracking
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="lg:col-span-8 lg:pt-2">
                    <div className="grid gap-8 sm:grid-cols-3 sm:gap-5">
                        {workflowSteps.map((step) => (
                            <div
                                key={step.number}
                                className="relative border-l border-gray-200 py-1 pl-6 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-7"
                            >
                                <span
                                    className={`absolute -left-1.5 top-2 h-3 w-3 rounded-full border-2 border-surface sm:-top-1.5 sm:left-0 ${step.color}`}
                                />

                                <p className="font-heading text-xs font-semibold tracking-wider text-text-muted">
                                    STEP {step.number}
                                </p>

                                <h3 className="mt-3 font-heading text-base font-semibold text-text-primary">
                                    {step.label}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-text-secondary">
                                    {step.detail}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
                        <div>
                            <p className="font-heading text-sm font-semibold text-text-primary">
                                One place for your entire job search.
                            </p>

                            <p className="mt-1 text-sm leading-6 text-text-secondary">
                                Spend less time organising applications and
                                more time moving forward.
                            </p>
                        </div>

                        <Link
                            href="/signup"
                            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-dark transition-colors hover:text-primary-hover"
                        >
                            Create your account
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Workflow;
