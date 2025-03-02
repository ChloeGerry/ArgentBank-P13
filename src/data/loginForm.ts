import { InputEnum } from "@/components/Input/type";

type LoginFormType = {
  label: string;
  type: InputEnum;
  text: string;
};

export const loginForm: LoginFormType[] = [
  {
    label: "username",
    type: InputEnum.TEXT,
    text: "Username",
  },
  {
    label: "password",
    type: InputEnum.PASSWORD,
    text: "Password",
  },
];
