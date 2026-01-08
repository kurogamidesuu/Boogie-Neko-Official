import z from "zod";

const transactionIdRegex = /^\d{12}$/;

export const paymentSchema = z.object({
  transactionId: z.string().regex(transactionIdRegex, {
    message: 'Transaction ID must be 12 digits only',
  })
})