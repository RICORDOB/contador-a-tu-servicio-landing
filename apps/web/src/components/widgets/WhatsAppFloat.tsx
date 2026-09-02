import { SITE } from "@contador/shared";

function getWhatsAppLink(): string {
  const raw =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE.contact.whatsapp || "+573000000000";
  const digits = raw.replace(/\D/g, "");
  const normalized = digits.startsWith("57") ? digits : `57${digits}`;
  const text = encodeURIComponent(
    "Hola, vengo de su página web y quisiera más información sobre sus servicios contables."
  );
  return `https://wa.me/${normalized}?text=${text}`;
}

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105"
      style={{ height: "52px", width: "52px" }}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff" aria-hidden="true">
        <path d="M12.04 2C6.6 2 2.18 6.4 2.18 11.85c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.9 9.9 0 0 0 4.7 1.2h.01c5.44 0 9.86-4.4 9.86-9.85A9.8 9.8 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.17.83.85-3.09-.2-.31a8.15 8.15 0 0 1-1.26-4.36c0-4.53 3.7-8.2 8.27-8.2 2.2 0 4.28.86 5.84 2.42a8.14 8.14 0 0 1 2.42 5.84c0 4.52-3.7 8.19-8.26 8.2Zm4.49-6.13c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06a6.66 6.66 0 0 1-1.96-1.21 7.36 7.36 0 0 1-1.36-1.69c-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.73 2.73 0 0 0-.85 2.04c0 1.2.88 2.36 1 2.53.12.16 1.73 2.63 4.19 3.69.59.25 1.04.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
      <span className="animate-pulse-slow absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald" />
      </span>
    </a>
  );
}