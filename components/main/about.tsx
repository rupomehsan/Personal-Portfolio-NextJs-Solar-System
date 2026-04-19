import { AboutContent } from "../sub/about-content";

export const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20 z-[20]"
    >
      <AboutContent />
    </section>
  );
};
