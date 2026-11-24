import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Impact } from "@/components/Impact";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Intro />
      <Cursor />
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-60 h-0.5 bg-plum" />
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Work />
        <Impact />
        <Process />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
