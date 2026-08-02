import { CompanyExperience } from "@/components/company/CompanyExperience";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Empresa",
  description:
    "A LCM nasceu em Goiás para transformar problemas reais em produtos digitais duráveis — com clareza, desempenho e construção responsável.",
  path: "/empresa",
});

export default function EmpresaPage() {
  return <CompanyExperience />;
}
