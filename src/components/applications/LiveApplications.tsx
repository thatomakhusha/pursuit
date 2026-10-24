"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Application = {
    id: number; 
    title: string;
    organisation: string | null;
    type: string;
    status: string;
    deadline: string | null;
};

export default function LiveApplications({ initial, userId }: { initial: Application[]; userId: string }){
    const [items, setItems] = useState<Application[]>(initial);
   useEffect(() => {
        const supabase = createClient();

        const channel = supabase
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

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    return (
    <div>
        <h1 className="text-3xl font-bold">Your applications ({items.length})</h1>
        {items.length === 0 ? (
            <p className="mt-4 text-text-secondary">Nothing here yet. Add your first application below.</p>
        ) : (
            <ul aria-live="polite" className="mt-4 space-y-3">
            {items.map((a) => (
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
        </div>
    );
}