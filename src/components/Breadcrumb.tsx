import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-medium-gray">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronLeft className="w-4 h-4" />}
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-olive transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
