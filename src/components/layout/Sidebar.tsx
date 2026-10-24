"use client";

import Link from "next/link";
import {
  Target,
  LayoutDashboard,
  FolderKanban,
  FileText,
  User,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { logout } from "@/app/(auth)/actions";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Applications", icon: FolderKanban },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];


export default function Sidebar(){
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar text-slate-300">
            <div className="border-b border-white/10 p-5">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 text-white rounded-md">
                        <Target size={22}/>
                    </div>
                    <span className="text-white font-bold text-[1.2rem]">
                        Pursuit
                    </span>
                </Link>
            </div>
            <div className="px-4 pt-5 mb-7">
                <Link
                    href="/applications?new=true"
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white"
                >
                    <Plus size={20} />
                    Add Application
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {links.map(({ href, label, icon: Icon }) => {
                    const active = pathname.startsWith(href);
                    return(
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 ${active ? "bg-slate-800 text-sky-400" : "hover:bg-slate-800/50"}`}
                        >
                            <Icon size={22} />
                            {label}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-white/10 p-5">
                <form action={logout}>
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800/50"
                    >
                        <LogOut size={22} />
                        Sign out
                    </button>
                </form>
            </div>
        </aside>
    )
}