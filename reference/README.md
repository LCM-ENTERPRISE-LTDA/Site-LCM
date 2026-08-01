# Referência visual — Pemogan (HTTrack)

Esta pasta documenta a **referência visual e de motion** usada na Milestone 1.

## Onde está o espelho

O mirror HTTrack permanece no layout original do repositório (não movido, para não quebrar visualização):

```text
../nva.nirmanavisual.com/pemogan/template-kit/
../cdnjs.cloudflare.com/
../index.html          → redireciona para a Home Pemogan
../scripts/serve.ps1   → servidor HTTP da referência
../_backups/original-httrack-pemogan/  → cópia imutável
```

## Como visualizar

Na raiz do repositório:

```powershell
.\scripts\serve.ps1
```

Abra: http://127.0.0.1:8080/

## Relação com o site novo

| Pasta | Papel |
|-------|-------|
| Espelho HTTrack (raiz) | Referência congelada de UI/motion |
| `_backups/` | Backup imutável da captura original |
| `../site/` | Aplicação Next.js de produção (LCM) |

**Não** importar CSS/JS/HTML do Elementor/WordPress para dentro de `site/`.
