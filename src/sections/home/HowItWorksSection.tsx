import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Upload, Sprout, Stethoscope } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "1",
    icon: Upload,
    title: "ارفع الصور",
    desc: "اختار لغاية 3 صور واضحة للنبتة المصابة",
  },
  {
    num: "2",
    icon: Sprout,
    title: "حدد المحصول",
    desc: "اكتب نوع المحصول ووصف المشكلة لو عايز",
  },
  {
    num: "3",
    icon: Stethoscope,
    title: "احصل على التشخيص",
    desc: "الذكاء الاصطناعي يحللك المشكلة ويقترح العلاج",
  },
];

export default function HowItWorksSection() {
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const anims: gsap.core.Tween[] = [];
    circlesRef.current.forEach((circle) => {
      if (circle) {
        const anim = gsap.to(circle, {
          scale: 1.05,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        anims.push(anim);
      }
    });
    return () => anims.forEach((a) => a.kill());
  }, []);

  return (
    <section className="section-padding bg-sage/50">
      <div className="container-custom">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block border border-olive text-olive text-sm font-medium px-4 py-2 rounded-full mb-4">
            كيف يعمل
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal font-alexandria mb-3">
            ثلاث خطوات بسيطة
          </h2>
          <p className="text-medium-gray text-lg">
            من صورة لمحصولك لحل واضح في دقايق
          </p>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-[0_4px_24px_rgba(74,124,89,0.08)] hover:shadow-[0_8px_32px_rgba(74,124,89,0.15)] transition-shadow">
                {/* Number Circle */}
                <div
                  ref={(el) => { circlesRef.current[i] = el; }}
                  className="w-12 h-12 bg-lime rounded-full flex items-center justify-center mx-auto mb-5"
                >
                  <span className="text-olive-dark font-bold text-lg font-alexandria">
                    {step.num}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-olive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-olive" />
                </div>

                <h3 className="font-semibold text-xl text-charcoal font-alexandria mb-2">
                  {step.title}
                </h3>
                <p className="text-medium-gray text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* Connecting Lines (desktop only) */}
          <div className="hidden md:block absolute top-1/2 right-[33%] left-[33%] -translate-y-1/2 h-0.5 border-t-2 border-dashed border-olive/30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
