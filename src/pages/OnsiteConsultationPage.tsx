import { useState, useCallback } from "react";
import { AlertCircle, Check, Car, Loader2, Info } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import { CROPS } from "@/data/crops";

const EGYPTIAN_PHONE_REGEX = /^01[0-2,5]{1}[0-9]{8}$/;

export default function OnsiteConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    crop: "",
    location: "",
    problem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "الاسم مطلوب";
    if (!formData.phone.trim()) errs.phone = "رقم الهاتف مطلوب";
    else if (!EGYPTIAN_PHONE_REGEX.test(formData.phone))
      errs.phone = "رقم هاتف مصري غير صالح";
    if (!formData.crop) errs.crop = "نوع المحصول مطلوب";
    if (!formData.location.trim()) errs.location = "الموقع مطلوب";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setSubmitting(true);

      // Build WhatsApp message
      const message = `مرحبا، أريد استشارة في موقعي 🚗%0A%0Aالاسم: ${formData.name}%0Aرقم الهاتف: ${formData.phone}%0Aنوع المحصول: ${formData.crop}%0Aالموقع: ${formData.location}%0Aوصف المشكلة: ${formData.problem || "غير محدد"}%0A%0Aأرغب في إرسال مهندس لمعاينة الحالة على أرض الواقع.`;

      const whatsappLink = `https://wa.me/201031401349?text=${message}`;

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);
      setSubmitting(false);

      // Redirect to WhatsApp after delay
      setTimeout(() => {
        window.open(whatsappLink, "_blank");
      }, 2000);
    },
    [formData, validate]
  );

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-sage/30 flex items-center justify-center">
        <div className="container-custom max-w-md">
          <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(74,124,89,0.12)] p-10 text-center">
            <div className="w-20 h-20 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-olive" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal font-alexandria mb-3">
              تم إرسال طلبك!
            </h2>
            <p className="text-medium-gray">
              هيتم تحويلك لواتساب في ثواني...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-sage/30">
      <SEO 
        title="استشارة في موقعك" 
        description="اطلب زيارة ميدانية من مهندس زراعي متخصص لمعاينة محصولك على أرض الواقع وتقديم الحلول والبرامج الزراعية المناسبة لأرضك."
      />
      <div className="container-custom max-w-xl">
        {/* Breadcrumb */}
        <ScrollReveal>
          <Breadcrumb
            items={[
              { label: "الرئيسية", path: "/" },
              { label: "استشارة في موقعك" },
            ]}
          />
        </ScrollReveal>

        {/* Hero */}
        <div className="text-center mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-alexandria mb-3">
            🚗 استشارة في موقعك
          </h1>
          <p className="text-medium-gray text-lg">
            اطلب زيارة ميدانية من مهندس زراعي للمعاينة على أرض الواقع
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-medium-gray bg-white rounded-xl px-4 py-3 shadow-sm">
            <Info className="w-4 h-4 text-olive flex-shrink-0" />
            <span>استشارة + برنامج غذائي — السعر يُحدد بعد معرفة مكان وحجم الأرض الزراعية</span>
          </div>
        </div>

        {/* Form */}
        <ScrollReveal>
          <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(74,124,89,0.12)] p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  الاسم <span className="text-error-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="اكتب اسمك الكامل"
                  className={`input-field ${errors.name ? "border-error-red" : ""}`}
                />
                {errors.name && (
                  <p className="text-error-red text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  رقم الهاتف <span className="text-error-red">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className={`input-field ltr text-left ${
                    errors.phone ? "border-error-red" : ""
                  }`}
                  dir="ltr"
                />
                {errors.phone && (
                  <p className="text-error-red text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Crop */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  نوع المحصول <span className="text-error-red">*</span>
                </label>
                <select
                  value={formData.crop}
                  onChange={(e) => updateField("crop", e.target.value)}
                  className={`input-field appearance-none cursor-pointer ${
                    errors.crop ? "border-error-red" : ""
                  }`}
                >
                  <option value="">اختر نوع المحصول</option>
                  {CROPS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.crop && (
                  <p className="text-error-red text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.crop}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  الموقع <span className="text-error-red">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="المحافظة / المركز / القرية"
                  className={`input-field ${
                    errors.location ? "border-error-red" : ""
                  }`}
                />
                {errors.location && (
                  <p className="text-error-red text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Problem */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  وصف المشكلة
                </label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => updateField("problem", e.target.value)}
                  placeholder="اشرح المشكلة اللي عايز المهندس يشوفها..."
                  rows={4}
                  className="input-field resize-y min-h-[120px]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-lg py-4 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    بيتم الإرسال...
                  </>
                ) : (
                  <>
                    <Car className="w-5 h-5" />
                    🚗 أرسل الطلب
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
