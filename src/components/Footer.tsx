import { Link } from "react-router-dom";
import { Leaf, Phone, ExternalLink } from "lucide-react";

const QUICK_LINKS = [
  { label: "الرئيسية", path: "/" },
  { label: "التشخيص الذكي", path: "/diagnosis" },
  { label: "استشارة أونلاين", path: "/consultation/online" },
  { label: "استشارة في موقعك", path: "/consultation/onsite" },
  { label: "المدونة", path: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-olive text-warm-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Logo + Description */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-lime" />
              <span className="font-bold text-xl font-alexandria">
                طبيب النباتات
              </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              منصة ذكية لتشخيص أمراض النباتات وربط المزارعين بالخبراء الزراعيين.
              حلول سريعة وموثوقة لمزارعين مصر والوطن العربي.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4 font-alexandria">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4 font-alexandria">
              تواصل معنا
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/201031401349"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                01031401349
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm opacity-80">
            تم تطوير هذا الموقع بواسطة{" "}
            <a
              href="https://orcatech.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:underline inline-flex items-center gap-1"
            >
              OrcaTech
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-sm opacity-60">
            &copy; 2025 طبيب النباتات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
