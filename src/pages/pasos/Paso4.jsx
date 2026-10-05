import { ComingSoon } from "@/components/steps/ComingSoon";
import { StepLayout } from "@/components/steps/StepLayout";

export default function Paso4() {
  return (
    <StepLayout stepNum={4}>
      <ComingSoon title="Calendarios del mes · próximamente">
        Aquí tendrás el Excel de contenido editable en línea y el calendario
        visual del mes con arrastrar y soltar, además del botón «Distribúyelo
        por mí» y la exportación a Excel/CSV.
      </ComingSoon>
    </StepLayout>
  );
}
