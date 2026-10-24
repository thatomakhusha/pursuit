"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import PageHeader from "@/components/layout/PageHeader";
import { StatusBadge, TypeBadge } from "@/components/ui/Badges";

export type Application = {
    id: number; 
    title: string;
    organisation: string | null;
    type: string;
    status: string;
    deadline: string | null;
    source_url: string | null;
    notes: string | null;
};

export default function LiveApplications({ initial, userId }: { initial: Application[]; userId: string }) {
    const [items, setItems] = useState<Application[]>(initial);

    useEffect(() => {
        const supabase = createClient();
        let channel: ReturnType<typeof supabase.channel> | null = null;
        let cancelled = false;

        async function start() {
            const { data: { session } } = await supabase.auth.getSession();
            if (cancelled) return;
            if (session) supabase.realtime.setAuth(session.access_token);

            channel = supabase
                .channel(`applications-${userId}`)
                .on(
                    "postgres_changes",
                    { event: "*", schema: "public", table: "applications", filter: `user_id=eq.${userId}` },
                    (payload) => {
                        if (payload.eventType === "INSERT") {
                            setItems((prev) => prev.some((a) => a.id === (payload.new as Application).id) ? prev : [...prev, payload.new as Application]);
                        } else if (payload.eventType === "UPDATE") {
                            setItems((prev) => prev.map((a) => a.id === (payload.new as Application).id ? (payload.new as Application) : a));
                        } else if (payload.eventType === "DELETE") {
                            setItems((prev) => prev.filter((a) => a.id !== (payload.old as { id: number }).id));
                        }
                    }
                )
                .subscribe((status) => console.log("realtime:", status));
            }

            start();

            return () => {
                cancelled = true;
                if (channel) supabase.removeChannel(channel);
            };
    }, [userId]);

    return (
    <div>
        <p className="text-sm text-slate-500">{items.length} applications tracked</p>
        {items.length === 0 ? (
            <p className="mt-4 text-text-secondary">Nothing here yet. Add your first application below.</p>
        ) : (
            <ul aria-live="polite" className="mt-4 space-y-3">
            {items.map((a) => (
                <li key={a.id} className="rounded-xl border border-gray-200 bg-surface p-4">
                    <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold">{a.title}</p>
                        <TypeBadge type={a.type} />
                    </div>
                    <p className="text-sm text-slate-500">{a.organisation ?? "No organisation"}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <StatusBadge status={a.status} />
                        <span className="text-slate-500">Due: {a.deadline ?? "No deadline"}</span>
                    </div>
                    {a.source_url && (
                        <a href={a.source_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-primary-dark underline">
                            Open application page
                        </a>
                    )}
                    {a.notes && (
                        <p className="mt-3 whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{a.notes}</p>
                    )}
                </li>
            ))}
        </ul>
        )}
        </div>
    );
}