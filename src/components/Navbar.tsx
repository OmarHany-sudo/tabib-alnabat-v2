import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "الرئيسية", path: "/" },
  { label: "التشخيص الذكي", path: "/diagnosis" },
  { label: "المدونة", path: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    // Organization & Website Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "طبيب النباتات",
      "url": "https://tabib-alnabat.com",
      "logo": "https://tabib-alnabat.com/images/hero-farmer-hands.jpg",
      "description": "منصة ذكية لتشخيص أمراض النباتات وربط المزارعين بالخبراء الزراعيين",
      "sameAs": [
        "https://facebook.com/tabib-alnabat",
        "https://twitter.com/tabib-alnabat"
      ]
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "طبيب النباتات",
      "url": "https://tabib-alnabat.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://tabib-alnabat.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const addSchema = (id: string, data: object) => {
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
      }
    };

    addSchema('org-schema', orgSchema);
    addSchema('website-schema', websiteSchema);

    // Tracking Placeholder (Optional - for future use)
    // To add GA: document.head.appendChild(scriptWithGASrc);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-warm-white/92 backdrop-blur-xl border-b border-olive/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="w-6 h-6 text-olive group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xl text-olive font-alexandria">
              طبيب النباتات
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm font-alexandria transition-colors hover:text-olive ${
                  location.pathname === link.path
                    ? "text-olive"
                    : "text-charcoal"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 right-0 left-0 h-0.5 bg-olive rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/consultation/online"
              className="hidden sm:inline-flex items-center gap-2 bg-olive text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-olive-dark transition-colors shadow-[0_4px_16px_rgba(74,124,89,0.25)]"
            >
              <Phone className="w-4 h-4" />
              استشارة مجانية
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-sage transition-colors"
              aria-label="القائمة"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-charcoal" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-[72px] right-0 left-0 bg-warm-white border-t border-olive/10 shadow-xl p-6">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium font-alexandria py-3 px-4 rounded-xl transition-all ${
                    location.pathname === link.path
                      ? "bg-sage text-olive"
                      : "text-charcoal hover:bg-sage/50"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/consultation/online"
                className="sm:hidden flex items-center justify-center gap-2 bg-olive text-white rounded-xl px-5 py-3 text-base font-semibold mt-2"
              >
                <Phone className="w-5 h-5" />
                استشارة مجانية
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
