import { ComingSoon } from "@/components/steps/ComingSoon";
import { StepLayout } from "@/components/steps/StepLayout";

export default function Paso3() {
  return (
    <StepLayout stepNum={3}>
      <ComingSoon title="Modelaje y formato · próximamente">
        Aquí trabajarás en dos columnas: a la izquierda la referencia
        transcrita, a la derecha el formato, objetivo y pilar, con el botón
        «Modelar con mi voz» que genera hooks, guion y CTA con tu BrandProfile.
      </ComingSoon>
    </StepLayout>
  );
}
