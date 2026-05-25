export type TransparencyCategory = {
  slug: string;
  title: string;
  description: string;
  legalReference: string;
  pdfFileName: string;
  pdfTitle: string;
};

export const transparencyIntro = {
  title: "Portal de Transparência",
  description:
    "Consulta pública de documentos de contratações publicados pelas entidades, conforme a Lei nº 14.133/2021.",
};

export const transparencyCategories: TransparencyCategory[] = [
  {
    slug: "editais-credenciamento",
    title: "Editais de credenciamento e pré-qualificação",
    description:
      "Editais de credenciamento e de pré-qualificação e respectivos anexos.",
    legalReference: "Art. 174, §2º, III — Lei 14.133/2021",
    pdfFileName: "edital-credenciamento.pdf",
    pdfTitle: "Edital de credenciamento",
  },
  {
    slug: "avisos-contratacao-direta",
    title: "Avisos de contratação direta",
    description: "Avisos de contratação direta e respectivos anexos.",
    legalReference: "Art. 174, §2º, III — Lei 14.133/2021",
    pdfFileName: "aviso-contratacao-direta.pdf",
    pdfTitle: "Aviso de contratação direta",
  },
  {
    slug: "editais-licitacao",
    title: "Editais de licitação",
    description:
      "Editais de licitação (compras e/ou alienações) e respectivos anexos.",
    legalReference: "Art. 174, §2º, III — Lei 14.133/2021",
    pdfFileName: "edital-licitacao.pdf",
    pdfTitle: "Edital de licitação",
  },
  {
    slug: "atas-registro-preco",
    title: "Atas de registro de preço",
    description: "Atas de registro de preços publicadas pelas entidades.",
    legalReference: "Art. 174, §2º, IV — Lei 14.133/2021",
    pdfFileName: "ata-registro-preco.pdf",
    pdfTitle: "Ata de registro de preço",
  },
  {
    slug: "contratos",
    title: "Contratos e termos aditivos",
    description: "Contratos firmados e respectivos termos aditivos.",
    legalReference: "Art. 174, §2º, V — Lei 14.133/2021",
    pdfFileName: "contrato-termo-aditivo.pdf",
    pdfTitle: "Contrato e termo aditivo",
  },
];

export function getTransparencyCategory(slug: string) {
  return transparencyCategories.find((category) => category.slug === slug);
}
