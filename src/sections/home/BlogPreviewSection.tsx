import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import BlogCard from "@/components/BlogCard";
import { BLOG_ARTICLES } from "@/data/blogArticles";

export default function BlogPreviewSection() {
  const articles = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-custom">
        {/* Header */}
        <ScrollReveal className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal font-alexandria">
            آخر المقالات
          </h2>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-olive font-medium hover:underline"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 0.1}>
              <BlogCard article={article} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-olive font-medium hover:underline"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
