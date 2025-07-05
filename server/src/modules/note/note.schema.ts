import { z } from 'zod';

export const createNoteSchema = z.object({
  body: z.object({
    tag: z.string(),
    content: z.string().min(10, 'Content is required'),
  }),
});

export const updateNoteSchema = z.object({
  body: z.object({
    tag: z.string().optional(),
    content: z.string().min(10, 'Content is required').optional(),
  }),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
