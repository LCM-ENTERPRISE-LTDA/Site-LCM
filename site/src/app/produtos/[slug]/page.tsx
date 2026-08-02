import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { AutoHistExperience } from "@/components/products/autohist/AutoHistExperience";
import { ProductHero } from "@/components/product/ProductHero";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBySlug, products } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  if (slug === "autohist") {
    return buildMetadata({
      title: "AutoHist",
      description:
        "O histórico começa antes do problema. AutoHist preserva a memória completa de cada veículo — prontuário digital para oficinas.",
      path: "/produtos/autohist",
    });
  }

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: product.href,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  if (slug === "autohist") {
    return <AutoHistExperience />;
  }

  return (
    <>
      <ProductHero product={product} />

      <Section>
        <Container>
          <div className={styles.grid}>
            <Reveal>
              <FeatureCard title="Problema" description={product.problem} />
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard title="Como ajudamos" description={product.approach} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="elevated">
        <Container>
          <SectionHeading title="Recursos principais" />
          <ul className={styles.list}>
            {product.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className={styles.grid}>
            <div>
              <SectionHeading title="Para quem é" />
              <ul className={styles.list}>
                {product.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading title="Status" />
              <p className={styles.status}>{product.availabilityLabel}</p>
              <p className={styles.note}>
                O status é definido em dados centralizados e pode ser atualizado sem alterar a
                estrutura das páginas.
              </p>
              {product.principles ? (
                <>
                  <SectionHeading title="Princípios" />
                  <ul className={styles.list}>
                    {product.principles.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title={`Quer saber mais sobre ${product.name}?`}
        primaryCta={{ label: "Entrar em contato", href: "/contato" }}
        secondaryCta={{ label: "Ver todos os produtos", href: "/produtos" }}
      />
    </>
  );
}
