# RESPONSIVE AUDIT — Milestone 1

Auditoria responsiva do espelho Pemogan estabilizado.  
Método: análise estrutural do CSS/HTML Elementor + checklist por breakpoint. Validação visual fina deve ser repetida no browser nas larguras abaixo após `.\scripts\serve.ps1`.

## Breakpoints testados (checklist)

| Largura | Perfil | Foco |
|---------|--------|------|
| 375 px | Mobile compacto | Menu hamburger, tipografia, overflow |
| 430 px | Mobile largo | Idem |
| 768 px | Tablet portrait | Transição menu / grids |
| 1024 px | Tablet / laptop | Break Elementor tablet (≤1024) |
| 1280 px | Desktop | Layout completo |
| 1440 px | Desktop largo | xl kit |
| 1920 px | Full HD | Espaçamentos / hero |

Elementor config: mobile ≤767 · tablet ≤1024 · laptop ≤1366 · widescreen ≤2400.

---

## Achados

| Tema | Severidade | Evidência | Ação Milestone 1 |
|------|------------|-----------|------------------|
| Conteúdo preso em `.elementor-invisible` se JS falhar | Alta | `visibility:hidden` até animar | Stack JS preservado; não desligar animações |
| Tipografia display 150px / decorativa 450px | Média | Tokens kit | Overrides tablet no kit (105px); monitorar overflow em 375 |
| Margens negativas no hero (`-125px`, `-200px`) | Média | `post-412665.css` | Não alterado (design); verificar clip no mobile |
| `srcset` incompleto | Média→Baixa | Variantes ausentes | Filtrado para arquivos locais; `src` full-size ok |
| Menu: links mortos Industries/Case Study/Pricing | Média UX | Nav HFE | Convertidos para âncoras `#page-not-mirrored-*` |
| Overflow horizontal potencial | Baixa–Média | widths fixos pontuais / frames | Verificar no browser; sem redesign |
| Tabs nested | — | home/services/detail | Esperado empilhar no mobile (Elementor) |
| Accordion | — | FAQ etc. | 400ms; teclado via ARIA Elementor |
| Carrosséis | Baixa | libs globais, markup esparso | Validar se instâncias no DOM |
| Sticky libs inativas | Info | JetSticky data vazio | Sem impacto visual atual |
| Imagens | — | PNG locais | Proporções definidas width/height no HTML |
| `prefers-reduced-motion` | Lacuna | Não consistente | Tratar na reconstrução LCM |
| Interação teclado | — | Menu toggle / tabs / accordion | Depende HFE/Elementor — validar manualmente |

---

## Checklist manual (browser)

Usar DevTools device mode em cada largura:

- [ ] Sem scroll horizontal indesejado
- [ ] Hero legível; sem texto cortado
- [ ] Animações revelam elementos (nada fica invisível)
- [ ] Hamburger abre/fecha
- [ ] Dropdowns desktop funcionam
- [ ] Tabs alternam painéis
- [ ] Accordions expandem
- [ ] Counters animam ao entrar no viewport
- [ ] Scroll-to-top aparece após scroll
- [ ] Footer/header sem sobreposição quebrada
- [ ] Imagens não distorcidas
- [ ] Form visível (submit localmente desativado — esperado)

---

## Conclusão Milestone 1

A base responsiva do kit Elementor é **suficientemente sólida** para auditoria e referência visual.  
Problemas críticos de *carregamento* (fontes, srcset remoto, tracking) foram mitigados.  
Ajustes finos de overflow/tipografia ficam para o rebranding com tokens LCM — sem “corrigir” desligando motion.
