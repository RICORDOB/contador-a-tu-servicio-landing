"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { SectionProvider } from "./SectionProvider";
import ChatbotWidget from "@/components/widgets/ChatbotWidget";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/portal") || pathname.startsWith("/admin");

  if (isApp) {
    return <>{children}</>;
  }

  return (
    <SectionProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotWidget />
      <WhatsAppFloat />
    </SectionProvider>
  );
}