import { object, string } from "yup";

export const registerSchema = object({
  email: string().required().email(),
  password: string()
    .required()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,15}$/,
      "Is not correct format of password"
    ),
  username: string().required().min(4),
});
