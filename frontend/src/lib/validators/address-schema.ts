import * as z from 'zod';

const phoneRegex = new RegExp(/^[6-9]\d{9}$/);

const pincodeRegex = new RegExp(/^[1-9][0-9]{5}$/);

export const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),

  phone: z.string().regex(phoneRegex, {
    message: "Invalid phone number (e.g., 9876543210)",
  }),

  pincode: z.string().regex(pincodeRegex, {
    message: "Invalid Pincode",
  }),

  city: z.string().min(1, {
    message: 'City is required',
  }),

  state: z.string().min(1, {
    message: 'State is required',
  }),

  houseNumber: z.string().min(1, {
    message: 'House/Flat No. is required',
  }),

  area: z.string().min(1, {
    message: 'Area/Street is required',
  }),

  landmark: z.string().optional(),

  type: z
    .enum(["HOME", "WORK", "OTHER"])
    .optional()
    .refine((val) => val !== undefined),

  isDefault: z.boolean(),
});
