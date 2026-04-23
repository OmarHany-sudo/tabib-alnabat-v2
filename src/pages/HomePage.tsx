import HeroSection from "@/sections/home/HeroSection";
import HowItWorksSection from "@/sections/home/HowItWorksSection";
import ServicesSection from "@/sections/home/ServicesSection";
import StatsSection from "@/sections/home/StatsSection";
import BlogPreviewSection from "@/sections/home/BlogPreviewSection";
import SEO from "@/components/SEO";

export default function HomePage() {
  return (
    <>
      <SEO 
        title="الرئيسية" 
        description="طبيب النباتات هو دليلك الشامل لتشخيص أمراض المحاصيل الزراعية باستخدام الذكاء الاصطناعي، وتقديم الاستشارات الزراعية المتخصصة."
      />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <StatsSection />
      <BlogPreviewSection />
    </>
  );
}
