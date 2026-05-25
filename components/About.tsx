import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { aboutContent } from "@/lib/content";
import { assetPath } from "@/lib/paths";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function About() {
  return (
    <section id="quem-somos" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <AnimateOnScroll>
          <div className="relative order-2 lg:order-1">
            <Image
              src={assetPath("/images/about-public-sector.png")}
              alt="Equipe IntegraPNCP trabalhando em soluções para o setor público"
              width={640}
              height={480}
              className="rounded-2xl shadow-xl ring-1 ring-slate-200/50"
            />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150} className="order-1 lg:order-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {aboutContent.title}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              {aboutContent.cta}
              <ArrowRight size={18} />
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
