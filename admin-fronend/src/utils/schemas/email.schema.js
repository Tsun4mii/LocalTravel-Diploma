import { object, string } from "yup";

export const emailSchema = object({
  recipientEmail: string().required().email(),
});
