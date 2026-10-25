"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addApplication(formData: FormData){
    const title = String(formData.get("title") ?? "").trim();
    const type = String(formData.get("type") ?? "").trim();
    const organisation = String(formData.get("organisation") ?? "").trim();
    const deadline =String(formData.get("deadline") ?? "");
    const status = String(formData.get("status") ?? "Saved").trim();
    const sourceUrl = String(formData.get("source_url") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    const allowedTypes = ["job", "internship", "learnership", "graduate_programme", "bursary", "university", "nsfas"];
    const allowedStatuses = ["Saved", "Preparing", "Applied", "Assessment", "Interview", "Offer", "Rejected"];

    if (title.length > 120 || title.length < 2) {
        redirect("/applications?error=" + encodeURIComponent("Title must be 2 to 120 characters"))
    }
    if (!allowedTypes.includes(type)) {
        redirect("/applications?error=" + encodeURIComponent("Choose a valid type"));
    }
    if (deadline !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
        redirect("/applications?error=" + encodeURIComponent("Deadline must be a valid date"));
    }
    if (organisation.length < 2 || organisation.length > 120) {
        redirect("/applications?error=" + encodeURIComponent("Organisation must be 2 to 120 characters"));
    }
    if (!allowedStatuses.includes(status)) {
        redirect("/applications?error=" + encodeURIComponent("Choose a valid status"));
    }
    if (sourceUrl !== "" && (sourceUrl.length > 500 || !/^https?:\/\//i.test(sourceUrl))) {
        redirect("/applications?error=" + encodeURIComponent("Link must start with http:// or https://"));
    }
    if (notes.length > 1000) {
        redirect("/applications?error=" + encodeURIComponent("Notes must be 1000 characters or fewer"));
    }

    const supabase = await createClient();
    const { error } = await supabase.from("applications").insert({
        title,
        type,
        status,
        organisation,
        deadline: deadline || null,
        source_url: sourceUrl || null,
        notes: notes || null,
    });
    
    if (error) redirect("/applications?error=" + encodeURIComponent(error.message));
    revalidatePath("/applications");
    redirect("/applications");
}