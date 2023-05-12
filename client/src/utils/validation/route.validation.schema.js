import { object, string, array } from "yup";

export const routeSchema = object({
  name: string().required().min(10).max(100),
  short_description: string().required().min(30).max(180),
  description: string().required().min(50).max(2000),
  country: string().required(),
  points: array().of(string()).min(1),
  categories: array().of(string()).min(1),
  images: array().of(string()),
});
