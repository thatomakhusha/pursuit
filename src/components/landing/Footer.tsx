import Link from "next/link";
import { Target } from "lucide-react";

export default function Footer(){
    return (
        
        <footer className="bg-surface">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
                        <Target size={12} />
                    </span>
                    <span className="font-heading text-sm font-bold text-text-primary">
                        Pursuit
                    </span>
                </Link>

                <p className="text-xs text-text-muted">
                    A focused place for the opportunities ahead.
                </p>

                <p className="text-xs text-text-muted">
                    © 2026 Pursuit
                </p>
            </div>
        </footer>
    );
}