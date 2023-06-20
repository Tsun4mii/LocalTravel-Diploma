import { object, string } from "yup";

export const adminSchema = object({
  email: string().required().email(),
  password: string()
    .required()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,15}$/,
      "неверный формат пароля"
    ),
  code: string().required(),
});
