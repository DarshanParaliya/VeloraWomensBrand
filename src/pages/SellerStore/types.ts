export interface SellerStats {
  rating: number;
  productCount: number;
  location: string;
  joinedDate: string;
  isVerified: boolean;
}

export interface SellerProfile {
  name: string;
  description: string;
  bannerImage: string;
  stats: SellerStats;
}
