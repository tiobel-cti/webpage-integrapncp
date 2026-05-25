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
    "Consulta pública de documentos de contratações publicados pelas entidades que utilizam o IntegraPNCP, conforme a Lei nº 14.133/2021.",
  disclaimer:
    "Os documentos marcados como exemplo ilustrativo servem apenas para demonstração da plataforma no processo de credenciamento junto ao PNCP.",
  baseUrl: "https://www.integrapncp.com.br",
};

export const transparencyCategories: TransparencyCategory[] = [
  {
    slug: "editais-credenciamento",
    title: "Editais de credenciamento e pré-qualificação",
    description:
      "Editais de credenciamento e de pré-qualificação e respectivos anexos.",
    legalReference: "Art. 174, §2º, III — Lei 14.133/2021",
    pdfFileName: "edital-credenciamento-exemplo.pdf",
    pdfTitle: "Edital de credenciamento — documento ilustrativo",
  },
  {
    slug: "avisos-contratacao-direta",
    title: "Avisos de contratação direta",
    description: "Avisos de contratação direta e respectivos anexos.",
    legalReference: "Art. 174, §2º, III — Lei 14.133/2021",
    pdfFileName: "aviso-contratacao-direta-exemplo.pdf",
    pdfTitle: "Aviso de contratação direta — documento ilustrativo",
  },
  {
    slug: "editais-licitacao",
    title: "Editais de licitação",
    description:
      "Editais de licitação (compras e/ou alienações) e respectivos anexos.",
    legalReference: "Art. 174, §2º, III — Lei 14.133/2021",
    pdfFileName: "edital-licitacao-exemplo.pdf",
    pdfTitle: "Edital de licitação — documento ilustrativo",
  },
  {
    slug: "atas-registro-preco",
    title: "Atas de registro de preço",
    description: "Atas de registro de preços publicadas pelas entidades.",
    legalReference: "Art. 174, §2º, IV — Lei 14.133/2021",
    pdfFileName: "ata-registro-preco-exemplo.pdf",
    pdfTitle: "Ata de registro de preço — documento ilustrativo",
  },
  {
    slug: "contratos",
    title: "Contratos e termos aditivos",
    description: "Contratos firmados e respectivos termos aditivos.",
    legalReference: "Art. 174, §2º, V — Lei 14.133/2021",
    pdfFileName: "contrato-termo-aditivo-exemplo.pdf",
    pdfTitle: "Contrato e termo aditivo — documento ilustrativo",
  },
];

export function getTransparencyCategory(slug: string) {
  return transparencyCategories.find((category) => category.slug === slug);
}

// URLs canônicas para o formulário de credenciamento PNCP
export const pncpFormUrls = Object.fromEntries(
  transparencyCategories.map((category) => [
    category.slug,
    `https://www.integrapncp.com.br/transparencia/${category.slug}/`,
  ]),
) as Record<string, string>;
