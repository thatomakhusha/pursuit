"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function QuickActions({ id, status} : {id: number; status: string }){
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function setStatus(newStatus: string){
        if (newStatus === status) {
            return;
        }

        setSaving(true);
        setError(null);
        const supabase = createClient();
        const { error: dbError } = await supabase
            .from("applications")
            .update({ status: newStatus })
            .eq("id", id);
        
        if (dbError) {
            setError("Could not update status. Try again.");
        } else {
            router.refresh();
        }
        setSaving(false);
    }

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold">Quick Actions</h2>
            <div className="mt-4 space-y-3">
                <button
                    type="button"
                    disabled={saving}
                    onClick={() => setStatus("Applied")}
                    className="w-full rounded-xl bg-slate-50 px-4 py-3 text-left font-medium disabled:opacity-50"
                >
                    Mark as Applied
                </button>
                <button
                    type="button"
                    disabled={saving}
                    onClick={() => setStatus("Interview")}
                    className="w-full rounded-xl bg-slate-50 px-4 py-3 text-left font-medium disabled:opacity-50"
                >
                    Log Interview
                </button>
                <button
                    type="button"
                    disabled={saving}
                    onClick={() => setStatus("Rejected")}
                    className="w-full rounded-xl bg-red-50 px-4 py-3 text-left font-medium text-red-600 disabled:opacity-50"
                >
                    Mark as Rejected
                </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
    );
}

