# AutoHist — Screen Frames (V3.3)

Frames vazios premium prontos para receber capturas tratadas manualmente.

Nenhuma captura é renderizada enquanto `enabled: false` em `autohistMediaSlots`.

## Como inserir uma imagem depois

1. Tratar a captura offline (anonimização irreversível — ver `PRIVACY-SCREENSHOTS.md`).
2. Exportar WebP/AVIF nas dimensões recomendadas do slot.
3. Salvar em `site/public/products/autohist/screens/` com o nome futuro do slot.
4. Em `site/src/content/autohistScreens.ts`, setar `enabled: true` no slot.
5. Em `AutoHistExperience.tsx`, passar a mídia como `children` do `AutoHistMediaFrame` correspondente:

```tsx
import Image from "next/image";
import { autohistMediaSlots } from "@/content/autohistScreens";

const slot = autohistMediaSlots["flow-create-vehicle"];

<AutoHistMediaFrame
  variant={slot.variant}
  aspectRatio={slot.aspectRatio}
  index="01"
  label={slot.label}
  caption="…"
  status={slot.enabled ? "ready" : "empty"}
>
  {slot.enabled ? (
    <Image
      src={slot.futureSrc}
      alt=""
      width={slot.recommendedWidth}
      height={slot.recommendedHeight}
      style={{ objectPosition: slot.objectPosition }}
    />
  ) : null}
</AutoHistMediaFrame>
```

6. Não alterar CSS estrutural do frame — só o conteúdo do `.slot`.
7. Revisar checklist de privacidade antes de publicar.

## Mapa de slots

### Capítulo 03 — Como funciona

| Slot | Etapa | Proporção | Dimensão | Arquivo futuro | object-position |
| --- | --- | --- | --- | --- | --- |
| `flow-create-vehicle` | 01 Cadastrar veículo | 4:5 | 720×900 | `autohist-screen-create-order.webp` | top center |
| `flow-add-service` | 02 Adicionar serviço | 4:5 | 720×900 | `autohist-screen-service-details.webp` | top center |
| `flow-add-photos` | 03 Registrar fotos | 4:5 | 720×900 | `autohist-screen-add-photos.webp` | top center |
| `flow-history` | 04 Histórico permanente | 4:5 | 720×900 | `autohist-screen-order-history.webp` | top center |

**Onde:** `AutoHistExperience` → lista `.flowSteps`  
**Prop:** `children` do `AutoHistMediaFrame` + `status="ready"`

### Capítulo 04 — Busca inteligente

| Slot | Estágio | Proporção | Dimensão | Arquivo futuro | object-position |
| --- | --- | --- | --- | --- | --- |
| `search-plate` | PLACA | 4:5 | 720×900 | `autohist-screen-network-search.webp` | top center |
| `search-history` | HISTÓRICO | 4:5 | 720×900 | `autohist-screen-order-history.webp` | top center |
| `search-pdf` | PDF | 4:5 | 720×900 | `autohist-screen-export-pdf.webp` | center |

Moldura externa idêntica nos três estágios (proporção 4:5). O crop interno da imagem futura pode variar.

**Onde:** `AutoHistExperience` → `.searchDemo`  
**Prop:** `children` do `AutoHistMediaFrame`

### Capítulo 05 — Linha do tempo

Slots reservados (não renderizados em V3.3):

| Slot | Evento | Proporção | Arquivo futuro |
| --- | --- | --- | --- |
| `timeline-review` | Revisão | 4:5 | `autohist-screen-order-value.webp` |
| `timeline-replacement` | Troca | 4:5 | `autohist-screen-service-details.webp` |
| `timeline-inspection` | Inspeção | 4:5 | `autohist-screen-add-photos.webp` |
| `timeline-document` | Documento | 16:10 | `autohist-screen-export-pdf.webp` |
| `timeline-continuity` | Continuidade | 4:5 | `autohist-screen-network-search.webp` |

A timeline editorial permanece limpa. Inserir provas só quando as imagens manuais estiverem aprovadas.

## Checklist antes de publicar

- [ ] captura sanitizada irreversivelmente
- [ ] original fora de `public/`
- [ ] nome de arquivo neutro
- [ ] alt text sem dados reais
- [ ] proporção compatível com o slot
- [ ] `object-fit: cover` sem distorção crítica
- [ ] revisão desktop / tablet / mobile
- [ ] `enabled: true` apenas no slot aprovado
- [ ] typecheck / lint / build

## Componente

`site/src/components/products/autohist/AutoHistMediaFrame.tsx`

- `variant`: portrait | landscape | wide | timeline  
- `status`: empty | ready  
- `children`: slot de mídia  
- Layout externo estável — a imagem entra só no slot interno
