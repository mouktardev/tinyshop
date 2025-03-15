import { z } from 'zod';

export const ProductsSearchSchema = z.object({
  search: z.string().catch(''),
  tags: z.string().catch(''),
  page: z.number().catch(0),
  layout: z.boolean().catch(true),
  pageSize: z.number().catch(6),
  sortby: z.string().catch('id'),
  order: z.boolean().catch(false),
});