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
                Organisation (optional)
                <input 
                    name="organisation"
                    type="text"
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
                    <option value="university">University</option>
                </select>
            </label>
            <label className="block text-sm font-medium">
                Deadline (optional)
                <input 
                    name="deadline"
                    type="date"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-surface p-3 text-base"
                />
            </label>
            <button type="submit" className="w-full rounded-xl bg-primary-dark p-3 font-semibold text-white">
                Add application
            </button>
        </form>
    );
}