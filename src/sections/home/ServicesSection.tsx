import ScrollReveal from "@/components/ScrollReveal";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";

export default function ServicesSection() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-custom">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block bg-lime/20 text-lime-dark text-sm font-medium px-4 py-2 rounded-full mb-4">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal font-alexandria mb-3">
            اختر اللي يناسبك
          </h2>
          <p className="text-medium-gray text-lg">
            تشخيص ذكي، استشارة فورية، أو زيارة ميدانية — إحنا معاك
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.15}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
