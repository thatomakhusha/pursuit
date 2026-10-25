import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";
import { assessDeadlineRisk } from "@/lib/intelligence/risk";
import PageHeader from "@/components/layout/PageHeader";
import { RiskBadge } from "@/components/ui/Badges";
import StatsCard from "@/components/ui/StatsCard";
import { FileText, TrendingUp, Users, Clock } from "lucide-react";

async function DashboardContent(){
    await connection();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");
    
    const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .maybeSingle();
    const firstName = profile?.display_name?.split(" ")[0];

    

    const { data: applications, error: dbError } = await supabase
       .from("applications")
       .select("id, title, status, deadline, created_at");
    if (dbError) throw dbError;

    const now = new Date();
    const risks = assessDeadlineRisk(applications ?? [], now);
    
    const all = applications ?? [];
    const total = all.length;
    const addedThisMonth =  all.filter((a) => now.getTime() - new Date(a.created_at).getTime() < 30 * 86_400_000).length;
    const active =  all.filter((a) => a.status !== "Offer" && a.status !== "Rejected").length;
    const interviews =  all.filter((a) => a.status === "Interview").length;
    const dueThisWeek =  risks.filter((r) => r.daysLeft >= 0 && r.daysLeft <= 7).length;

    return( 
        <div>
            <PageHeader
                title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
                subtitle="Here's your application overview for today."
            />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatsCard icon={FileText} tint="bg-sky-50 text-sky-700" label="Total Applications" value={total} note={`${addedThisMonth} this month`} />
                <StatsCard icon={TrendingUp} tint="bg-emerald-50 text-emerald-700" label="Active Applications" value={active}/>
                <StatsCard icon={Users} tint="bg-violet-50 text-violet-700" label="Interviews" value={interviews}/>
                <StatsCard icon={Clock} tint="bg-amber-50 text-amber-700" label="Upcoming Deadlines" value={dueThisWeek} note="next 7 days"/>
            </div>
            <section className="mt-6">
                <h2 className="text-xl font-bold">Deadline risk</h2>
                {risks.length === 0 ? (
                    <p className="mt-2 text-text-secondary">No open deadlines. Add an application with a deadline to see its risk.</p>
                ) : (
                    <ul className="mt-3 space-y-3">
                        {risks.map((r) => (
                            <li key={r.id} className="rounded-xl border border-gray-200 bg-surface p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <p className="font-semibold">{r.title}</p>
                                    <RiskBadge level={r.level} />
                                </div>
                                <p className="mt-2 text-sm text-slate-500">
                                    {r.level === "overdue" ? "Deadline has passed" : `${Math.ceil(r.daysLeft)} days left`}
                                    {r.order > 0 && ` · Start order: ${r.order}`}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            
        </div>
    )
}

export default function Dashboard() {
    return (
        <Suspense fallback={<p className="p-4">Loading...</p>}>
            <DashboardContent />
        </Suspense>
    );
}