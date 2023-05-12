import { object, string } from "yup";

export const countrySchema = object({
  name: string().required().min(4),
});
