# ARCHITECTURE RECOMMENDATION — Milestone 1

## Contexto

O espelho HTTrack prova o **alvo visual/motion** (Elementor + addons), mas é um artefato de WordPress exportado: centenas de CSS/JS, plugins mortos (Woo), endpoints inválidos e manutenção hostil. A LCM precisa de site institucional + páginas de produtos (AutoHist, Dyson, LCM Studio) com SEO e evolução contínua.

---

## Opção A — Manter a base estática atual

| Critério | Avaliação |
|----------|-----------|
| Velocidade de execução | Alta no curto prazo (já “funciona” localmente) |
| Manutenção | **Muito baixa** — HTML monolítico, CSS gerado, IDs Elementor |
| Dependência WP/Elementor | Total |
| Peso | Alto (~70–110 assets/página) |
| Riscos | Regressões opacas; segurança/ruído de scripts herdados |
| Rebranding | Possível mas doloroso (search-replace em massa) |
| Hospedagem | Qualquer estático |

**Veredito A:** aceitável só como **referência congelada**, não como produto final.

---

## Opção B — Limpar e reconstruir em HTML/CSS/JS próprios

| Critério | Avaliação |
|----------|-----------|
| Preservação dos efeitos | Alta se portar motion conscientemente (ver EFFECTS-INVENTORY) |
| Redução de dependências | Alta (sair de jQuery/Elementor/Woo) |
| Manutenção | Boa para site pequeno/médio |
| Performance | Boa |
| Tempo de migração | Médio |
| SEO | Bom com HTML semântico + cuidado em meta |

**Veredito B:** caminho sólido se o time quiser simplicidade de deploy sem ecossistema React.

---

## Opção C — Reconstruir em React/Vite ou Next.js

| Critério | React + Vite | Next.js |
|----------|--------------|---------|
| Componentização | Excelente | Excelente |
| Páginas de produtos | Excelente | Excelente (+ rotas/app dir) |
| SEO | Requer cuidado (pré-render/SSG) | **Nativo** (SSG/SSR) |
| Desempenho | Excelente com SSG | Excelente |
| Escalabilidade | Alta | Alta (conteúdo/produtos) |
| Manutenção | Alta (ecosystem) | Alta |
| Custo/complexidade | Médio | Médio–alto |
| Reaproveitamento dos efeitos | Reimplementar com Framer Motion / CSS / GSAP / Swiper | Idem |

**Veredito C:** melhor alinhamento com produto tecnológico premium e expansão de páginas.

---

## Recomendação

### Escolha: **Opção C — Next.js (App Router) com SSG**

**Por quê**

1. **Fidelidade visual:** efeitos inventariados são reimplementáveis de forma controlada (scroll reveal, tabs, accordion, counters, menu) sem carregar Elementor.
2. **Performance:** eliminar Woo/MetForm/React-do-form-legado/duplicatas Swiper/Chart.
3. **SEO:** site institucional + produtos exige meta, OG, sitemap, URLs limpas — Next SSG encaixa.
4. **Escalabilidade:** AutoHist / Dyson / LCM Studio como rotas/componentes de produto.
5. **Manutenção:** design tokens CSS → tema LCM; conteúdo em MDX/CMS depois se necessário.
6. **Segurança:** zero endpoints WP herdados.
7. **Prazo:** usar o espelho + `EFFECTS-INVENTORY` + `CURRENT-DESIGN-TOKENS` como spec; Milestone 2 = design system LCM + Home; depois produtos.

### Papel da Opção B

Alternativa válida se Next for excesso para o momento. Ainda assim, **não** permanecer na Opção A como base de produção.

### Papel da Opção A

Manter `_backups/original-httrack-pemogan/` + branch de referência para comparar motion/layout durante a reconstrução.

---

## Plano sugerido (após Milestone 1 — não iniciar automaticamente)

1. Congelar referência (já feito).  
2. Definir tokens LCM a partir de `CURRENT-DESIGN-TOKENS.md`.  
3. Scaffold Next.js + design system.  
4. Reimplementar Home preservando efeitos prioritários do inventário.  
5. Páginas Empresa / Produtos / Contato.  
6. Form de contato próprio (sem MetForm).  
7. Desligar o espelho HTTrack como site público.

---

## Decisão resumida

| Pergunta | Resposta |
|----------|----------|
| Continuar na base atual? | **Não** (só referência) |
| HTML/CSS/JS limpo? | Aceitável |
| React/Vite? | Bom |
| **Next.js?** | **Recomendado** |
