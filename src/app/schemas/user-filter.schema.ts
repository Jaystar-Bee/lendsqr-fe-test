import { USER_STATUS_E } from "@/types/extra-enums";
import { z } from "zod";

export const userFilterSchema = z.object({
  organization: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  date: z.string().optional(),
  phoneNumber: z.string().optional(),
  status: z.enum(USER_STATUS_E).optional(),
});
