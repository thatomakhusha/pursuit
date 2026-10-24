import { Suspense } from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import AddApplicationForm from "@/components/applications/AddApplicationForm";

async function ApplicationsContent({ searchParams }: { searchParams: Promise<{ error?: string }> }){
    await connection();
    
    const { error } = await searchParams;
    const supabase = await createClient();
    const { data: applications, error: dbError } = await supabase
       .from("applications")
       .select("id, title, organisation, type, status, deadline")
       .order("deadline", { ascending: true, nullsFirst: false });

    if (dbError){
        throw dbError;  
    } 
       return (
       <main className="mx-auto max-w-md p-4">
           <h1 className="text-3xl font-bold">Your applications ({applications.length})</h1>

           {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

           {applications.length === 0 ? (
               <p className="mt-4 text-text-secondary">Nothing here yet. Add your first application below.</p>
           ) : (
               <ul className="mt-4 space-y-3">
                   {applications.map((a) => (
                       <li key={a.id} className="rounded-xl border border-gray-200 bg-surface p-4">
                            <p className="font-semibold">{a.title}</p>
                            <p className="text-sm text-text-secondary">
                                {a.organisation ?? "No organisation"} · {a.type.replace("_", " ")}
                            </p>
                            <p className="mt-2 text-sm">
                                Status: {a.status} · Due: {a.deadline ?? "No deadline"}
                            </p>
                        </li>
                   ))}
               </ul>
           )}

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