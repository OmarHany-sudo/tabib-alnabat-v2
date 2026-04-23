import { Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import type { BlogArticle } from "@/types";

interface BlogCardProps {
  article: BlogArticle;
  compact?: boolean;
}

export default function BlogCard({ article, compact = false }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_4px_24px_rgba(74,124,89,0.08)] hover:shadow-[0_8px_32px_rgba(74,124,89,0.15)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className={`p-5 ${compact ? "p-4" : "p-5"}`}>
        <span className="inline-block bg-olive/10 text-olive text-xs font-medium px-3 py-1 rounded-full mb-3">
          {article.category}
        </span>

        <h3
          className={`font-semibold text-charcoal font-alexandria mb-2 group-hover:text-olive transition-colors line-clamp-2 ${
            compact ? "text-base" : "text-lg"
          }`}
        >
          {article.title}
        </h3>

        {!compact && (
          <p className="text-medium-gray text-sm leading-relaxed mb-4 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-light-gray">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          <span className="flex items-center gap-1 text-sm text-olive font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            اقرأ المزيد
            <ArrowLeft className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
