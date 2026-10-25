"use client"

import ApplicationCard from "@/components/ui/ApplicationCard";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Application } from "./LiveApplications";
import { STATUS_STYLES } from "@/components/ui/Badges";

const COLUMNS = ["Saved", "Preparing", "Applied", "Assessment", "Interview", "Offer", "Rejected"];

export default function KanbanBoard({ initial, userId }: { initial: Application[]; userId: string }) {
    const [items, setItems] = useState<Application[]>(initial);

    async function moveApplication(id: number, newStatus: string) {
        const current = items.find((a) => a.id === id);
        if (!current || current.status === newStatus) return;

        const previous = items;
        setItems((prev) => prev.map((a) => a.id === id ? { ...a, status: newStatus } : a));

        const supabase = createClient();
        const { error } = await supabase
            .from("applications")
            .update({ status: newStatus })
            .eq("id", id);

        if (error) setItems(previous);
    }

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
                .subscribe();
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
            <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
                {COLUMNS.map((status) => {
                    const column = items.filter((a) => a.status === status);
                    return (
                        <section
                            key={status}
                            className="w-72 shrink-0"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                const id = Number(e.dataTransfer.getData("text/plain"));
                                moveApplication(id, status);
                            }}
                        >
                            <div className="flex items-center justify-between px-1">
                                <span className="flex items-center gap-2 font-semibold">
                                    <span className={`h-2.5 w-2.5 rounded-full ${STATUS_STYLES[status]?.dot ?? "bg-slate-400"}`} />
                                    {status}
                                </span>
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{column.length}</span>
                            </div>
                            <div className="mt-3 space-y-3">
                                {column.map((a) => (
                                    <div
                                        key={a.id}
                                        draggable
                                        onDragStart={(e) => e.dataTransfer.setData("text/plain", String(a.id))}
                                        className="cursor-grab active:cursor-grabbing"
                                    >
                                        <ApplicationCard application={a} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}