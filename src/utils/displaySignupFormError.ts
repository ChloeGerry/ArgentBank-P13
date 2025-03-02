import { FormDataRegexVerificationType } from "@/pages/Signup";
import { SignupParams } from "@/actions/type.profile";

type DisplaySignupFormErrorType = {
  CONDITION: boolean;
  ERROR: string;
};

export const displaySignupFormError = (
  formData: SignupParams,
  formDataRegexVerification: FormDataRegexVerificationType
): DisplaySignupFormErrorType[] => {
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
    {
      CONDITION: !formDataRegexVerification.email,
      ERROR: "You have to enter a proper email",
    },
    {
      CONDITION: !formDataRegexVerification.password,
      ERROR: "You have to enter a password with at least 3 characters",
    },
    {
      CONDITION: !formDataRegexVerification.firstName,
      ERROR: "You have to enter a proper first name",
    },
    {
      CONDITION: !formDataRegexVerification.lastName,
      ERROR: "You have to enter a proper last name",
    },
  ];
};
