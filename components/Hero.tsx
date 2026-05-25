import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/lib/content";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/40 pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <AnimateOnScroll>
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Integração com o PNCP
            </span>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {heroContent.headline}
            </h1>
            <div className="space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {heroContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              {heroContent.cta}
              <ArrowRight size={18} />
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl" />
            <Image
              src="/images/hero-integration.png"
              alt="Integração de entidades públicas com o Portal PNCP"
              width={640}
              height={480}
              priority
              className="relative rounded-2xl shadow-2xl ring-1 ring-slate-200/50"
            />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
