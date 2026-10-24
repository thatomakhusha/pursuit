import { Target } from "lucide-react";

const Navbar = () => {
    return ( 
        <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <a href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 text-white rounded-md">
                        <Target size={22}/>
                    </div>
                    <span className="text-text-primary font-bold text-[1.2rem]">
                        Pursuit
                    </span>
                </a>

                <div className="flex items-center gap-4">
                    <a href="/login" className="text-text-secondary font-semibold hover:text-text-primary">
                        Log in
                    </a>
                    <a href="/signup" className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-hover">
                        Get Started
                    </a>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;
<nav>

</nav>