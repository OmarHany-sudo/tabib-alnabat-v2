import { useState, useCallback, useRef, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import FileUpload from "@/components/FileUpload";
import DiagnosisResultCard from "@/components/DiagnosisResult";
import UsageIndicator from "@/components/UsageIndicator";
import { CROPS } from "@/data/crops";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function DiagnosisPage() {
  const { remaining, total, hasReachedLimit, incrementUsage } = useUsageLimit();
  const { result, loading, diagnose, reset } = useDiagnosis();
  const resultRef = useRef<HTMLDivElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [crop, setCrop] = useState("");
  const [description, setDescription] = useState("");
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset on mount
  useEffect(() => {
    reset();
  }, [reset]);

  // Scroll to result
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [result]);

  const validate = useCallback(() => {
    const errors: Record<string, string> = {};
    if (files.length === 0) errors.files = "يرجى رفع لغاية 3 صور";
    if (!crop) errors.crop = "يرجى اختيار نوع المحصول";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [files, crop]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (hasReachedLimit) {
        setShowLimitModal(true);
        return;
      }

      if (!validate()) return;

      const base64Images = await Promise.all(files.map(fileToBase64));
      await diagnose(base64Images, crop, description || undefined);
      incrementUsage();
    },
    [hasReachedLimit, validate, files, crop, description, diagnose, incrementUsage]
  );

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO 
        title="التشخيص الذكي" 
        description="استخدم تقنية الذكاء الاصطناعي لتشخيص أمراض النباتات والمحاصيل الزراعية فوراً من خلال رفع صور الأجزاء المصابة."
      />
      <div className="container-custom max-w-3xl">
        {/* Breadcrumb */}
        <ScrollReveal>
          <Breadcrumb
            items={[
              { label: "الرئيسية", path: "/" },
              { label: "التشخيص الذكي" },
            ]}
          />
        </ScrollReveal>

        {/* Hero */}
        <div className="text-center mt-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-alexandria mb-3">
            التشخيص الذكي
          </h1>
          <p className="text-medium-gray text-lg mb-4">
            ارفع صورة واضحة للنبتة المصابة وخلّي الذكاء الاصطناعي يساعدك
          </p>
          <UsageIndicator remaining={remaining} total={total} />
        </div>

        {/* Upload Form */}
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload */}
            <div>
              <FileUpload
                files={files}
                onFilesChange={setFiles}
                maxFiles={3}
              />
              {formErrors.files && (
                <p className="text-error-red text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {formErrors.files}
                </p>
              )}
            </div>

            {/* Crop Select */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                نوع المحصول <span className="text-error-red">*</span>
              </label>
              <select
                value={crop}
                onChange={(e) => {
                  setCrop(e.target.value);
                  setFormErrors((prev) => ({ ...prev, crop: "" }));
                }}
                className={`input-field appearance-none cursor-pointer ${
                  formErrors.crop ? "border-error-red" : ""
                }`}
              >
                <option value="">اختر نوع المحصول</option>
                {CROPS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {formErrors.crop && (
                <p className="text-error-red text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {formErrors.crop}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                وصف المشكلة (اختياري)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اشرح اللي شايفه — اصفرار، بقع، ذبول، حشرات..."
                rows={4}
                className="input-field resize-y min-h-[120px]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg py-4 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  بنحلل...
                </>
              ) : (
                <>
                  🔍 احلل الآن
                </>
              )}
            </button>
          </form>
        </ScrollReveal>

        {/* Result */}
        {result && (
          <div ref={resultRef} className="mt-10">
            <DiagnosisResultCard result={result} crop={crop} />
          </div>
        )}
      </div>

      {/* Limit Reached Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-warning-amber/15 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-warning-amber" />
            </div>
            <h3 className="text-xl font-bold text-charcoal font-alexandria mb-3">
              وصلت للحد اليومي
            </h3>
            <p className="text-medium-gray mb-6 leading-relaxed">
              يومياً بس تشخيصين مجاناً. جرب تاني بكرة، أو تواصل مع مهندس
              مباشرة.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/201031401349"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                تواصل واتساب
              </a>
              <button
                onClick={() => setShowLimitModal(false)}
                className="text-medium-gray hover:text-charcoal transition-colors py-2"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
