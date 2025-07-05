import { z } from 'zod';

export const createTagSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      })
      .min(3, {
        message: 'name must be at least 3 characters long',
      }),
  }),
});

export const updateTagSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is required',
      invalid_type_error: 'id must be a string',
    }),
  }),
  body: z.object({
    name: z.string().min(3, {
      message: 'name must be at least 3 characters long',
    }),
  }),
});

export const deleteTagSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is required',
      invalid_type_error: 'id must be a string',
    }),
  }),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type DeleteTagInput = z.infer<typeof deleteTagSchema>;
