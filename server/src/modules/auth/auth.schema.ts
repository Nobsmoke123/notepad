import { z } from 'zod';

export const userRegisterSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    fullname: z.string().min(3).max(32),
  }),
});

const userUpdateSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().min(8).max(100).optional(),
    fullname: z.string().min(3).max(32).optional(),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
  }),
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
