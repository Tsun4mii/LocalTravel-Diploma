import { object, string } from "yup";

export const adminSchema = object({
  email: string().required().email(),
  password: string().required().length(8),
  code: string().required(),
});
