// NÚMERO REAL DA AGATHA EVENTOS
export const WHATSAPP_NUMBER = "5511978447785";
export const INSTAGRAM_HANDLE = "@agathaeventos2024";
export const INSTAGRAM_URL = "https://www.instagram.com/agathaeventos2024/";
export const BASE_LOCATION = "Jardim Anália Franco — São Paulo/SP";

export interface QuoteFormData {
  name: string;
  whatsapp: string;
  eventType: string;
  eventDate: string;
  city: string;
  guestCount: string;
  services: string[];
  message?: string;
}

export function buildWhatsAppUrl(data?: Partial<QuoteFormData>): string {
  if (!data || Object.keys(data).length === 0) {
    const defaultMsg = encodeURIComponent(
      "Olá! Conheci a Agatha Eventos pelo site e gostaria de solicitar um orçamento para meu evento."
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`;
  }

  const servicesList = data.services && data.services.length > 0
    ? data.services.join(", ")
    : "Não especificado";

  const messageText = `Olá! Conheci a Agatha Eventos pelo site e gostaria de solicitar um orçamento.

*Dados do Solicitante:*
• *Nome:* ${data.name || "Não informado"}
• *WhatsApp:* ${data.whatsapp || "Não informado"}
• *Tipo de Evento:* ${data.eventType || "Não especificado"}
• *Data do Evento:* ${data.eventDate || "A definir"}
• *Cidade/Local:* ${data.city || "São Paulo e região"}
• *Aprox. Convidados:* ${data.guestCount || "Não informado"}
• *Serviços de Interesse:* ${servicesList}
${data.message ? `\n*Mensagem Adicional:*\n${data.message}` : ""}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
}
