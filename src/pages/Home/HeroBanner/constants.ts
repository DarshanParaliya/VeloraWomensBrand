import { BannerSlide } from './types';

export const HERO_SLIDES: BannerSlide[] = [
  {
    id: '1',
    title: 'THE ART OF MINIMALISM',
    subtitle: 'SS24 COLLECTION',
    ctaText: 'EXPLORE NOW',
    ctaLink: '/collections/summer-24',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'ESSENTIAL ELEGANCE',
    subtitle: 'CURATED PIECES',
    ctaText: 'SHOP THE EDIT',
    ctaLink: '/collections/essentials',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
  }
];

export const HERO_CONFIG = {
  autoPlay: true,
  interval: 5000,
};
