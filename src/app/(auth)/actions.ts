"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData){
    const supabase = await createClient();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        redirect("/login?error=" + encodeURIComponent("Wrong email or password"));
    } else {
        revalidatePath("/", "layout");
        redirect("/dashboard");
    }
    
}

export async function signup(formData: FormData){
    const supabase = await createClient();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name")?? "").trim();

    if (password.length < 8) {
        redirect("/signup?error=" + encodeURIComponent("Password needs 8+ characters"));
    }

    const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } });

    if (error) {
        redirect("/signup?error=" + encodeURIComponent(error.message));
    } else{
        revalidatePath("/", "layout");
        redirect("/dashboard");
    }
}

export async function logout(){
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}