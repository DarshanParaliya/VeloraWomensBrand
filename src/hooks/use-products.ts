import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { MOCK_PRODUCTS } from "@/data/products";

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      // Return mock data directly for frontend-only implementation
      return MOCK_PRODUCTS;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      // Find product in mock data
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (!product) return null;
      return product;
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useVendorProducts(name: string) {
  return useQuery({
    queryKey: [api.vendors.getProducts.path, name],
    queryFn: async () => {
      // Filter products by vendor name from mock data
      return MOCK_PRODUCTS.filter(p => p.vendor.toLowerCase() === name.toLowerCase());
    },
    enabled: !!name,
  });
}
