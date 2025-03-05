import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Button from "@/components/Button";
import Message from "@/components/Message";
import Input from "@/components/Input";
import Header from "@/components/layout/Header";
import { RootState } from "@/reducers";
import config from "@/config";
import { addProfile } from "@/actions/profile.action";
import { SignupParams } from "@/actions/type.profile";
import { getLogin } from "@/actions/login.action";
import { GetLoginParams } from "@/actions/type.login";
import { AppDispatch } from "@/utils/store";
import { setHeight } from "@/utils/helpers/setHeight";
import { displaySignupFormError } from "@/utils/displaySignupFormError";
import { signupForm } from "@/data/signupForm";
import { ButtonEnum } from "@/components/Button/type";
import {
  ROUTES,
  containThreeElementsRegex,
  charactersRegex,
  emailRegex,
  ONE_HOUR,
} from "@/utils/constants";

export type FormDataRegexVerificationType = {
  email: boolean;
  password: boolean;
  firstName: boolean;
  lastName: boolean;
};

const Signup = () => {
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state: RootState) => state.loginReducer);
  const profile = useSelector((state: RootState) => state.profileReducer);
  const cookies = useCookies(["token", "expirationDate"])[0];
  const setCookie = useCookies(["token", "expirationDate"])[1];
  const currentHeight = setHeight();
  const date = new Date().getTime() + ONE_HOUR;
  const secretKey = config.SECRET_KEY;
  const [loginFormData, setLoginFormData] = useState<GetLoginParams | undefined>(undefined);

  useEffect(() => {
    if (login.hasServerError) {
      return setError("Unexpected error, try again later");
    }

    if (loginFormData) {
      dispatch(getLogin(loginFormData));
    }

    if (login.data) {
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(login.data.token),
        secretKey
      ).toString();

      setCookie("token", encryptedToken);
      setCookie("expirationDate", date);
    }

    if (profile.data && cookies.token) {
      navigate(`${ROUTES.DASHBOARD}/${profile.data.id}`);
    }
  }, [login.data, profile.data, login.hasServerError]);

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData: SignupParams = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
    };

    const isEmailMatchingRegex = emailRegex.test(formData.email);
    const isPasswordMatchingRegex = containThreeElementsRegex.test(formData.password);
    const isFirstNameMatchingRegex = charactersRegex.test(formData.firstName);
    const isLastNameMatchingRegex = charactersRegex.test(formData.lastName);

    const isFormDataFormatValid =
      isEmailMatchingRegex &&
      isPasswordMatchingRegex &&
      isFirstNameMatchingRegex &&
      isLastNameMatchingRegex;

    const LoginFormData: GetLoginParams = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };

    if (
      formData.email &&
      formData.password &&
      formData.firstName &&
      formData.lastName &&
      isFormDataFormatValid
    ) {
      dispatch(addProfile(formData));
      setError("");
      setLoginFormData(LoginFormData);
    }

    const formDataRegexVerification: FormDataRegexVerificationType = {
      email: isEmailMatchingRegex,
      password: isPasswordMatchingRegex,
      firstName: isFirstNameMatchingRegex,
      lastName: isLastNameMatchingRegex,
    };

    const formErrors = displaySignupFormError(formData, formDataRegexVerification);

    const firstError = formErrors.find((formError) => formError.CONDITION);

    if (firstError) {
      setError(firstError.ERROR);
    }
  };

  return (
    <>
      <Header isLogged={false} />
      <main className="flex bg-lightGrey" style={{ height: `${currentHeight}px` }}>
        <section className="box-border bg-white w-[300px] h-fit mt-12 mx-auto p-8">
          <img src="/assets/icons/user.svg" className="w-4 justify-self-center" />
          <h1 className="my-5 font-bold text-2xl justify-self-center">Sign up</h1>
          <form ref={form} onSubmit={(event) => handleForm(event)}>
            {signupForm.map(({ label, type, text }) => {
              return (
                <Input
                  htmlFor={label}
                  name={label}
                  text={text}
                  type={type}
                  id={label}
                  key={label}
                  wrapperClassName="flex-col"
                />
              );
            })}
            <Message text={error} />
            <Button
              className="block w-full text-base mt-4 mb-8 underline"
              text="Sign up"
              type={ButtonEnum.SUBMIT}
            />
          </form>
        </section>
      </main>
    </>
  );
};

export default Signup;
