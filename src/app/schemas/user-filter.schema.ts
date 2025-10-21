import { USER_STATUS_E } from "@/types/extra-enums";
import { z } from "zod";

export const userFilterSchema = z.object({
  organization: z.string().optional().nullable(),
  username: z.string().optional(),
  email: z.string().optional(),
  date: z.string().optional().nullable(),
  phoneNumber: z.string().optional(),
  status: z.enum(USER_STATUS_E).optional().nullable(),
});
