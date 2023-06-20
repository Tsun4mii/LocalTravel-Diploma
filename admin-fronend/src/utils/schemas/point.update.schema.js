import { object, string } from "yup";

export const pointUpdateSchema = object({
  name: string().required().min(4),
  lat: string().required().min(2),
  lon: string().required().min(2),
});
