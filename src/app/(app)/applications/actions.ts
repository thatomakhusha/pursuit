"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addApplication(formData: FormData){
    const title = String(formData.get("title") ?? "").trim();
    const type = String(formData.get("type") ?? "").trim();
    const organisation = String(formData.get("organisation") ?? "").trim();
    const deadline =String(formData.get("deadline") ?? "");
    const allowedTypes = ["job", "internship", "learnership", "graduate_programme", "bursary", "university"];

    if(title.length > 120 || title.length < 2){
        redirect("/applications?error=" + encodeURIComponent("Title must be 2 to 120 characters."))
    }
    if (!allowedTypes.includes(type)) {
        redirect("/applications?error=" + encodeURIComponent("Choose a valid type"));
    }
    if (deadline !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
        redirect("/applications?error=" + encodeURIComponent("Deadline must be a valid date"));
    }

    const status = type === "university" ? "Planning" : "Saved";

    const supabase = await createClient();
    const { error } = await supabase.from("applications").insert({
        title,
        type,
        status,
        organisation: organisation || null,
        deadline: deadline || null,
    });
    

    

    if (error) redirect("/applications?error=" + encodeURIComponent(error.message));
    revalidatePath("/applications");
    redirect("/applications");
}