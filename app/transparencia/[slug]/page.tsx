import { notFound } from "next/navigation";
import { TransparencyCategoryPage } from "@/components/Transparency";
import { getTransparencyCategory } from "@/lib/transparencia";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [
    { slug: "editais-credenciamento" },
    { slug: "avisos-contratacao-direta" },
    { slug: "editais-licitacao" },
    { slug: "atas-registro-preco" },
    { slug: "contratos" },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getTransparencyCategory(slug);

  if (!category) {
    return { title: "Transparência | IntegraPNCP" };
  }

  return {
    title: `${category.title} | Transparência | IntegraPNCP`,
    description: category.description,
  };
}

export default async function TransparenciaCategoryRoute({ params }: PageProps) {
  const { slug } = await params;
  const category = getTransparencyCategory(slug);

  if (!category) {
    notFound();
  }

  return <TransparencyCategoryPage category={category} />;
}
