import { z } from "zod";
import { products } from "./schema";

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
};

export const api = {
  products: {
    list: {
      method: "GET" as const,
      path: "/api/products" as const,
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/products/:id" as const,
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  vendors: {
    getProducts: {
      method: "GET" as const,
      path: "/api/vendors/:name/products" as const,
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}

export type ProductResponse = z.infer<typeof api.products.get.responses[200]>;
export type ProductsListResponse = z.infer<typeof api.products.list.responses[200]>;
