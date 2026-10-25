import Link from "next/link";
import { ChevronRight } from "lucide-react";
export default function ApplicationJourney(){
    return(
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm mt-8">
            <div className="flex justify-between">
                <h2 className="font-bold">Your Application Journey </h2>
                <Link href="/applications" className="hover:underline flex items-center gap-1 text-xs font-bold text-primary">
                    View all 
                    <ChevronRight size={16}/>
                </Link>
            </div>
        </div>
    );
}