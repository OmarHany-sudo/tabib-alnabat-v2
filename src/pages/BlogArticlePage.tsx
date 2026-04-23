import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import { useEffect } from "react";

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Get related articles (same category, excluding current)
  const related = BLOG_ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3);

  useEffect(() => {
    // FAQ Schema
    if (article.faqs && article.faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'faq-schema';
      script.text = JSON.stringify(faqSchema);
      document.head.appendChild(script);
      
      return () => {
        const existingScript = document.getElementById('faq-schema');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [article]);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO 
        title={article.title}
        description={article.excerpt}
        image={article.image}
        type="article"
      />
      {/* Header */}
      <section className="bg-sage/40 py-12 mb-8">
        <div className="container-custom max-w-3xl">
          <Breadcrumb
            items={[
              { label: "الرئيسية", path: "/" },
              { label: "المدونة", path: "/blog" },
              { label: article.category },
            ]}
          />

          <div className="mt-6">
            <span className="inline-block bg-olive/10 text-olive text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-charcoal font-alexandria leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-medium-gray">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-3xl">
        {/* Featured Image */}
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              decoding="async"
              className="w-full aspect-video object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Article Content */}
        {article.content && (
          <ScrollReveal>
            <div className="prose-custom mb-10">
              <p className="text-lg leading-relaxed text-charcoal/90 mb-6">
                {article.content.body}
              </p>

              {article.content.sections.map((section, i) => (
                <div key={i} className="mb-8">
                  <h2 className="text-xl font-semibold text-olive font-alexandria mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-base leading-relaxed text-charcoal/80">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-charcoal font-alexandria mb-6">
                <HelpCircle className="w-6 h-6 text-olive" />
                الأسئلة الشائعة
              </h2>

              <Accordion type="single" collapsible className="space-y-3">
                {article.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white border border-gray-200 rounded-2xl px-6 data-[state=open]:rounded-b-none overflow-hidden"
                  >
                    <AccordionTrigger className="text-base font-medium font-alexandria py-4 hover:no-underline text-right">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-medium-gray leading-relaxed pb-4 text-right">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>
        )}

        {/* Back to Blog */}
        <div className="mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-olive font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة للمدونة
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-sage/30 py-16">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-charcoal font-alexandria mb-8">
              مقالات ذات صلة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <ScrollReveal key={a.slug} delay={i * 0.1}>
                  <BlogCard article={a} compact />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
