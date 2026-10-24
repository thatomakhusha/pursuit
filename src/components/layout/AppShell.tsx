"use client"

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }){
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-dvh bg-slate-50">
            <Sidebar open={open} onClose={() => setOpen(false)} />

            {open && (
                <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex items-center gap-3 border-b border-slate-200 bg-white p-4 md:hidden">
                    <button type="button" onClick={() => setOpen(true)} aria-label="Open menu">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold">Pursuit</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
            </div>
        </div>
    );
}