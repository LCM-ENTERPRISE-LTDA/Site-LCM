import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactContent } from "@/content/institutional";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = buildMetadata({
  title: "Contato",
  description: "Entre em contato com a LCM Enterprise sobre produtos, parcerias ou dúvidas.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={contactContent.hero.title}
        subtitle={contactContent.hero.subtitle}
      />
      <Section>
        <Container>
          <div className={styles.layout}>
            <ContactForm />
            <aside className={styles.aside}>
              <h2>Informações</h2>
              <p>{siteConfig.legalName}</p>
              <p>{siteConfig.regionLabel}</p>
              <p className={styles.note}>
                Telefone, e-mail institucional e endereço físico serão publicados aqui quando
                estiverem oficiais. Redes sociais só aparecem com links oficiais.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
