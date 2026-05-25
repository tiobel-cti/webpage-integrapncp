export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;

  if (process.env.NODE_ENV === "development") {
    return `/${normalized}`;
  }

  // Caminhos relativos + <base> injetado no build funcionam em github.io/repo e domínio customizado
  return `./${normalized}`;
}
