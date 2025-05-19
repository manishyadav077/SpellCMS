import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  avatar: z
    .string()
    .url("Avatar must be a valid URL")
    .optional()
    .or(z.literal("")),
  bio: z.string().min(5, "Bio must be at least 5 characters"),
});
