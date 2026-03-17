import { Product } from "@/shared/schema";

export interface FeaturedPiecesProps {
  products: Product[];
  isLoading?: boolean;
}
