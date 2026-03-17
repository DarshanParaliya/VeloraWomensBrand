import { SellerStats } from "./types";

export const DEFAULT_MOCK_STATS: SellerStats = {
  rating: 4.9,
  productCount: 0, // Will be updated dynamically
  location: "Global",
  joinedDate: "2023",
  isVerified: true,
};

export const SELLER_STORE_CONFIG = {
  bannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  defaultDescription: "Dedicated to the art of fine craftsmanship and sustainable luxury. Every piece in our collection is curated to bring timeless elegance into your daily life.",
};
