import { Suspense } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import AddApplicationForm from "@/components/applications/AddApplicationForm";
import KanbanBoard from "@/components/applications/KanbanBoard";
import { redirect } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";

async function ApplicationsContent({ searchParams }: { searchParams: Promise<{ error?: string }> }){
    await connection();
    
    const { error } = await searchParams;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: applications, error: dbError } = await supabase
       .from("applications")
       .select("id, title, organisation, type, status, deadline, source_url, notes")
       .order("deadline", { ascending: true, nullsFirst: false });

    if (dbError){
        throw dbError;  
    } 
    return (
        
        <div>
            <PageHeader
                title="Applications"
                subtitle="Track every opportunity in one place."
                action={<Link href="#add-application" className="rounded-xl bg-primary-dark px-5 py-3 font-semibold text-white">+ Add Application</Link>}
            />
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <KanbanBoard initial={applications} userId={user.id} />
            
            <section className="mt-8" id="add-application">
                <h2 className="text-xl font-bold">Add an application</h2>
                <div className="mt-4"><AddApplicationForm /></div>
            </section>
        </div>
    );
}

export default function ApplicationsPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    return (
        <Suspense fallback={<p className="p-4">Loading...</p>}>
            <ApplicationsContent searchParams={searchParams} />
        </Suspense>
    );
}