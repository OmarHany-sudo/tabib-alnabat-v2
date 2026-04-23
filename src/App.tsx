import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import DiagnosisPage from "@/pages/DiagnosisPage";
import OnlineConsultationPage from "@/pages/OnlineConsultationPage";
import OnsiteConsultationPage from "@/pages/OnsiteConsultationPage";
import BlogListingPage from "@/pages/BlogListingPage";
import BlogArticlePage from "@/pages/BlogArticlePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col font-alexandria" dir="rtl">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route
            path="/consultation/online"
            element={<OnlineConsultationPage />}
          />
          <Route
            path="/consultation/onsite"
            element={<OnsiteConsultationPage />}
          />
          <Route path="/blog" element={<BlogListingPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
