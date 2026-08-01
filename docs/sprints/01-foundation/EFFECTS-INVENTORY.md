# EFFECTS INVENTORY — Milestone 1

Referência para garantir que o rebranding futuro **não apague** os efeitos aprovados do template Pemogan.

Legenda de gatilho: `scroll` = Intersection/Elementor viewport · `load` · `hover` · `click` · `resize`.

---

## 1. Entrada de elementos (Elementor)

| Efeito | Página(s) | Seção típica | Seletor / atributo | Script | Biblioteca | Gatilho | Duração / delay | Easing | Desktop | Tablet | Mobile | Reuso LCM |
|--------|-----------|--------------|--------------------|--------|------------|---------|-----------------|--------|---------|--------|--------|-----------|
| Fade in | Home (+ outras) | Títulos/textos | `.elementor-invisible` + `data-settings._animation=fadeIn` | `elementor-frontend` | Elementor Animations CSS | scroll | delay 0–1800 ms | CSS keyframes (ease default) | OK | OK | OK | Alto |
| Fade in up | Home | Conteúdo inferior | `_animation=fadeInUp` | idem | idem | scroll | delays escalonados | idem | OK | OK | OK | Alto |
| Fade in down | Home (mais frequente ~38) | Cards/blocos | `_animation=fadeInDown` | idem | idem | scroll | 500–1400 ms comum | idem | OK | OK | OK | Alto |
| Fade in left | Home (~16) | Colunas/imagens | `_animation=fadeInLeft` | idem | idem | scroll | 300–900 ms | idem | OK | OK | OK | Alto |
| Fade in right | Home (~27) | Hero copy | `_animation=fadeInRight` | idem | idem | scroll | 300–500+ ms | idem | OK | OK | OK | Alto |
| Zoom in | Home (~19) | Imagens hero/tabs | `_animation=zoomIn` | idem | `zoomIn.min*.css` | scroll | variável | scale3d + opacity | OK | OK | OK | Alto |
| Shrink (hover) | Botões | CTA header/body | `.elementor-animation-shrink` | CSS | Elementor | hover | ~0.3s | transform scale(.9) | OK | OK | touch limitado | Alto |
| Animated slow | Home | Industry cards | `.animated-slow` | CSS/Elementor | Elementor | scroll | mais lento | — | OK | OK | OK | Médio |
| Invisible until animate | Todas com motion | Qualquer widget animado | `.elementor-invisible { visibility:hidden }` | Elementor JS **obrigatório** | Elementor | scroll | — | — | Crítico | Crítico | Crítico | Manter mecanismo equivalente |

**Risco:** se o JS do Elementor falhar, conteúdo permanece invisível. Não “corrigir” desligando animações globalmente.

---

## 2. Interações

| Efeito | Página | Seção | Seletor | Script/CSS | Biblioteca | Gatilho | Duração | Desktop/Tablet/Mobile | Reuso LCM |
|--------|--------|-------|---------|------------|------------|---------|---------|------------------------|-----------|
| Hover botão shrink | Todas | Header CTA | `.elementor-animation-shrink` | CSS | Elementor | hover | 0.3s | D/T ok; M via :active parcial | Sim |
| Hover cards / containers | Home/Services | Industry / service cards | classes Elementor + rkit blur | CSS post pages | Elementor / rkit | hover | — | Verificar overflow | Sim |
| Underline menu | Todas | Nav | `.hfe-pointer__underline` `.hfe-animation__fade` | HFE CSS/JS | HFE | hover | — | Desktop; mobile = drawer | Sim |
| Blur effect containers | Home | Blocos com `rtmkit-blur-effect-enabled` | `.rtmkit-blur-effect-enabled` | rkit CSS | Rometheme | visual/hover | — | Performance em mobile | Avaliar |
| Sombras / bordas / gradientes | Todas | Fundos PNG + CSS | backgrounds em post CSS | Elementor CSS | — | estático | — | OK | Adaptar tokens |
| Estado ativo tabs | Home, Services, Service Detail | Nested tabs | `.e-n-tabs` / `.e-n-tab-title[aria-selected=true]` | Elementor nested | Elementor | click | — | OK | Sim |
| Estado ativo accordion | FAQ, Team, Testimonial | FAQ blocks | `.e-n-accordion` | Elementor nested | Elementor | click | 400 ms | OK | Sim |

