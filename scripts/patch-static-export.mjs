import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

const OUT_DIR = "out";
const REPO_SLUG = "/webpage-integrapncp";

const BASE_PATH_SCRIPT = `<script>(function(){var r="${REPO_SLUG}";var p=location.pathname.indexOf(r)===0?r:"";window.__webpack_public_path__=(p||"")+"/_next/";document.write('<base href="'+(p||"")+'/" />');})();</script>`;

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function patchHtml(content) {
  let patched = content
    .replace(/"\/_next\//g, '"./_next/')
    .replace(/'\/_next\//g, "'./_next/")
    .replace(/"\/images\//g, '"./images/')
    .replace(/'\/images\//g, "'./images/");

  if (patched.includes("document.write('<base href=")) {
    return patched;
  }

  return patched.replace("<head>", `<head>${BASE_PATH_SCRIPT}`);
}

async function main() {
  const htmlFiles = await collectHtmlFiles(OUT_DIR);

  for (const file of htmlFiles) {
    const content = await readFile(file, "utf8");
    await writeFile(file, patchHtml(content));
  }

  console.log(`Patched ${htmlFiles.length} HTML file(s) for GitHub Pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
