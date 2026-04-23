import { useState, useCallback } from "react";
import type { DiagnosisResult } from "@/types";

const SYSTEM_PROMPT = `أنت خبير زراعي متخصص في تشخيص أمراض النباتات. قم بتحليل الصور المرفقة وتقديم تشخيص دقيق ومفصل.

قم بالرد بتنسيق JSON صارم فقط (بدون أي نص خارج JSON) بالهيكل التالي:
{
  "diagnosis": "اسم المرض أو المشكلة",
  "symptoms": ["عرض 1", "عرض 2", "عرض 3"],
  "causes": ["سبب 1", "سبب 2"],
  "treatment": ["خطوة علاج 1", "خطوة علاج 2", "خطوة علاج 3"],
  "prevention": ["نصيحة وقاية 1", "نصيحة وقاية 2"],
  "confidence": 85
}

confidence رقم بين 0 و 100 يمثل درجة الثقة في التشخيص.
اكتب باللغة العربية الفصحى.
لا تضع أي نص خارج كائن JSON.
`;

export function useDiagnosis() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const diagnose = useCallback(
    async (images: string[], crop: string, description?: string) => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const promptText = `${SYSTEM_PROMPT}\n\nنوع المحصول: ${crop}\n${
          description ? `وصف المشكلة: ${description}` : ""
        }`;

        const response = await fetch("/.netlify/functions/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            images,
            crop,
            description: promptText,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API error:", errorData);
          throw new Error("حدث خطأ أثناء التحليل، حاول مرة أخرى");
        }

        const data = await response.json();
        const candidate = data?.candidates?.[0];

        if (!candidate) {
          throw new Error("حدث خطأ أثناء التحليل، حاول مرة أخرى");
        }

        const text = candidate.content?.parts?.[0]?.text || "";

        if (!text) {
          throw new Error("حدث خطأ أثناء التحليل، حاول مرة أخرى");
        }

        // تنظيف الرد من markdown لو موجود
        const cleanText = text.replace(/```json|```/g, "");

        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("حدث خطأ أثناء التحليل، حاول مرة أخرى");
        }

        let parsed: DiagnosisResult;
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch {
          throw new Error("حدث خطأ أثناء التحليل، حاول مرة أخرى");
        }

        if (!parsed.diagnosis || !Array.isArray(parsed.symptoms)) {
          throw new Error("حدث خطأ أثناء التحليل، حاول مرة أخرى");
        }

        parsed.confidence = Number(parsed.confidence) || 70;

        setResult(parsed);
        return parsed;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "حدث خطأ أثناء التحليل، حاول مرة أخرى";

        setError(message);

        const fallback: DiagnosisResult = {
          diagnosis: "تعذر إتمام التشخيص",
          symptoms: [
            "يرجى التأكد من وضوح الصورة المرفقة",
            "حاول تصوير الورقة المصابة بإضاءة جيدة",
          ],
          causes: ["لم يتم التعرف على المشكلة من الصورة المرفقة"],
          treatment: [
            "جرب رفع صورة أوضح وأقرب للنبتة المصابة",
            "تواصل مع مهندس زراعي للحصول على تشخيص دقيق",
          ],
          prevention: ["راقب نباتاتك بانتظام", "حافظ على نظافة الحقل"],
          confidence: 0,
        };

        setResult(fallback);
        return fallback;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, diagnose, reset };
}