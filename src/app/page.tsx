import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { SelectedWork } from "@/components/selected-work";
import { TechnicalStack } from "@/components/technical-stack";
import { CurrentlyLearning } from "@/components/currently-learning";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <SelectedWork />
        <TechnicalStack />
        <CurrentlyLearning />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
