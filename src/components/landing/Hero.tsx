import { CircleCheck } from "lucide-react";

const Hero = () => {
    return ( 
        <section className="bg-linear-to-br from-white via-blue-50 to-blue-100">
            <div className="mx-auto flex min-h-179 max-w-7xl flex-col items-center px-6 py-24 text-center">
                
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
                    <span>STUDENT CAREER MANAGEMENT</span>
                </div>

                <h1 className="mt-12 max-w-4xl text-6xl font-extrabold leading-tight tracking-tight text-text-primary">
                    Track every opportunity.
                    <br />
                    <span className="text-primary">Build your future.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
                    Pursuit is the career command centre built for students. Manage your job,
                    internship, graduate programme, bursary, scholarship, and university
                    applications all in one place.
                </p>

                <div className="mt-10 flex items-center justify-center gap-3">
                    <a
                        href="/signup"
                        className="rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                    >
                        Get Started →
                    </a>

                    <a
                        href="/login"
                        className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-text-primary transition hover:bg-gray-50"
                    >
                        Log in
                    </a>
                </div>
                
                <div className="mt-12 flex flex-row items-center justify-center gap-8 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                        <span className="text-primary"><CircleCheck className="h-4 w-4 text-primary" /></span>
                        <span>No credit card required</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-primary"><CircleCheck className="h-4 w-4 text-primary" /></span>
                        <span>Free for students</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-primary"><CircleCheck className="h-4 w-4 text-primary" /></span>
                        <span>Secure &amp; private</span>
                    </div>
                </div>

            </div>
        </section>
     );
}
 
export default Hero;