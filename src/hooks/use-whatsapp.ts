import { useMemo } from "react";

// WhatsApp configuration - centralized constants
export const WHATSAPP_NUMBER = "351927177190"; // Digits only, with country code
export const WHATSAPP_MESSAGE = "Olá, gostaria de um orçamento para um evento.";
export const PHONE_DISPLAY = "+351 927 177 190";
export const PHONE_TEL = "tel:+351927177190";
export const EMAIL = "hello@doluxoamesa.pt";
export const INSTAGRAM = "@doluxoamesa";
export const INSTAGRAM_URL = "https://instagram.com/doluxoamesa";

// URL-encoded message
const ENCODED_MESSAGE = encodeURIComponent(WHATSAPP_MESSAGE);

/**
 * Official WhatsApp website deep-link.
 * NOTE: We intentionally do NOT use web.whatsapp.com because it can be blocked (COOP/ERR_BLOCKED_BY_RESPONSE).
 */
export const getWhatsAppUrl = (): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${ENCODED_MESSAGE}`;
};

export const WHATSAPP_URL = getWhatsAppUrl();

// Hook to get the WhatsApp URL (kept as a hook for convenience/consistency)
export const useWhatsAppUrl = (): string => {
  return useMemo(() => WHATSAPP_URL, []);
};

// Link props for WhatsApp anchors
export const whatsappLinkProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
  referrerPolicy: "no-referrer" as const,
};

