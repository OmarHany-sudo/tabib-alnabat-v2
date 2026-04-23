import type { ServiceData } from "@/types";

export const SERVICES: ServiceData[] = [
  {
    id: "ai-diagnosis",
    icon: "Brain",
    title: "اسأل الذكاء الاصطناعي",
    description:
      "ارفع صورة لنبتتك واحصل على تشخيص فوري باستخدام أحدث تقنيات الذكاء الاصطناعي",
    features: ["لغاية 3 صور", "تشخيص + علاج + وقاية", "مجاني (2 يومياً)"],
    cta: "ابدأ التشخيص",
    ctaLink: "/diagnosis",
    image: "/images/service-ai-diagnosis.jpg",
    variant: "primary",
  },
  {
    id: "online-consultation",
    icon: "MessageCircle",
    title: "استشارة أونلاين",
    description:
      "تواصل مع مهندس زراعي متخصص عبر واتساب واحصل على استشارة مفصلة",
    features: ["رد فوري", "مهندس متخصص", "من 299 جنيه"],
    cta: "تواصل واتساب",
    ctaLink: "/consultation/online",
    image: "/images/service-online-consultation.jpg",
    variant: "whatsapp",
  },
  {
    id: "onsite-consultation",
    icon: "Car",
    title: "استشارة في موقعك",
    description:
      "اطلب زيارة ميدانية من مهندس زراعي للمعاينة على أرض الواقع",
    features: ["زيارة ميدانية", "تقرير مفصل", "سعر حسب الحالة"],
    cta: "اطلب زيارة",
    ctaLink: "/consultation/onsite",
    image: "/images/service-onsite-consultation.jpg",
    variant: "outline",
  },
];
