import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Properties } from "@/components/sections/Properties";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { CTA } from "@/components/sections/CTA";
import { SellCTA } from "@/components/sections/SellCTA";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main>
        <Hero />
        <Properties />
        <Stats />
        <Services />
        <About />
        <CTA />
        <SellCTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
