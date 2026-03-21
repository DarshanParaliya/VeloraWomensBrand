import { NavItem } from './types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Shop All', href: '/products' },
  { label: 'New Arrivals', href: '/products?filter=new' },
  { label: 'Journal', href: '/journal' },
];

export const BRAND_NAME = 'VELORA';

export const NAVBAR_CONFIG = {
  transparentScroll: true,
  promoText: 'Complimentary shipping on orders over $250',
};
