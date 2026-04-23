import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Brain, MessageCircle, Sparkles, TrendingUp } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5 },
        0
      );

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
          0.2
        );
      }

      // Subheadline
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.8
      );

      // Image
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7 },
        0.3
      );

      // Floating card
      tl.fromTo(
        floatRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        1.0
      );

      // Continuous float animation
      gsap.to(floatRef.current, {
        y: -8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = "شخّص محصولك بالذكاء الاصطناعي".split(" ");

  return (
    <section
      ref={sectionRef}
      className="min-h-[90vh] pt-24 pb-16 flex items-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 70% 50%, rgba(232, 240, 227, 0.6) 0%, transparent 70%)",
      }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Column (RTL: right side) */}
          <div className="order-2 lg:order-1 text-center lg:text-right">
            {/* Badge */}
            <div ref={badgeRef} className="mb-4 opacity-0">
              <span className="inline-flex items-center gap-2 bg-lime/20 text-lime-dark text-sm font-medium px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                تشخيص ذكي + استشارات فورية
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-charcoal font-alexandria leading-tight mb-5"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="word inline-block ml-3 opacity-0">
                  {word}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              ref={subRef}
              className="text-lg text-medium-gray max-w-md mx-auto lg:mr-0 lg:ml-auto mb-8 leading-relaxed opacity-0"
            >
              ارفع صورة لنبتتك، واحصل على تشخيص دقيق وعلاج مقترح في ثواني —
              بدون ما تستنى مهندس
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0"
            >
              <Link to="/diagnosis" className="btn-primary text-lg px-8 py-4">
                <Brain className="w-5 h-5" />
                اسأل الذكاء الاصطناعي
              </Link>
              <Link
                to="/consultation/online"
                className="btn-outline text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5" />
                استشارة أونلاين
              </Link>
            </div>
          </div>

          {/* Image Column (RTL: left side) */}
          <div className="order-1 lg:order-2 relative" ref={imageRef}>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(74,124,89,0.2)]">
              <img
                src="/images/hero-farmer-hands.jpg"
                alt="مزارع يفحص محصول الطماطم - طبيب النباتات"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>

            {/* Floating Card */}
            <div
              ref={floatRef}
              className="absolute -bottom-4 -right-2 lg:-right-6 bg-white rounded-2xl shadow-[0_8px_32px_rgba(74,124,89,0.2)] px-5 py-4 flex items-center gap-3 opacity-0"
            >
              <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-olive-dark" />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">دقة عالية</p>
                <p className="text-sm text-lime-dark font-bold">↑ 95%</p>
              </div>
            </div>

            {/* Caption */}
            <p className="text-center text-xs text-medium-gray mt-6">
              تشخيص فوري لأكثر من 50 نوع محصول
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
