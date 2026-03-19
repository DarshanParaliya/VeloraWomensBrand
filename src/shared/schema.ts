import { z } from "zod";

export const insertProductSchema = z.object({
  title: z.string(),
  price: z.string(),
  rating: z.string(),
  vendor: z.string(),
  category: z.string(),
  image: z.string(),
  description: z.string().nullable(),
  isNew: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  createdAt: z.string().optional(),
});

export const productSchema = insertProductSchema.extend({
  id: z.number(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = z.infer<typeof productSchema>;
