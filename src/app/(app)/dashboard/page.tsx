import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";
import { assessDeadlineRisk } from "@/lib/intelligence/risk";
import PageHeader from "@/components/layout/PageHeader";
import { RiskBadge } from "@/components/ui/Badges";

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
       .select("id, title, status, deadline");
    if (dbError) throw dbError;
    const risks = assessDeadlineRisk(applications ?? [], new Date());

    return( 
        <div>
            <PageHeader
                title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
                subtitle="Here's your application overview for today."
            />

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