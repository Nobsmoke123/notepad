import { z } from 'zod';

export const createTagSchema = z.object({
  body: z.object({
    name: z.string().min(3, {
      message: 'Tag name must be at least 3 characters long',
    }),
  }),
});

export const updateTagSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tag ID format'),
  }),
  body: z.object({
    name: z.string().min(3, {
      message: 'Tag name must be at least 3 characters long',
    }),
  }),
});

export const deleteTagSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tag ID format'),
  }),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type DeleteTagInput = z.infer<typeof deleteTagSchema>;
