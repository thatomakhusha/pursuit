"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteApplication({ id }: { id: number }) {
    const router = useRouter();
    const [confirming, setConfirming] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function deleteApplication() {
        setDeleting(true);
        setError(null);

        const supabase = createClient();
        const { data, error: dbError } = await supabase
            .from("applications")
            .delete()
            .eq("id", id)
            .select("id");

        if (dbError || !data?.length) {
            setError("Could not delete this application.");
            setDeleting(false);
            return;
        }

        router.push("/applications");
    }

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            {confirming ? (
                <div>
                    <p className="text-sm">Delete this application? This can't be undone.</p>
                    <div className="mt-3 flex gap-3">
                        <button
                            type="button"
                            onClick={deleteApplication}
                            disabled={deleting}
                            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                        >
                            {deleting ? "Deleting..." : "Yes, delete"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setConfirming(false)}
                            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="w-full rounded-xl bg-red-50 px-4 py-3 text-left font-medium text-red-600"
                >
                    Delete application
                </button>
            )}
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
    );
}