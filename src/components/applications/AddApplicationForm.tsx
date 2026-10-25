import { addApplication } from "@/app/(app)/applications/actions";
import Link from "next/link";

export default function AddApplicationForm(){
    return(
        <form action={addApplication} className="space-y-4">
            <label className="block text-sm font-medium">
                Role / Title <span className="text-rose-500">*</span>
                <input 
                    name="title"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"
                />
            </label>
            <label className="block text-sm font-medium">
                Organisation name <span className="text-rose-500">*</span>
                <input 
                    name="organisation"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"
                />
            </label>
            <label className="block text-sm font-medium">
                Application Type <span className="text-rose-500">*</span>
                <select name="type" required className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base">
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                    <option value="learnership">Learnership</option>
                    <option value="graduate_programme">Graduate Programme</option>
                    <option value="bursary">Bursary</option>
                    <option value="nsfas">NSFAS</option>
                    <option value="university">University</option>
                </select>
            </label>
            <label className="block text-sm font-medium">
                Deadline <span className="text-rose-500">*</span>
                <input 
                    name="deadline"
                    required
                    type="date"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"
                />
            </label>
            <label className="block text-sm font-medium">
                Status <span className="text-rose-500">*</span>
                <select name="status" required className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base">
                    <option value="Saved">Saved</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Applied">Applied</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </label>
            <label className="block text-sm font-medium">
                Application link
                <input name="source_url" type="url" maxLength={500} placeholder="https://careers.company.com/apply" className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base" />
            </label>
            <label className="block text-sm font-medium">
                Notes
                <textarea name="notes" rows={3} maxLength={1000} className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base" />
            </label>
            <div className="flex gap-3">
                <button type="submit" className="rounded-xl bg-primary-dark px-6 py-3 font-semibold text-white">
                    Save Application
                </button>
                <Link href="/applications" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold">
                    Cancel
                </Link>
            </div>
        </form>
    );
}