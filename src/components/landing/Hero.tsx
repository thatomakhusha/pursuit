
import Link from "next/link";
import {
    ArrowRight,
    BriefcaseBusiness,
    Check,
    ChevronRight,
    Clock3,
    LayoutGrid,
    Plus,
    Search,
    Target,
} from "lucide-react";

const applications = [
    {
        company: "Standard Bank",
        role: "Graduate Software Developer",
        initial: "S",
        date: "12 Oct",
        status: "Applied",
        statusClass: "bg-primary-light text-primary-dark",
        dotClass: "bg-primary",
    },
    {
        company: "Absa",
        role: "Technology Graduate",
        initial: "A",
        date: "15 Oct",
        status: "Assessment",
        statusClass: "bg-orange-100 text-orange-800",
        dotClass: "bg-status-assessment",
    },
    {
        company: "Investec",
        role: "Software Engineering Graduate",
        initial: "I",
        date: "18 Oct",
        status: "Interview",
        statusClass: "bg-violet-100 text-violet-800",
        dotClass: "bg-status-interview",
    },
    {
        company: "Discovery",
        role: "Junior Developer",
        initial: "D",
        date: "20 Oct",
        status: "Preparing",
        statusClass: "bg-amber-100 text-amber-800",
        dotClass: "bg-status-preparing",
    },
];

