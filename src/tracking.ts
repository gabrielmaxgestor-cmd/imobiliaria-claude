/**
 * Função utilitária para rastrear eventos no Google Analytics (gtag) e Meta Pixel (fbq).
 * 
 * @param nomeEvento Nome do evento a ser registrado.
 * @param dados Objeto opcional com parâmetros/propriedades adicionais do evento.
 */
export function rastrearEvento(nomeEvento: string, dados?: Record<string, any>) {
  try {
    // 1. Enviar evento para o Google Analytics (gtag)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", nomeEvento, dados);
    }
  } catch (error) {
    console.error("Erro ao enviar evento para o Google Analytics:", error);
  }

  try {
    // 2. Enviar evento para o Meta Pixel (fbq)
    if (typeof window !== "undefined" && (window as any).fbq) {
      if (dados) {
        (window as any).fbq("trackCustom", nomeEvento, dados);
      } else {
        (window as any).fbq("track", nomeEvento);
      }
    }
  } catch (error) {
    console.error("Erro ao enviar evento para o Meta Pixel:", error);
  }
}
