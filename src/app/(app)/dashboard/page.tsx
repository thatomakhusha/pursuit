import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";
import { assessDeadlineRisk } from "@/lib/intelligence/risk";
import PageHeader from "@/components/layout/PageHeader";
import StatsCard from "@/components/ui/StatsCard";
import { FileText, TrendingUp, Users, Clock } from "lucide-react";
import ApplicationJourney from "@/components/ui/ApplicationJourney";
import UpcomingDeadlines from "@/components/ui/UpcomingDeadlines";
import Link from "next/link";
import PipelineSummary from "@/components/ui/PipelineSummary";

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
       .select("id, title, organisation, type, status, deadline, source_url, created_at, updated_at");
    if (dbError) throw dbError;
    
    const now = new Date();
    const all = applications ?? [];
    const risks = assessDeadlineRisk(applications ?? [], now);

    const statusOrder = ["Saved", "Preparing", "Applied", "Assessment", "Interview", "Offer", "Rejected"];
    const pipeline = statusOrder
        .map((s) => ({ status: s, count: all.filter((a) => a.status === s).length }))
        .filter((p) => p.count > 0);

    const total = all.length;
    const addedThisMonth =  all.filter((a) => now.getTime() - new Date(a.created_at).getTime() < 30 * 86_400_000).length;
    const active =  all.filter((a) => a.status !== "Offer" && a.status !== "Rejected").length;
    const interviews =  all.filter((a) => a.status === "Interview").length;
    const dueThisWeek =  risks.filter((r) => r.daysLeft >= 0 && r.daysLeft <= 7).length;
    const recent = [...all].sort((x, y) => new Date(y.updated_at).getTime() - new Date(x.updated_at).getTime()).slice(0, 7);
    
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
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ApplicationJourney items={recent} />
                </div>
                <div className="space-y-6">
                    <UpcomingDeadlines risks={risks} />
                    <PipelineSummary items={pipeline} />
                    <Link
                        href="/applications#add-application"
                        className="block rounded-2xl bg-primary-dark p-4 text-center font-semibold text-white"
                    >
                        + Add New Application
                    </Link>
                </div>
            </div>
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