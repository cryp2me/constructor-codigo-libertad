import { ComingSoon } from "@/components/steps/ComingSoon";
import { StepLayout } from "@/components/steps/StepLayout";

export default function Paso8() {
  return (
    <StepLayout stepNum={8}>
      <ComingSoon title="Automatización · próximamente">
        Aquí tendrás la tabla de piezas con CTA, el botón «Generar respuestas»
        (respuesta pública, DM y seguimiento) y las plantillas de flujos
        ManyChat precargadas.
      </ComingSoon>
    </StepLayout>
  );
}
