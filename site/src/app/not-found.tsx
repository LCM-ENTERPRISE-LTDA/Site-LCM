import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <Container>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.text}>
          O endereço solicitado não existe neste site. Volte à página inicial ou explore os produtos
          da LCM.
        </p>
        <div className={styles.actions}>
          <LinkButton href="/">Ir para a Home</LinkButton>
          <Link href="/produtos" className={styles.link}>
            Ver produtos
          </Link>
        </div>
      </Container>
    </div>
  );
}
