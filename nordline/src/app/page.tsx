import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Directions } from "@/components/sections/directions";
import { Catalog } from "@/components/sections/catalog";
import { Approach } from "@/components/sections/approach";
import { Industries } from "@/components/sections/industries";
import { FinalCta } from "@/components/sections/final-cta";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Directions />
        <Catalog />
        <Approach />
        <Industries />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
