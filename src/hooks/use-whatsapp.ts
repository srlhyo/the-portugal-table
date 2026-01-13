import { useMemo } from "react";
import { useIsMobile } from "./use-mobile";

// WhatsApp configuration - centralized constants
export const WHATSAPP_NUMBER = "351912345678"; // Digits only, with country code
export const WHATSAPP_MESSAGE = "Olá gostaria de um orçamento";
export const PHONE_DISPLAY = "+351 912 345 678";
export const PHONE_TEL = "tel:+351912345678";

// URL-encoded message
const ENCODED_MESSAGE = encodeURIComponent(WHATSAPP_MESSAGE);

// Smart WhatsApp URL based on device
// Mobile: wa.me (opens WhatsApp app)
// Desktop/Tablet: web.whatsapp.com (opens WhatsApp Web)
export const getWhatsAppUrl = (isMobile: boolean): string => {
  if (isMobile) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${ENCODED_MESSAGE}`;
  }
  return `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${ENCODED_MESSAGE}`;
};

// Hook to get the appropriate WhatsApp URL
export const useWhatsAppUrl = (): string => {
  const isMobile = useIsMobile();
  
  return useMemo(() => getWhatsAppUrl(isMobile), [isMobile]);
};

// Link props for WhatsApp anchors
export const whatsappLinkProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
  referrerPolicy: "no-referrer" as const,
};
