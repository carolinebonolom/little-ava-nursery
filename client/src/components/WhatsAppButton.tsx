import { MessageCircle } from "lucide-react";
import { NURSERY_INFO } from "@shared/nurseryInfo";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${NURSERY_INFO.whatsapp.replace("+", "")}?text=Hi%20Little%20Ava%20Nursery%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium hidden sm:inline group-hover:inline">Chat with us</span>
    </a>
  );
}
