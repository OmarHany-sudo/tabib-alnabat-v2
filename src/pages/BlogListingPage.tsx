import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import BlogCard from "@/components/BlogCard";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/data/blogArticles";
import SEO from "@/components/SEO";

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    let articles = BLOG_ARTICLES;

    if (activeCategory !== "الكل") {
      articles = articles.filter((a) => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }

    return articles;
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <SEO 
        title="المدونة الزراعية" 
        description="تصفح أحدث المقالات والنصائح الزراعية المتخصصة حول أمراض النباتات، طرق الري الحديثة، وحلول المحاصيل لزيادة الإنتاجية."
      />
      {/* Hero */}
      <section className="bg-olive py-16 mb-8">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-white font-alexandria mb-3">
            المدونة الزراعية
          </h1>
          <p className="text-warm-white/80 text-lg mb-8">
            مقالات، نصائح، وحلول لأهم مشاكل المحاصيل
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full bg-white rounded-xl pl-4 pr-12 py-3.5 text-base font-alexandria focus:ring-[3px] focus:ring-olive/30 focus:outline-none transition-all"
            />
          </div>
        </div>
      </section>

      <div className="container-custom">
        {/* Categories */}
        <ScrollReveal>
          <div className="flex gap-2 flex-wrap justify-center mb-10">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-olive text-white shadow-[0_4px_16px_rgba(74,124,89,0.25)]"
                    : "bg-sage/50 text-charcoal hover:bg-sage"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.08}>
                <BlogCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <img
              src="/images/empty-state-plant.jpg"
              alt="لا توجد نتائج"
              className="w-32 h-32 mx-auto mb-4 opacity-60"
            />
            <p className="text-medium-gray text-lg">
              لا توجد مقالات مطابقة للبحث
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
