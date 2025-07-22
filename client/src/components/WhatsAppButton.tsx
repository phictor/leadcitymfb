import { MessageCircle } from "lucide-react";
import { BANK_INFO } from "@/lib/constants";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${BANK_INFO.whatsapp.replace(/\D/g, '')}?text=Hello, I would like to inquire about your banking services.`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
