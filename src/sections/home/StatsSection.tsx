import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 10000, suffix: "+", label: "تشخيص تم إجراؤه" },
  { value: 50, suffix: "+", label: "نوع محصول مدعوم" },
  { value: 98, suffix: "%", label: "نسبة الرضا" },
  { value: 24, suffix: "/7", label: "متاح طول اليوم" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];

        gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: stat.value,
            duration: 1.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onUpdate: function () {
              const current = Math.round(Number(el.innerText));
              el.innerText = current.toLocaleString("ar-EG") + stat.suffix;
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-olive">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <span
                ref={(el) => { numbersRef.current[i] = el; }}
                className="block text-3xl md:text-4xl font-bold text-lime font-alexandria mb-2"
              >
                0{stat.suffix}
              </span>
              <span className="text-sm text-warm-white/80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
