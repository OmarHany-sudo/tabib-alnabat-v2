export interface DiagnosisResult {
  diagnosis: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  confidence: number;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  content?: ArticleContent;
  faqs?: FAQItem[];
}

export interface ArticleContent {
  body: string;
  sections: { heading: string; content: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  image: string;
  variant: 'primary' | 'outline' | 'whatsapp';
}

export interface UsageData {
  date: string;
  count: number;
}

export interface OnSiteFormData {
  name: string;
  phone: string;
  crop: string;
  location: string;
  problem: string;
}
