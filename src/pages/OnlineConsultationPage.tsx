import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import {
  MessageCircle,
  Zap,
  User,
  Calendar,
  Phone,
  Video,
  FileText,
  HeadphonesIcon,
  MapPin,
  Info,
} from "lucide-react";

const ONLINE_PLANS = [
  {
    title: "استشارة سريعة",
    subtitle: "بصورة أو فيديو",
    price: "299",
    currency: "جنيه",
    features: [
      { icon: Video, text: "استشارة سريعة بصورة أو فيديو" },
      { icon: Zap, text: "رد فوري من مهندس متخصص" },
      { icon: User, text: "تشخيص أولي للمشكلة" },
    ],
    popular: false,
  },
  {
    title: "استشارة + برنامج",
    subtitle: "تغذية أو مكافحة آفات",
    price: "799",
    currency: "جنيه",
    features: [
      { icon: Video, text: "استشارة سريعة بصورة أو فيديو" },
      { icon: FileText, text: "برنامج تغذية أو مكافحة آفات مخصص" },
      { icon: User, text: "خطة علاج مكتوبة ومفصلة" },
    ],
    popular: true,
  },
  {
    title: "استشارة + برنامج + متابعة",
    subtitle: "4 زيارات في الشهر",
    price: "2,999",
    currency: "جنيه / شهر",
    features: [
      { icon: Video, text: "استشارة سريعة بصورة أو فيديو" },
      { icon: FileText, text: "برنامج تغذية أو مكافحة آفات" },
      { icon: Calendar, text: "متابعة 4 مرات في الشهر" },
      { icon: Zap, text: "متابعة مستمرة لحالة المحصول" },
    ],
    popular: false,
  },
  {
    title: "استشارة شاملة + متابعة",
    subtitle: "8 زيارات + مكالمات هاتفية",
    price: "4,999",
    currency: "جنيه / شهر",
    features: [
      { icon: Video, text: "استشارة سريعة بصورة أو فيديو" },
      { icon: FileText, text: "برنامج تغذية أو مكافحة آفات" },
      { icon: Calendar, text: "متابعة 8 مرات في الشهر" },
      { icon: HeadphonesIcon, text: "مكالمات هاتفية دورية" },
    ],
    popular: false,
  },
];

export default function OnlineConsultationPage() {
  const baseMessage = `مرحبا، أريد استشارة أونلاين 🌿%0A%0A`;

  const buildWhatsAppLink = (planTitle: string) => {
    const message = `${baseMessage}نوع الاستشارة: ${planTitle}%0A%0Aأرغب في التواصل مع مهندس متخصص.`;
    return `https://wa.me/201031401349?text=${message}`;
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-sage/30">
      <SEO 
        title="استشارة أونلاين" 
        description="احصل على استشارات زراعية فورية وبرامج تغذية ومكافحة آفات مخصصة لمحصولك من خلال التواصل المباشر مع مهندسين زراعيين متخصصين."
      />
      <div className="container-custom max-w-5xl">
        {/* Breadcrumb */}
        <ScrollReveal>
          <Breadcrumb
            items={[
              { label: "الرئيسية", path: "/" },
              { label: "استشارة أونلاين" },
            ]}
          />
        </ScrollReveal>

        {/* Hero */}
        <div className="text-center mt-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-alexandria mb-3">
            💬 استشارة أونلاين
          </h1>
          <p className="text-medium-gray text-lg">
            اختار الباقة اللي تناسبك وتواصل مع مهندس زراعي متخصص عبر واتساب
          </p>
        </div>

        {/* Online Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {ONLINE_PLANS.map((plan, i) => (
            <ScrollReveal key={plan.title} delay={i * 0.1}>
              <div
                className={`relative bg-white rounded-3xl p-7 shadow-[0_4px_24px_rgba(74,124,89,0.08)] hover:shadow-[0_8px_32px_rgba(74,124,89,0.15)] hover:-translate-y-1 transition-all duration-300 ${
                  plan.popular
                    ? "ring-2 ring-lime shadow-[0_8px_32px_rgba(168,214,90,0.2)]"
                    : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-olive-dark text-xs font-bold px-4 py-1 rounded-full">
                    الأكثر طلباً
                  </span>
                )}

                {/* Plan Header */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-charcoal font-alexandria mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-medium-gray text-sm">{plan.subtitle}</p>
                </div>

                {/* Price */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-olive font-alexandria">
                    {plan.price}
                  </span>
                  <span className="text-medium-gray text-sm mr-1">
                    {plan.currency}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-center gap-3 text-sm text-charcoal/80"
                    >
                      <div className="w-8 h-8 bg-sage/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-olive" />
                      </div>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={buildWhatsAppLink(plan.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full py-4 text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل واتساب
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Offline Section */}
        <ScrollReveal>
          <div className="bg-olive rounded-3xl p-8 text-warm-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold font-alexandria mb-2">
                  🚗 استشارة + برنامج غذائي ميدانية
                </h2>
                <p className="text-warm-white/80 text-sm leading-relaxed max-w-xl">
                  زيارة ميدانية من مهندس زراعي متخصص لمعاينة الحالة على أرض
                  الواقع، مع إعداد برنامج غذائي أو مكافحة آفات مخصص لأرضك.
                </p>
                <div className="flex items-center gap-2 mt-4 text-lime text-sm font-medium">
                  <Info className="w-4 h-4" />
                  السعر يُحدد بعد معرفة مكان وحجم الأرض الزراعية
                </div>
              </div>

              <a
                href="https://wa.me/201031401349?text=مرحبا،%20أريد%20استشارة%20ميدانية%20🚗%0A%0Aأرغب%20في%20زيارة%20مهندس%20لمعاينة%20أرضي%20وعمل%20برنامج%20غذائي.%0A%0Aالموقع:%20[اكتب%20الموقع]%0Aحجم%20الأرض:%20[اكتب%20المساحة]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-olive font-semibold px-8 py-4 rounded-xl hover:bg-warm-white transition-colors shadow-lg flex-shrink-0"
              >
                <MapPin className="w-5 h-5" />
                اطلب معاينة
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Secondary Contact */}
        <div className="text-center mt-10">
          <a
            href="tel:01031401349"
            className="inline-flex items-center gap-2 text-sm text-olive hover:underline"
          >
            <Phone className="w-4 h-4" />
            أو اتصل مباشرة: 01031401349
          </a>
        </div>
      </div>
    </div>
  );
}
