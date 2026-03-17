import { FeaturedItem } from './types';

export const FEATURED_COLLECTIONS: FeaturedItem[] = [
  {
    id: 'feat-1',
    title: 'Modern Architecture',
    tagline: 'Form meets function in our latest curation.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    link: '/category/electronics',
    category: 'TECH'
  },
  {
    id: 'feat-2',
    title: 'Minimalist Design',
    tagline: 'Less is more in our latest collection.',
    imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop',
    link: '/category/lighting',
    category: 'DESIGN'
  },
  {
    id: 'feat-3',
    title: 'Sustainable Living',
    tagline: 'Eco-conscious pieces for the conscious home.',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop',
    link: '/category/home-decor',
    category: 'HOME'
  }
];
