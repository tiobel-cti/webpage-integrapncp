# Deploy — IntegraPNCP

Guia para publicar o site em **GitHub Pages** com domínio **www.integrapncp.com.br**.

## Pré-requisitos

- Repositório: `tiobel-cti/webpage-integrapncp`
- Domínio `integrapncp.com.br` registrado no Registro.br
- Conta gratuita em [web3forms.com](https://web3forms.com)

## 1. Configurar GitHub

### GitHub Actions (deploy automático)

1. **Settings → Pages → Source:** selecione **GitHub Actions**
2. **Settings → Secrets and variables → Actions → New repository secret:**
   - Nome: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - Valor: chave obtida em [web3forms.com](https://web3forms.com)

### Domínio customizado

1. **Settings → Pages → Custom domain:** `www.integrapncp.com.br`
2. Aguarde o **DNS check successful** (check verde)
3. Marque **Enforce HTTPS**

Se o GitHub solicitar verificação, adicione o registro **TXT** indicado na zona DNS do Registro.br.

## 2. Configurar DNS no Registro.br

1. Acesse [registro.br](https://registro.br) e faça login
2. Clique em **integrapncp.com.br**
3. Escolha **Utilizar servidores DNS do Registro.br**
4. Acesse **Modo avançado** / **Configurar endereçamento**
5. Remova registros conflitantes antigos (Wix, etc.)
6. Adicione:

| Entrada | Tipo | Destino |
|---------|------|---------|
| *(vazio = apex)* | A | `185.199.108.153` |
| *(vazio = apex)* | A | `185.199.109.153` |
| *(vazio = apex)* | A | `185.199.110.153` |
| *(vazio = apex)* | A | `185.199.111.153` |
| `www` | CNAME | `tiobel-cti.github.io` |

7. Salve e aguarde propagação (15 min – 24 h)

## 3. Verificar DNS

```bash
dig www.integrapncp.com.br CNAME +short
# esperado: tiobel-cti.github.io.

dig integrapncp.com.br A +short
# esperado: IPs 185.199.108.x
```

Ou use [dnschecker.org](https://dnschecker.org).

## 4. Web3Forms

1. Crie conta em [web3forms.com](https://web3forms.com)
2. Obtenha a `access_key`
3. Configure o e-mail de destino no painel Web3Forms
4. Adicione a chave como secret no GitHub (passo 1)

## 5. Desenvolvimento local

```bash
npm install
cp .env.example .env.local
# Edite .env.local com sua chave Web3Forms
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 6. Deploy

A cada push em `main`, o GitHub Actions:

1. Instala dependências
2. Executa `npm run build` (gera pasta `out/`)
3. Publica no GitHub Pages

### URLs suportadas (mesmo build)

O script `scripts/patch-static-export.mjs` roda após o build e:

1. Detecta automaticamente se o site está em `github.io/webpage-integrapncp` ou no domínio customizado
2. Ajusta a tag `<base>` e os caminhos dos assets (CSS, JS, imagens)

Não é necessário alterar nada no workflow ao migrar para `www.integrapncp.com.br`.

| URL | Funciona |
|-----|----------|
| `https://tiobel-cti.github.io/webpage-integrapncp/` | Sim |
| `https://www.integrapncp.com.br` | Sim |
| `https://integrapncp.com.br` | Sim (com registros A no apex) |

## Checklist final

- [ ] GitHub Actions verde no último deploy
- [ ] DNS propagado (`dig` retorna valores corretos)
- [ ] `https://www.integrapncp.com.br` abre o site
- [ ] HTTPS ativo (cadeado verde)
- [ ] Formulário de contato envia e-mail

## Troubleshooting

| Problema | Solução |
|----------|---------|
| DNS check unsuccessful | Aguardar propagação; confirmar CNAME `www` → `tiobel-cti.github.io` |
| Site 404 no domínio | Verificar deploy Actions; confirmar `public/CNAME` no repositório |
| HTTPS indisponível | Aguardar DNS validado antes de Enforce HTTPS |
| Formulário não envia | Verificar secret `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` no GitHub |
| CSS ou imagens quebrados | Hard refresh (`Cmd+Shift+R`); confirmar deploy recente com script `patch-static-export` |
