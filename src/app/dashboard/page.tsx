import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(auth)/actions";

async function DashboardContent(){
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");
    return <main className="mx-auto max-w-md p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Logged in as {user.email}</p>
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