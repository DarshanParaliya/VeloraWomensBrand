import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const res = await fetch(api.products.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return api.products.list.responses[200].parse(data);
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      return api.products.get.responses[200].parse(data);
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useVendorProducts(name: string) {
  return useQuery({
    queryKey: [api.vendors.getProducts.path, name],
    queryFn: async () => {
      const url = buildUrl(api.vendors.getProducts.path, { name });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch vendor products");
      const data = await res.json();
      return api.vendors.getProducts.responses[200].parse(data);
    },
    enabled: !!name,
  });
}
