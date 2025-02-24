import { SignupParams } from "@/actions/type.profile";

export const displaySignupFormError = (formData: SignupParams) => {
  return [
    {
      CONDITION: !formData.email,
      ERROR: "You have to enter an email",
    },
    {
      CONDITION: !formData.password,
      ERROR: "You have to enter a password",
    },
    {
      CONDITION: !formData.firstName,
      ERROR: "You have to enter your first name",
    },
    {
      CONDITION: !formData.lastName,
      ERROR: "You have to enter your last name",
    },
  ];
};