---

## 3. Componentes dinâmicos

| Componente | Página | Seção | Seletor | Script | Biblioteca | Gatilho | Notas desktop/mobile | Reuso LCM |
|------------|--------|-------|---------|--------|------------|---------|----------------------|-----------|
| Nested Tabs | home, services, service-detail | Services / Tools | `.e-n-tabs`, `elementor-widget-n-tabs` | Elementor frontend | Elementor | click | Stack em mobile | **Sim** (produtos) |
| Nested Accordion | faq, our-team, testimonial | FAQ | `.e-n-accordion` | Elementor | Elementor | click | `n_accordion_animation_duration: 400` | **Sim** |
| Counters | home, about, services… | Hero / Why us | `.elementor-counter` `data-duration="2000"` | Elementor + jquery-numerator | Elementor | scroll | 2000 ms | Adaptar (sem inventar métricas) |
| Menu desktop | Todas | Header | `.hfe-nav-menu` horizontal | HFE | HFE | hover/click | Dropdowns | Rebrand |
| Menu mobile | Todas | Header | `.hfe-nav-menu__toggle` breakpoint tablet | HFE | HFE | click | Drawer | Rebrand |
| Sticky header libs | Todas (enfileirado) | — | jet-sticky / jkit-sticky | JetSticky/JEG | — | scroll | **Dados vazios** — não ativo no conteúdo | Opcional futuro |
| Scroll to top | Todas | Footer/HFE | `.hfe-scroll-to-top-wrap` | inline jQuery HFE | HFE | scroll>100 / click | fade 300 ms | Sim |
| MetForm | Todas (CTA) | Contact strip | `.elementor-widget-metform` | MetForm React | MetForm | submit | **Submit desativado localmente** | Substituir backend |
| Swiper / Owl | Scripts globais | — | classes se presentes no DOM | themesflat/rkit | Swiper/Owl | init | Uso esparso no markup espelhado | Reaproveitar libs se necessário |
| Anime.js / text animation | Scripts globais | — | themesflat textanimation | Anime.js | Themesflat | load/scroll | Depende de widgets | Avaliar |
| Magnific / GLightbox | Scripts globais | — | — | Magnific/GLightbox | — | click | Se houver mídia | Opcional |
| Charts | Scripts Chart.js (duplicado) | — | rkit chart widgets | Chart.js | cdnjs + events-addon | load | Se DOM tiver canvas | Opcional |
| Running text / animated heading | CSS rkit enfileirado | — | `.rkit-*` | rkit JS | Rometheme | — | Verificar presença no DOM por página | Desejável se usado |

---

## 4. Contagens de animação (Home)

| `_animation` | Ocorrências aprox. |
|--------------|-------------------:|
| fadeInDown | 38 |
| fadeInRight | 27 |
| zoomIn | 19 |
| fadeInLeft | 16 |
| none | 14 |
| fadeInUp | 2 |
| fadeIn | 1 |

Delays observados: 0–1800 ms (comuns: 500, 800, 900, 1400).

---

## 5. Intensidade por página

`home` ≫ `services` ≈ `service-detail` > `about-us` > `faq` > `testimonial` ≈ `our-team` > `contacts`

---

## 6. `prefers-reduced-motion`

O template **não** implementa de forma consistente `prefers-reduced-motion`.  
Para LCM: adicionar política explícita na reconstrução (manter conteúdo visível; reduzir motion).

---

## 7. Checklist de preservação no rebranding

- [ ] Manter revelação por scroll (ou equivalente) sem deixar `opacity:0` / `visibility:hidden` permanente
- [ ] Preservar tabs e accordions com teclado (`aria-*`)
- [ ] Preservar hover de botões e cards (mesmo com nova paleta)
- [ ] Preservar menu mobile
- [ ] Preservar counters como padrão visual (valores reais LCM apenas quando oficiais)
- [ ] Documentar qualquer efeito removido neste inventário
