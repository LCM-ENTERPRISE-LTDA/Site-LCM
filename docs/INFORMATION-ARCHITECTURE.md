# INFORMATION ARCHITECTURE — Milestone 2

## Navegação principal

```text
Home
Empresa
Produtos
  ├─ Visão geral
  ├─ AutoHist
  ├─ Dyson
  ├─ LCM Studio
  └─ BusinessZap
Tecnologia
Contato
```

## Modelo mental

1. **Home** — proposta de valor + portfólio + princípios + origem.
2. **Empresa** — quem somos e como pensamos (sem biografias/números inventados).
3. **Produtos** — índice + detalhe por slug (dados centralizados).
4. **Tecnologia** — princípios de engenharia, sem buzzwords não comprovados.
5. **Contato** — formulário acessível + dados oficiais quando existirem.

## Status de produto

Fonte única: `site/src/data/products.ts`

```ts
type ProductStatus = "available" | "beta" | "development" | "concept";
```

Nesta milestone: nenhum produto marcado como `available`.

## Separação referência × produção

| Referência Pemogan | Produção LCM |
|--------------------|--------------|
| Mirror HTTrack na raiz | `site/` Next.js |
| Documentada em `reference/` | Rotas em português |
| Só visual/motion | Conteúdo institucional LCM |
