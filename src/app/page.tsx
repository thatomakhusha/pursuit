import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <HowItWorks/>
      </main>
      <Footer/>
    </>
  )
  
}