import { ComingSoon } from "@/components/steps/ComingSoon";
import { StepLayout } from "@/components/steps/StepLayout";

export default function Paso1() {
  return (
    <StepLayout stepNum={1}>
      <ComingSoon title="Análisis y Hacking · próximamente">
        Aquí tendrás dos pestañas: «Analiza tu contenido» (con el prompt de
        análisis para Claude + Windsor.ai y el botón «Añadir al plan») y
        «Hacking» (gestor de palabras clave y tabla de referencias virales con
        el criterio viral calculado automáticamente).
      </ComingSoon>
    </StepLayout>
  );
}
