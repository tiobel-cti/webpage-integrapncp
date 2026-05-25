import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { siteConfig } from "@/lib/content";
import { assetPath } from "@/lib/paths";
import type { TransparencyCategory } from "@/lib/transparencia";
import { transparencyCategories, transparencyIntro } from "@/lib/transparencia";

export function TransparencyHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-primary">
          {siteConfig.name}
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Voltar ao site
        </Link>
      </div>
    </header>
  );
}

type TransparencyCategoryPageProps = {
  category: TransparencyCategory;
};

export function TransparencyCategoryPage({
  category,
}: TransparencyCategoryPageProps) {
  const pdfPath = assetPath(
    `/transparencia/documentos/${category.pdfFileName}`,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <TransparencyHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/transparencia/" className="hover:text-primary">
            Transparência
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{category.title}</span>
        </nav>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-accent">{category.legalReference}</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {category.title}
          </h1>
          <p className="mt-3 text-slate-600">{category.description}</p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {transparencyIntro.disclaimer}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Documentos disponíveis
            </h2>
            <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
              <li className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {category.pdfTitle}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">PDF — exemplo ilustrativo</p>
                  </div>
                </div>
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                  <Download size={16} />
                  Baixar PDF
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Outras categorias
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {transparencyCategories
              .filter((item) => item.slug !== category.slug)
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/transparencia/${item.slug}/`}
                    className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:border-accent/40 hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export function TransparencyIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TransparencyHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-bold text-slate-900">
          {transparencyIntro.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {transparencyIntro.description}
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {transparencyIntro.disclaimer}
        </div>

        <div className="mt-8 grid gap-4">
          {transparencyCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/transparencia/${category.slug}/`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
            >
              <p className="text-xs font-medium text-accent">
                {category.legalReference}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                {category.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">
            URLs para credenciamento PNCP
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Use os endereços abaixo no formulário de cadastro da plataforma:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {transparencyCategories.map((category) => (
              <li key={category.slug} className="break-all font-mono text-slate-700">
                {transparencyIntro.baseUrl}/transparencia/{category.slug}/
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
