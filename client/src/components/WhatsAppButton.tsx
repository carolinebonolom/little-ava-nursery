import { MessageCircle } from "lucide-react";
import { NURSERY_INFO } from "@shared/nurseryInfo";

export default function WhatsAppButton() {
  const phone = NURSERY_INFO.whatsapp.replace(/\D/g, "");
  const href = `https://wa.me/${phone}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-white shadow-lg transition hover:bg-emerald-600"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium">Chat on WhatsApp</span>
    </a>
  );
}