# PRIVACY — Capturas AutoHist

## Finalidade

As capturas publicadas em `/produtos/autohist` demonstram a interface real do produto sem expor dados pessoais, empresariais ou operacionais identificáveis.

## Regra fundamental

**Nunca publicar originais.**

- Originais permanecem somente em `docs/sprints/08-autohist/Imagens Reais AutoHist/`
- Somente derivados sanitizados e rasterizados podem existir em `site/public/products/autohist/screens/`
- Não usar `filter: blur` no CSS, overlays HTML ou hover como proteção
- Não manter versão “sem censura” no bundle

## Categorias que devem ser removidas

- Nome de pessoa (cliente, funcionário, usuário, administrador)
- Nome de oficina / empresa
- CPF / CNPJ
- Telefone / e-mail / endereço
- Placa real de terceiro
- Descrição livre com nomes
- Identificadores internos vinculáveis
- Valores comerciais associados a identidade real
- Qualquer PII visível em fotos anexadas

## Estratégia de anonimização (ordem)

1. **Substituição** por dados fictícios consistentes
2. **Tarja opaca** integrada ao fundo da UI (raster no arquivo)
3. **Blur destrutivo** rasterizado (somente quando necessário)
4. **Recorte** da área sensível quando não for necessária

## Dados fictícios oficiais

| Campo | Valor |
| --- | --- |
| Oficina | Oficina Demonstração |
| CNPJ | 00.000.000/0000-00 |
| Funcionários | Funcionário A / B / C |
| Placa principal | AUT0H25 |
| Placa alternativa | ABC1D23 |
| Placa formatada | AUT - 0H25 |
| Serviço | Manutenção preventiva |
| Valor OS | R$ 350,00 |
| Saldo | R$ 18.750,00 |
| Média por OS | R$ 146,48 |
| Total de ordens | 128 |
| Funcionários ativos | 4 |
| OS demo | #000101 / #000102 / #000103 |
| Modelo | Veículo Demonstração |
| Marca | Marca Demo |
| Quilometragem | 45.200 km |

## Pipeline

```bash
cd site
node ../scripts/sanitize-autohist-screens.mjs
```

O script:

1. Lê somente originais em `docs/`
2. Aplica coberturas raster opacas + texto fictício
3. Recorta e padroniza dimensões
4. Exporta WebP sem metadados EXIF
5. Grava somente em `site/public/products/autohist/screens/`
6. Gera relatório em `docs/sprints/08-autohist/sanitization/`
7. **Nunca** altera o original

Configuração: objeto `DEMO` + regiões por arquivo em `scripts/sanitize-autohist-screens.mjs`.  
A configuração **não** deve conter dados reais.

## Processo para nova captura

1. Guardar o original somente em `docs/sprints/08-autohist/Imagens Reais AutoHist/`
2. Inventariar conteúdo e categorias sensíveis (sem copiar PII para docs públicos)
3. Adicionar mapa de regiões no script com dados fictícios
4. Rodar o pipeline
5. Revisar em zoom 200%
6. Atualizar `autohistScreens.ts` (nome neutro, alt neutro, width/height)
7. Preencher o checklist abaixo
8. Commitar derivados + script + docs — nunca o original em `public/`

## Checklist obrigatório

- [ ] nenhum nome real
- [ ] nenhuma empresa real
- [ ] nenhum CPF/CNPJ real
- [ ] nenhum telefone real
- [ ] nenhum e-mail real
- [ ] nenhuma placa de terceiro
- [ ] nenhuma descrição com nome
- [ ] nenhum metadado EXIF
- [ ] original fora de `public`
- [ ] versão pública rasterizada
- [ ] dados fictícios consistentes
- [ ] revisão visual em zoom de 200%
- [ ] revisão do alt text
- [ ] revisão do nome do arquivo
- [ ] revisão do código e documentação

## Arquivos finais públicos

| Arquivo | Capítulo |
| --- | --- |
| `autohist-screen-create-order.webp` | 03 — etapa 01 |
| `autohist-screen-service-details.webp` | 03 — etapa 02 |
| `autohist-screen-add-photos.webp` | 03 — etapa 03 / 05 Inspeção |
| `autohist-screen-order-history.webp` | 03 — etapa 04 / 04 Histórico |
| `autohist-screen-network-search.webp` | 04 — Placa / 05 Continuidade |
| `autohist-screen-export-pdf.webp` | 04 — PDF / 05 Documento |
| `autohist-screen-order-value.webp` | 05 — Revisão |
| `autohist-screen-company-dashboard.webp` | painel empresa (sanitizado) |

## Metadados

Re-encoding WebP via Sharp remove EXIF/IPTC dos derivados. Confirmar com inspeção de arquivo após cada geração.
