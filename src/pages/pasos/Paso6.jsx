import { ComingSoon } from "@/components/steps/ComingSoon";
import { StepLayout } from "@/components/steps/StepLayout";

export default function Paso6() {
  return (
    <StepLayout stepNum={6}>
      <ComingSoon title="Creación de vídeos · próximamente">
        Aquí tendrás pestañas por formato (B-roll genérico, B-roll propio, clon
        y avatar UGC/Pixar) con su paso a paso, botones externos y la IA de
        apoyo para generar prompts de escenas y personajes.
      </ComingSoon>
    </StepLayout>
  );
}
