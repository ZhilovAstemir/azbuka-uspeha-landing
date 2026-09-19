import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Advantages } from "@/components/sections/Advantages";
import { Programs } from "@/components/sections/Programs";
import { About } from "@/components/sections/About";
import { Steps } from "@/components/sections/Steps";
import { Teachers } from "@/components/sections/Teachers";
import { Reviews } from "@/components/sections/Reviews";
import { Prices } from "@/components/sections/Prices";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
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
        <Steps />
        <Teachers />
        <Reviews />
        <Prices />
        <InstagramFeed />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
