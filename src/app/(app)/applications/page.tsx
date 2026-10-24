import { Suspense } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import AddApplicationForm from "@/components/applications/AddApplicationForm";
import LiveApplications from "@/components/applications/LiveApplications";
import { redirect } from "next/navigation";

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
       .select("id, title, organisation, type, status, deadline")
       .order("deadline", { ascending: true, nullsFirst: false });

    if (dbError){
        throw dbError;  
    } 
    return (
        <main className="mx-auto max-w-md p-4">
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <LiveApplications initial={applications} userId={user.id} />

           

           

            <section className="mt-8">
                <h2 className="text-xl font-bold">Add an application</h2>
                <div className="mt-4"><AddApplicationForm /></div>
            </section>
        </main>
    );
}

export default function ApplicationsPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    return (
        <Suspense fallback={<p className="p-4">Loading...</p>}>
            <ApplicationsContent searchParams={searchParams} />
        </Suspense>
    );
}