import { z } from "zod";

export const checkoutFormSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(7, "Please enter a valid phone number"),
  customerEmail: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  shippingAddress: z.string().min(5, "Delivery address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  notes: z.string().optional().or(z.literal("")),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
