import { FooterSection, SocialLink } from "./types";

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "SHOP",
    links: [
      { label: "New Arrivals", href: "/new" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Collections", href: "/collections" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "HELP",
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

export const COPYRIGHT_TEXT = "© 2024 VELORA. ALL RIGHTS RESERVED.";
