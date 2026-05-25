import Image from "next/image";
import {
  Banknote,
  ClipboardList,
  Eye,
  PenLine,
  Send,
  Workflow,
} from "lucide-react";
import { systemContent } from "@/lib/content";
import { AnimateOnScroll } from "./AnimateOnScroll";

const benefitIcons = [Banknote, ClipboardList, Send, Eye, Workflow, PenLine];

export function System() {
  return (
    <section
      id="nosso-sistema"
      className="bg-slate-50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {systemContent.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {systemContent.intro}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {systemContent.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <AnimateOnScroll key={benefit.title} delay={index * 80}>
                <div className="group h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-accent/30 hover:shadow-md">
                  <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll delay={200}>
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {systemContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <Image
              src="/images/system-dashboard.png"
              alt="Painel de gestão de contratações públicas IntegraPNCP"
              width={640}
              height={480}
              className="rounded-2xl shadow-xl ring-1 ring-slate-200/50"
            />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
