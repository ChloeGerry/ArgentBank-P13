import { InputEnum } from "@/components/Input/type";

type SignupFormType = {
  label: string;
  type: InputEnum;
  text: string;
};

export const signupForm: SignupFormType[] = [
  {
    label: "email",
    type: InputEnum.TEXT,
    text: "Email",
  },
  {
    label: "password",
    type: InputEnum.PASSWORD,
    text: "Password",
  },
  {
    label: "firstName",
    type: InputEnum.TEXT,
    text: "First name",
  },
  {
    label: "lastName",
    type: InputEnum.TEXT,
    text: "Last name",
  },
];
