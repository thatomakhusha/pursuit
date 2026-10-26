import { Target, ArrowRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return ( 
        <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 text-white rounded-md">
                        <Target size={22}/>
                    </div>
                    <span className="text-text-primary font-bold text-[1.2rem]">
                        Pursuit
                    </span>
                </Link>
                <div className="hidden items-center gap-8 md:flex">
                    <a
                        href="#product"
                        className="text-text-secondary hover:text-text-primary"
                    >
                        Product
                    </a>
                    <a
                        href="#workflow"
                        className="text-text-secondary hover:text-text-primary"
                    >
                        How it works
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <a href="/login" className="text-text-secondary font-semibold hover:text-text-primary">
                        Log in
                    </a>
                    <a href="/signup" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-hover">
                        Start tracking 
                        <ArrowRight size={12}/>
                    </a>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;
<nav>

</nav>