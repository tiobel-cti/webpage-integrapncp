#!/usr/bin/env python3
"""Gera PDFs de demonstração para o portal de transparência."""

from pathlib import Path

DOCUMENTS = [
    (
        "edital-credenciamento-exemplo.pdf",
        "EDITAL DE CREDENCIAMENTO - EXEMPLO ILUSTRATIVO",
        "IntegraPNCP - Portal de Transparencia\n\nDocumento ilustrativo para credenciamento PNCP.\nCategoria: Editais de credenciamento e pre-qualificacao.\nLei 14.133/2021, art. 174, par. 2, III.",
    ),
    (
        "aviso-contratacao-direta-exemplo.pdf",
        "AVISO DE CONTRATACAO DIRETA - EXEMPLO ILUSTRATIVO",
        "IntegraPNCP - Portal de Transparencia\n\nDocumento ilustrativo para credenciamento PNCP.\nCategoria: Avisos de contratacao direta.\nLei 14.133/2021, art. 174, par. 2, III.",
    ),
    (
        "edital-licitacao-exemplo.pdf",
        "EDITAL DE LICITACAO - EXEMPLO ILUSTRATIVO",
        "IntegraPNCP - Portal de Transparencia\n\nDocumento ilustrativo para credenciamento PNCP.\nCategoria: Editais de licitacao.\nLei 14.133/2021, art. 174, par. 2, III.",
    ),
    (
        "ata-registro-preco-exemplo.pdf",
        "ATA DE REGISTRO DE PRECO - EXEMPLO ILUSTRATIVO",
        "IntegraPNCP - Portal de Transparencia\n\nDocumento ilustrativo para credenciamento PNCP.\nCategoria: Atas de registro de preco.\nLei 14.133/2021, art. 174, par. 2, IV.",
    ),
    (
        "contrato-termo-aditivo-exemplo.pdf",
        "CONTRATO E TERMO ADITIVO - EXEMPLO ILUSTRATIVO",
        "IntegraPNCP - Portal de Transparencia\n\nDocumento ilustrativo para credenciamento PNCP.\nCategoria: Contratos e termos aditivos.\nLei 14.133/2021, art. 174, par. 2, V.",
    ),
]


def escape_pdf_text(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def build_pdf(title: str, body: str) -> bytes:
    content_lines = [
        "BT",
        "/F1 16 Tf",
        "50 750 Td",
        f"({escape_pdf_text(title)}) Tj",
        "0 -28 Td",
        "/F1 11 Tf",
    ]

    for line in body.split("\n"):
        content_lines.append(f"({escape_pdf_text(line)}) Tj")
        content_lines.append("0 -18 Td")

    content_lines.append("ET")
    stream = "\n".join(content_lines).encode("latin-1", errors="replace")
    stream_header = f"<< /Length {len(stream)} >>\nstream\n".encode("ascii")
    stream_footer = b"\nendstream"

    objects = []
    objects.append(b"1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj")
    objects.append(b"2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj")
    objects.append(
        b"3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
        b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> >>endobj"
    )
    objects.append(b"4 0 obj" + stream_header + stream + stream_footer + b" endobj")
    objects.append(
        b"5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj"
    )

    output = b"%PDF-1.4\n"
    offsets = [0]

    for obj in objects:
        offsets.append(len(output))
        output += obj + b"\n"

    xref_pos = len(output)
    output += f"xref\n0 {len(offsets)}\n".encode("ascii")
    output += b"0000000000 65535 f \n"
    for offset in offsets[1:]:
        output += f"{offset:010d} 00000 n \n".encode("ascii")

    output += b"trailer<< /Size " + str(len(offsets)).encode("ascii") + b" /Root 1 0 R >>\n"
    output += b"startxref\n" + str(xref_pos).encode("ascii") + b"\n%%EOF\n"
    return output


def main() -> None:
    output_dir = Path(__file__).resolve().parent.parent / "public" / "transparencia" / "documentos"
    output_dir.mkdir(parents=True, exist_ok=True)

    for filename, title, body in DOCUMENTS:
        path = output_dir / filename
        path.write_bytes(build_pdf(title, body))
        print(f"Gerado: {path}")


if __name__ == "__main__":
    main()
