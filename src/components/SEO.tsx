import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  type = 'website',
  image = '/images/hero-farmer-hands.jpg'
}: SEOProps) => {
  const location = useLocation();
  
  // ✅ Fixed domain (production)
  const domain = 'https://tabib-alnabat.orcatech.online';
  
  // Create canonical URL
  const path = location.pathname;
  const canonicalUrl = canonical || `${domain}${path}`;

  useEffect(() => {
    // Title
    const baseTitle = "طبيب النباتات";
    const fullTitle = title 
      ? `${title} | ${baseTitle}` 
      : "طبيب النباتات - تشخيص أمراض النباتات بالذكاء الاصطناعي";

    document.title = fullTitle;

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    const defaultDescription = "منصة ذكية لتشخيص أمراض النباتات وربط المزارعين بالخبراء الزراعيين";
    const finalDescription = description || defaultDescription;
    
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', finalDescription);
      document.head.appendChild(metaDescription);
    }

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', canonicalUrl);
    } else {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      linkCanonical.setAttribute('href', canonicalUrl);
      document.head.appendChild(linkCanonical);
    }

    // OG Tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateOgTag('og:title', fullTitle);
    updateOgTag('og:description', finalDescription);
    updateOgTag('og:type', type);
    updateOgTag('og:url', canonicalUrl);
    updateOgTag('og:image', `${domain}${image}`);
    updateOgTag('og:locale', 'ar_AR');

    // Twitter Tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', fullTitle);
    updateTwitterTag('twitter:description', finalDescription);
    updateTwitterTag('twitter:image', `${domain}${image}`);

  }, [title, description, canonicalUrl, type, image]);

  return null;
};

export default SEO;
