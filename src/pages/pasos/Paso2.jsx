import { ComingSoon } from "@/components/steps/ComingSoon";
import { StepLayout } from "@/components/steps/StepLayout";

export default function Paso2() {
  return (
    <StepLayout stepNum={2}>
      <ComingSoon title="Transcripción · próximamente">
        Aquí verás la lista de referencias pendientes. Al abrirla podrás pegar
        la transcripción del vídeo o subir las capturas de un carrusel para que
        la IA extraiga el texto de cada diapositiva.
      </ComingSoon>
    </StepLayout>
  );
}
