import { addApplication } from "@/app/(app)/applications/actions";

export default function AddApplicationForm(){
    return(
        <form action={addApplication} className="space-y-4">
            <label className="block text-sm font-medium">
                Title
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
                Organisation name
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
                Type
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
                Deadline 
                <input 
                    name="deadline"
                    required
                    type="date"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"
                />
            </label>
            <label className="block text-sm font-medium">
                Status
                <select name="status" required className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base">
                     <option value="Preparing">Preparing</option>
                    <option value="Applied">Applied</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </label>
            <label className="block text-sm font-medium">
                Application link (optional)
                <input name="source_url" type="url" maxLength={500} placeholder="https://careers.company.com/apply" className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base" />
            </label>
            <label className="block text-sm font-medium">
                Notes (optional)
                <textarea name="notes" rows={3} maxLength={1000} className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base" />
            </label>
            <button type="submit" className="w-full rounded-xl bg-primary-dark p-3 font-semibold text-white">
                Add application
            </button>
        </form>
    );
}