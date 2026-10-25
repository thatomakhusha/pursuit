"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NotesCard({ id, notes } : {id: number, notes: string | null}){
    const router = useRouter();
    const [text, setText] = useState(notes ?? "");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function saveNotes() {
        setSaving(true);
        setMessage(null);

        const supabase = createClient();
        const { error } = await supabase
            .from("applications")
            .update({ notes: text })
            .eq("id", id);

        setMessage(error ? "Could not save notes. Try again." : "Saved");
        if (!error) router.refresh();
        setSaving(false);
    }

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold">Notes</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add notes about this application..."
                rows={5}
                className="mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm"
            />

            <div className="mt-3 flex items-center gap-3">
                <button
                    type="button"
                    onClick={saveNotes}
                    disabled={saving}
                    className="rounded-xl bg-primary-dark px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Notes"}
                </button>
                {message && <p className="text-sm text-slate-500">{message}</p>}
            </div>
        </div>
    );
}