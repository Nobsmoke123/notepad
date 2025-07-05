import { z } from 'zod';

export const userRegisterSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: 'Email must be a string',
      })
      .email({
        message: 'Email must be a valid email address',
      }),
    password: z
      .string({
        message: 'Password must be a string',
      })
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Password must be at most 100 characters long',
      }),
    fullname: z
      .string({
        message: 'Fullname must be a string',
      })
      .min(3, {
        message: 'Fullname must be at least 3 characters long',
      })
      .max(32, {
        message: 'Fullname must be at most 32 characters long',
      }),
  }),
});

const userUpdateSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: 'Email must be a string',
      })
      .email({
        message: 'Email must be a valid email address',
      })
      .optional(),
    password: z
      .string({
        message: 'Password must be a string',
      })
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Password must be at most 100 characters long',
      })
      .optional(),
    fullname: z.string().min(3).max(32).optional(),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: 'Email must be a string',
      })
      .email({
        message: 'Email must be a valid email address',
      }),
    password: z
      .string({
        message: 'Password must be a string',
      })
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Password must be at most 100 characters long',
      }),
  }),
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
