import { z } from 'zod';

export const createNoteSchema = z.object({
  body: z.object({
    tag: z
      .string({
        required_error: 'Tag is required',
        invalid_type_error: 'Tag must be a string',
      })
      .min(1, 'Tag is required')
      .refine((value) => value.trim() !== '', {
        message: 'Tag cannot be empty',
      }),
    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string',
      })
      .min(10, 'Content is required')
      .refine((value) => value.trim() !== '', {
        message: 'Content cannot be empty',
      }),
  }),
});

export const updateNoteSchema = z.object({
  body: z
    .object({
      tag: z
        .string({
          required_error: 'Tag is required',
          invalid_type_error: 'Tag must be a string',
        })
        .min(1, 'Tag is required')
        .optional(),
    })
    .optional(),
  content: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    })
    .min(10, 'Content is required')
    .optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
