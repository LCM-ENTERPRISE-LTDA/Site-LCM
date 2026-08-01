import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.name}>{siteConfig.legalName}</p>
            <p className={styles.blurb}>
              Produtos digitais, automações e iniciativas de inteligência artificial com foco em
              usabilidade e performance.
            </p>
            <p className={styles.meta}>{siteConfig.regionLabel}</p>
          </div>

          <div>
            <p className={styles.heading}>Empresa</p>
            <ul className={styles.list}>
              <li>
                <Link href="/empresa">Sobre a LCM</Link>
              </li>
              <li>
                <Link href="/tecnologia">Tecnologia</Link>
              </li>
              <li>
                <Link href="/contato">Contato</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.heading}>Produtos</p>
            <ul className={styles.list}>
              {products.map((product) => (
                <li key={product.slug}>
                  <Link href={product.href}>{product.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.heading}>Legal</p>
            <ul className={styles.list}>
              <li>
                <span className={styles.muted}>Política de privacidade (em breve)</span>
              </li>
              <li>
                <span className={styles.muted}>Termos de uso (em breve)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
