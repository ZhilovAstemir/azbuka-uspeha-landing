import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Advantages } from "@/components/sections/Advantages";
import { Programs } from "@/components/sections/Programs";
import { About } from "@/components/sections/About";
import { Steps } from "@/components/sections/Steps";
import { Gallery } from "@/components/sections/Gallery";
import { Teachers } from "@/components/sections/Teachers";
import { Reviews } from "@/components/sections/Reviews";
import { Prices } from "@/components/sections/Prices";
import { Faq } from "@/components/sections/Faq";
import { Contacts } from "@/components/sections/Contacts";
import { Footer } from "@/components/sections/Footer";
import { FloatingCta } from "@/components/FloatingCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Advantages />
        <Programs />
        <About />
        <Gallery />
        <Steps />
        <Teachers />
        <Reviews />
        <Prices />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
