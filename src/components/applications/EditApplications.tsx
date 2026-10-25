"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Pencil, X } from "lucide-react";
import type { Application } from "./LiveApplications";

const TYPES = ["Job", "Internship", "Graduate Programme", "Scholarship", "University Application", "Bursary"];
const STATUSES = ["Saved", "Preparing", "Applied", "Assessment", "Interview", "Offer", "Rejected"];

export default function EditApplication({ application }: { application: Application }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        organisation: application.organisation ?? "",
        title: application.title,
        type: application.type,
        status: application.status,
        deadline: application.deadline ?? "",
        source_url: application.source_url ?? "",
    });

    function update(field: string, value: string) {
        setForm({ ...form, [field]: value });
    }

    async function save() {
        setSaving(true);
        setError(null);

        const supabase = createClient();
        const { error: dbError } = await supabase
            .from("applications")
            .update({
                organisation: form.organisation || null,
                title: form.title,
                type: form.type,
                status: form.status,
                deadline: form.deadline || null,
                source_url: form.source_url || null,
            })
            .eq("id", application.id);

        if (dbError) {
            setError("Could not save changes. Try again.");
        } else {
            router.refresh();
            setOpen(false);
        }
        setSaving(false);
    }

    function openModal() {
        setForm({
            organisation: application.organisation ?? "",
            title: application.title,
            type: application.type,
            status: application.status,
            deadline: application.deadline ?? "",
            source_url: application.source_url ?? "",
        });
        setError(null);
        setOpen(true);
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                aria-label="Edit application"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
                <Pencil size={18} aria-hidden="true" />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">Edit application</h2>
                            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                                <X size={18} aria-hidden="true" />
                            </button>
                        </div>

                        <label className="mt-4 block text-sm font-medium">
                            Role / Title
                            <input
                                value={form.title}
                                onChange={(e) => update("title", e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm font-normal"
                            />
                        </label>

                        <label className="mt-4 block text-sm font-medium">
                            Type
                            <select
                                value={form.type}
                                onChange={(e) => update("type", e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal"
                            >
                                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </label>

                        <label className="mt-4 block text-sm font-medium">
                            Organisation
                            <input
                                value={form.organisation}
                                onChange={(e) => update("organisation", e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm font-normal"
                            />
                        </label>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <label className="block text-sm font-medium">
                                Status
                                <select
                                    value={form.status}
                                    onChange={(e) => update("status", e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal"
                                >
                                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </label>

                            <label className="block text-sm font-medium">
                                Deadline
                                <input
                                    type="date"
                                    value={form.deadline}
                                    onChange={(e) => update("deadline", e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm font-normal"
                                />
                            </label>
                        </div>

                        <label className="mt-4 block text-sm font-medium">
                            Application link
                            <input
                                type="url"
                                value={form.source_url}
                                onChange={(e) => update("source_url", e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm font-normal"
                            />
                        </label>

                        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                        <div className="mt-6 flex gap-3">
                            <button type="button" onClick={save} disabled={saving} className="rounded-xl bg-primary-dark px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
                                {saving ? "Saving..." : "Save changes"}
                            </button>
                            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}