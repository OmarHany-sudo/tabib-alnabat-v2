import { Link } from "react-router-dom";
import {
  Bug,
  Search,
  AlertTriangle,
  Pill,
  Shield,
  Info,
  MessageCircle,
  Car,
} from "lucide-react";
import type { DiagnosisResult as ResultType } from "@/types";

interface Props {
  result: ResultType;
  crop?: string;
}

const SECTIONS = [
  {
    key: "diagnosis" as const,
    icon: Bug,
    label: "التشخيص",
    borderColor: "border-r-red-500",
    iconColor: "text-red-500",
  },
  {
    key: "symptoms" as const,
    icon: Search,
    label: "الأعراض",
    borderColor: "border-r-amber-500",
    iconColor: "text-amber-500",
  },
  {
    key: "causes" as const,
    icon: AlertTriangle,
    label: "الأسباب",
    borderColor: "border-r-gray-400",
    iconColor: "text-gray-400",
  },
  {
    key: "treatment" as const,
    icon: Pill,
    label: "العلاج",
    borderColor: "border-r-olive",
    iconColor: "text-olive",
  },
  {
    key: "prevention" as const,
    icon: Shield,
    label: "الوقاية",
    borderColor: "border-r-blue-500",
    iconColor: "text-blue-500",
  },
];

function getConfidenceColor(confidence: number) {
  if (confidence >= 80) return "bg-lime/20 text-lime-dark";
  if (confidence >= 50) return "bg-warning-amber/15 text-warning-amber";
  return "bg-error-red/15 text-error-red";
}

export default function DiagnosisResultCard({ result, crop }: Props) {
  const whatsappMessage = crop
    ? `مرحبا، أريد استشارة أونلاين 🌿%0A%0Aنوع المحصول: ${crop}%0Aالمشكلة: ${result.diagnosis}%0A%0Aتم تحليل الصورة عبر الموقع وأرغب في استشارة مهندس للتأكد.`
    : `مرحبا، أريد استشارة أونلاين 🌿%0A%0Aالمشكلة: ${result.diagnosis}%0A%0Aتم تحليل الصورة عبر الموقع وأرغب في استشارة مهندس للتأكد.`;

  const whatsappLink = `https://wa.me/201031401349?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(74,124,89,0.12)] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-charcoal font-alexandria">
          {result.diagnosis}
        </h2>
        <span
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${getConfidenceColor(
            result.confidence
          )}`}
        >
          ثقة {result.confidence}%
        </span>
      </div>

      {/* Sections */}
      <div className="p-6 space-y-6">
        {SECTIONS.map(({ key, icon: Icon, label, borderColor, iconColor }) => {
          const data = result[key];
          if (!data || (Array.isArray(data) && data.length === 0)) return null;

          return (
            <div key={key} className={`border-r-3 ${borderColor} pr-4`}>
              <h3
                className={`flex items-center gap-2 font-semibold text-base mb-3 ${iconColor}`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </h3>
              {Array.isArray(data) ? (
                <ul className="space-y-2">
                  {data.map((item, i) => (
                    <li
                      key={i}
                      className="text-charcoal/80 text-sm leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-charcoal/80 text-sm leading-relaxed">
                  {data}
                </p>
              )}
            </div>
          );
        })}

        {/* Disclaimer */}
        <div className="bg-sage/40 border-r-4 border-olive rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
          <p className="text-medium-gray text-sm italic leading-relaxed">
            هذه النتيجة مبدئية وقد تحتوي على أخطاء، حيث أن الذكاء الاصطناعي
            ليس بديلاً عن المهندس الزراعي. يُنصح بالتواصل مع مهندس متخصص
            للحصول على تشخيص دقيق.
          </p>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-6 bg-sage/20 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex-1"
        >
          <MessageCircle className="w-5 h-5" />
          استشارة أونلاين
        </a>
        <Link to="/consultation/onsite" className="btn-primary flex-1">
          <Car className="w-5 h-5" />
          استشارة في موقعك
        </Link>
      </div>
    </div>
  );
}
