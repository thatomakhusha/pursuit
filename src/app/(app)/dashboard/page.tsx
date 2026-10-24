import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(auth)/actions";
import { connection } from "next/server";
import { assessDeadlineRisk } from "@/lib/intelligence/risk";
import PageHeader from "@/components/layout/PageHeader";

async function DashboardContent(){
    await connection();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: applications, error: dbError } = await supabase
       .from("applications")
       .select("id, title, status, deadline");
    if (dbError) throw dbError;
    const risks = assessDeadlineRisk(applications ?? [], new Date());

    return <main className="mx-auto max-w-md p-4">
        <PageHeader
            title={`Good morning ${user.email}`}
            subtitle={`Here's your application overview for today.`}
            action={""}
        />
        <p>Logged in as {user.email}</p>

        <section className="mt-6">
            <h2 className="text-xl font-bold">Deadline risk</h2>
            {risks.length === 0 ? (
                <p className="mt-2 text-text-secondary">No open deadlines. Add an application with a deadline to see its risk.</p>
            ) : (
                <ul className="mt-3 space-y-3">
                    {risks.map((r) => (
                        <li key={r.id} className="rounded-xl border border-gray-200 bg-surface p-4">
                            <p className="font-semibold">{r.title}</p>
                            <p className="mt-1 text-sm font-medium capitalize">{r.level} risk</p>
                            <p className="mt-2 text-sm">
                                {r.level === "overdue" ? "Overdue" : `${Math.ceil(r.daysLeft)} days left`}
                            </p>
                            
                            {r.order > 0 && <p className="text-sm font-medium">Start order: {r.order}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </section>

        <form action={logout}>
            <button type="submit" className="mt-4 rounded-xl bg-primary-dark px-4 py-2 font-semibold text-white">Log out</button>
        </form>
    </main>
}

export default function Dashboard() {
    return (
        <Suspense fallback={<p className="p-4">Loading...</p>}>
            <DashboardContent />
        </Suspense>
    );
}