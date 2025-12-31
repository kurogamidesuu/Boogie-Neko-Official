import z from "zod";

export const signupSchema = z.object({
  firstName: z.string().nonempty({
    message: 'First Name is required'
  }),
  lastName: z.string().nonempty({
    message: 'Last Name is required'
  }),
  email: z.email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  })
})