const Hero = () => {
    return (
        <section id="product" className="overflow-hidden bg-surface">
            <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">

                    {/* Introduction */}
                    <div className="lg:col-span-5 lg:pb-8">
                        <div className="mb-7 flex items-center gap-3">
                            <span className="h-px w-9 bg-primary" />
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">
                                Your job search, organised
                            </span>
                        </div>

                        <h1 className="max-w-xl font-heading text-5xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                            Your next opportunity,{" "}
                            <span className="text-primary-dark">
                                tracked.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md font-body text-base leading-7 text-text-secondary sm:text-lg">
                            Every application. Every update. One place to
                            keep moving forward.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-5">
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-3 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                            >
                                Start tracking
                                <ArrowRight size={16} />
                            </Link>

                            <span className="flex items-center gap-2 text-sm text-text-secondary">
                                <Check
                                    size={16}
                                    className="text-primary-dark"
                                />
                                Keep everything in one place
                            </span>
                        </div>

                        <div className="mt-12 hidden border-t border-gray-200 pt-5 sm:block">
                            <p className="max-w-sm text-sm leading-6 text-text-secondary">
                                Built for the applications you send,
                                the opportunities you pursue, and the
                                progress you want to keep track of.
                            </p>
                        </div>
                    </div>

                    {/* Product preview */}
                    <div className="relative lg:col-span-7">
                        <div className="mb-4 flex items-center gap-3 lg:ml-8">
                            <span className="h-px w-7 bg-primary" />
                            <p className="text-xs font-medium text-text-secondary">
                                A clearer view of your job search
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-surface shadow-lg shadow-gray-900/5">

                            {/* Preview toolbar */}
                            <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 sm:px-5">
                                <div className="flex min-w-0 items-center gap-2">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-light text-primary-dark">
                                        <Target size={15} />
                                    </span>

                                    <span className="truncate font-heading text-sm font-semibold text-text-primary">
                                        Pursuit
                                    </span>
                                </div>

                                <Link
                                    href="/signup"
                                    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
                                >
                                    <Plus size={14} />
                                    Add application
                                </Link>
                            </div>

                            <div className="grid sm:grid-cols-[9rem_minmax(0,1fr)]">

                                {/* Illustrative sidebar */}
                                <aside className="hidden border-r border-gray-200 bg-sidebar p-3 text-white sm:block">
                                    <div className="mb-6 flex items-center gap-2 px-2 py-2">
                                        <Target
                                            size={17}
                                            className="text-primary"
                                        />
                                        <span className="font-heading text-xs font-semibold">
                                            Workspace
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-gray-300">
                                            <LayoutGrid size={14} />
                                            Dashboard
                                        </div>

                                        <div className="flex items-center gap-2 rounded-md bg-sidebar-active px-2 py-2 text-xs font-medium text-white">
                                            <BriefcaseBusiness
                                                size={14}
                                                className="text-primary"
                                            />
                                            Applications
                                        </div>
                                    </div>

                                    <div className="mt-10 border-t border-white/10 px-2 pt-3">
                                        <p className="text-[10px] leading-5 text-gray-400">
                                            YOUR NEXT STEP STARTS HERE
                                        </p>
                                    </div>
                                </aside>

                                {/* Application tracker */}
                                <div className="min-w-0">
                                    <div className="border-b border-gray-200 px-4 py-4 sm:px-5">
                                        <div className="flex items-end justify-between gap-3">
                                            <div>
                                                <p className="font-heading text-base font-semibold text-text-primary">
                                                    My applications
                                                </p>
                                                <p className="mt-1 text-xs text-text-secondary">
                                                    A snapshot of your job search
                                                </p>
                                            </div>

                                            <Search
                                                size={17}
                                                className="shrink-0 text-text-muted"
                                            />
                                        </div>

                                        <div className="mt-4 grid grid-cols-4 overflow-hidden rounded-lg border border-gray-200">
                                            {[
                                                {
                                                    label: "Preparing",
                                                    count: "1",
                                                    color: "bg-status-preparing",
                                                },
                                                {
                                                    label: "Applied",
                                                    count: "1",
                                                    color: "bg-primary",
                                                },
                                                {
                                                    label: "Interview",
                                                    count: "1",
                                                    color: "bg-status-interview",
                                                },
                                                {
                                                    label: "Assessment",
                                                    count: "1",
                                                    color: "bg-status-assessment",
                                                },
                                            ].map((item) => (
                                                <div
                                                    key={item.label}
                                                    className="min-w-0 border-r border-gray-200 px-2 py-2.5 last:border-r-0 sm:px-3"
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        <span
                                                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.color}`}
                                                        />
                                                        <span className="hidden truncate text-[10px] font-medium text-text-secondary md:inline">
                                                            {item.label}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 font-heading text-lg font-semibold text-text-primary">
                                                        {item.count}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Table heading */}
                                    <div className="hidden grid-cols-[1.25fr_0.85fr] border-b border-gray-200 bg-background px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted md:grid lg:px-5">
                                        <span>Opportunity</span>
                                        <span>Status</span>
                                    </div>

                                    {/* Example application rows */}
                                    {applications.map((app) => (
                                        <div
                                            key={app.company}
                                            className="grid gap-2 border-b border-gray-100 px-4 py-3.5 last:border-b-0 sm:px-5 md:grid-cols-[1.25fr_0.85fr] md:items-center"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light font-heading text-xs font-bold text-primary-dark">
                                                    {app.initial}
                                                </span>

                                                <div className="min-w-0">
                                                    <p className="truncate font-heading text-xs font-semibold text-text-primary sm:text-sm">
                                                        {app.company}
                                                    </p>

                                                    <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                                                        {app.role}
                                                    </p>

                                                    <p className="mt-1 text-[10px] text-text-muted md:hidden">
                                                        Added {app.date}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-2 md:block">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-semibold ${app.statusClass}`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${app.dotClass}`}
                                                    />
                                                    {app.status}
                                                </span>

                                                <span className="text-[10px] text-text-muted md:hidden">
                                                    {app.date}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-background px-4 py-3 sm:px-5">
                                        <span className="flex items-center gap-2 text-[10px] text-text-secondary sm:text-xs">
                                            <Clock3 size={13} />
                                            Example application data
                                        </span>

                                        <Link
                                            href="/signup"
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-dark hover:text-primary-hover"
                                        >
                                            Get started
                                            <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-3 text-right text-[11px] text-text-muted">
                            Illustrative preview · Not live account data
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
