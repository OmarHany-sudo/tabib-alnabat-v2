import { Link } from "react-router-dom";
import { Brain, MessageCircle, Car, Check } from "lucide-react";
import type { ServiceData } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  MessageCircle,
  Car,
};

const VARIANT_STYLES = {
  primary: {
    iconBg: "bg-olive",
    iconColor: "text-white",
    btnClass: "btn-primary w-full",
  },
  whatsapp: {
    iconBg: "bg-sage",
    iconColor: "text-olive",
    btnClass: "btn-whatsapp w-full",
  },
  outline: {
    iconBg: "bg-lime",
    iconColor: "text-olive-dark",
    btnClass: "btn-outline w-full",
  },
};

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon] || Brain;
  const styles = VARIANT_STYLES[service.variant];

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_4px_24px_rgba(74,124,89,0.08)] hover:shadow-[0_8px_32px_rgba(74,124,89,0.15)] hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Icon overlay */}
        <div
          className={`absolute -bottom-6 right-1/2 translate-x-1/2 w-14 h-14 ${styles.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-300`}
        >
          <Icon className={`w-7 h-7 ${styles.iconColor}`} />
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-6 px-6">
        <h3 className="font-semibold text-xl text-charcoal font-alexandria mb-2 text-center">
          {service.title}
        </h3>
        <p className="text-medium-gray text-sm leading-relaxed mb-4 text-center">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-medium-gray"
            >
              <Check className="w-4 h-4 text-lime flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to={service.ctaLink} className={styles.btnClass}>
          {service.cta}
        </Link>
      </div>
    </div>
  );
}
