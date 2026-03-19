import { FooterSection, SocialLink } from "./types";

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "SHOP",
    links: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/products?filter=new" },
    ],
  },
  {
    title: "INFORMATION",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "CLIENT SERVICES",
    links: [
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { platform: "Pinterest", href: "https://pinterest.com", icon: "pinterest" },
  { platform: "Twitter", href: "https://twitter.com", icon: "twitter" },
];

export const COPYRIGHT_TEXT = "© 2026 VELORA. ALL RIGHTS RESERVED.";
