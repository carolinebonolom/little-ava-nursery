import { ReactNode } from "react";
import PublicNav from "./PublicNav";
import PublicFooter from "./PublicFooter";
import AIChatWidget from "./AIChatWidget";
import WhatsAppButton from "./WhatsAppButton";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <WhatsAppButton />
      <AIChatWidget />
    </div>
  );
}
