import { Contact } from "@/components/main/contact";
import { Hero } from "@/components/main/hero";
import { About } from "@/components/main/about";
import { Projects } from "@/components/main/projects";
import { Blogs } from "@/components/main/blogs";
import { Skills } from "@/components/main/experience";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blogs />
        <Contact />
      </div>
    </main>
  );
}
