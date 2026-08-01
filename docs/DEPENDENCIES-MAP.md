# DEPENDENCIES MAP — Milestone 1

Matriz das dependências herdadas do mirror Pemogan.  
**Nenhuma biblioteca foi removida nesta milestone**, exceto neutralização de endpoints remotos.

| Dependência | Arquivos (principais) | Onde é usada | Função visual | Essencial? | Pode ser substituída? | Risco ao remover |
| ----------- | --------------------- | ------------ | ------------- | ---------- | --------------------- | ---------------- |
| jQuery 3.7.1 + migrate | `wp-includes/js/jquery/*` | Todas as páginas | Base de plugins WP/Elementor | Sim (hoje) | Sim (rewrite moderno) | Quebra quase todos os widgets |
| Elementor Frontend | `plugins/elementor/assets/js/*`, `frontend.min*.css` | Todas | Layout, animações de entrada, tabs, accordion, counter | **Crítico** | Sim, com reimplementação | Seções ficam `visibility:hidden` / widgets mortos |
| Elementor Animations | `lib/animations/styles/{fadeIn*,zoomIn,shrink}*.css` | Home e páginas de conteúdo | fade/zoom/shrink | Sim para fidelidade | Sim (CSS/JS próprio) | Elementos invisíveis ou sem motion |
| Hello Elementor | `themes/hello-elementor/*` | Shell | Tema mínimo | Médio | Sim | Quebras de reset/base |
| Header Footer Elementor (HFE) | `plugins/header-footer-elementor/*` | Header/footer/menu/scroll-top | Menu desktop/mobile, sticky-ish header, back-to-top | **Crítico UX** | Sim | Menu/hamburger quebram |
| Rometheme Kit (rkit) | `plugins/rometheme-for-elementor/**` | CSS/JS enfileirados globalmente | Nav, sliders, accordion, charts, running text, etc. | Parcial (muito enfileirado, pouco usado no markup) | Sim | Baixo–médio se widget não estiver no DOM |
| Themesflat Addons | anime, textanimation, owl, magnific, swiper | Scripts globais | Motion/carousel/popup | Parcial | Sim | Carrosséis/popups se usados |
| ElementsKit Lite | `elementskit-lite/**` | Scripts + ícones | Widgets/ícones ekit | Médio | Sim | Ícones/widgets ekit |
| Jeg Elementor Kit | `jeg-elementor-kit/**` | Global | sticky/jkit icons | Baixo uso real | Sim | Baixo (sticky vazio) |
| JetSticky | `jetsticky-for-elementor/**` | Global | Sticky sections | Não usado no conteúdo (`elements_data` vazio) | Sim | Baixo hoje |
| Premium Addons | `premium-addons-for-elementor/**` | CSS global | Addons premium | Baixo uso no markup | Sim | Baixo |
| MetForm (+ React) | `metform/**` | CTA/contato | Formulário | Estrutura sim; backend não | Sim (form LCM) | Form some / submit quebra |
| WooCommerce | `woocommerce/**` | CSS/JS em todas | Shop leftovers + attribution | **Não** para site institucional | Remover depois | Reduz peso; risco baixo se limpar com cuidado |
| Events Addon | animate.css, typed, isotope, chart, sticky | Global | Extras | Baixo–médio | Sim | Typed/isotope se presentes |
| Template Kit Export | `template-kit-export/**` | Runtime kit Envato | Bootstrap do kit | Médio no espelho | Remover após rebuild | Pode afetar init do kit |
| Swiper (×2) | rkit + themesflat | Global | Sliders | Se houver instâncias | Sim | Sliders param |
| Owl Carousel | themesflat | Global | Carrosséis | Parcial | Sim | Carrosséis param |
| Anime.js | themesflat `anime.min*.js` | Global | Animações avançadas | Parcial | Sim | Motion avançada some |
| Magnific Popup / GLightbox | themesflat / rkit | Global | Lightboxes | Parcial | Sim | Popups de mídia |
| Chart.js | `cdnjs.../Chart.js/3.5.1` + events-addon | Scripts | Gráficos | Se houver charts no DOM | Sim | Charts quebram; **duplicata** |
| Font Awesome | Elementor packs | Ícones | Ícones UI | Médio | Sim (SVG LCM) | Ícones vazios |
| Instrument Sans + Inter | `uploads/.../google-fonts/**` | Tipografia kit | Identidade tipográfica do template | Sim p/ fidelidade atual | Sim (tokens LCM) | Fallback genérico |

## Observações

- Há **duplicação** intencional do mirror: Swiper e Chart.js carregados mais de uma vez.
- Muitos CSS rkit são “kit completo” enfileirado pelo WordPress mesmo sem widget correspondente na página.
- Para Milestone 2+, a remoção deve ser **por evidência de uso no DOM**, não por nome do plugin.

## CSS Elementor por página

| Arquivo | Papel |
|---------|-------|
| `post-399b4.css` | Kit globals (tokens) |
| `post-592ae.css` | Header |
| `post-792ae.css` | Footer |
| `post-2951304.css` | MetForm |
| `post-412665.css` | Home |
| `post-275dc5.css` | About |
| `post-395295.css` | Services |
| `post-37febc.css` | Service Detail |
| `post-23a3b3.css` | Our Team |
| `post-259cba.css` | Testimonial |
| `post-21cbba.css` | FAQ |
| `post-11fd47.css` | Contacts |
