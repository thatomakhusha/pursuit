
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );

                    supabaseResponse = NextResponse.next({ request });

                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    const isPublic =
        path === "/" ||
        path.startsWith("/login") ||
        path.startsWith("/signup");

    const isProfilePage = path === "/profile";

    // Redirect unauthenticated visitors away from protected pages.
    if (!user && !isPublic) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Allow the user to complete their profile without a redirect loop.
    if (user && !isPublic && !isProfilePage) {
        const { data: profile, error } = await supabase
            .from("profiles")
            .select("profile_completed")
            .eq("user_id", user.id)
            .maybeSingle();

        // Fail closed if the profile cannot be verified.
        if (error || profile?.profile_completed !== true) {
            const url = request.nextUrl.clone();
            url.pathname = "/profile";
            url.search = "";
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}
