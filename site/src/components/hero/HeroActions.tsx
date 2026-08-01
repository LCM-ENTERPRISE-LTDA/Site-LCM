import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./HeroActions.module.css";

type Cta = { label: string; href: string };

type HeroActionsProps = {
  primary: Cta;
  secondary: Cta;
};

export function HeroActions({ primary, secondary }: HeroActionsProps) {
  return (
    <div className={styles.actions}>
      <LinkButton href={primary.href} className={styles.primary}>
        {primary.label}
        <Icon name="arrow-right" size={16} />
      </LinkButton>
      <LinkButton href={secondary.href} variant="secondary">
        {secondary.label}
      </LinkButton>
    </div>
  );
}
