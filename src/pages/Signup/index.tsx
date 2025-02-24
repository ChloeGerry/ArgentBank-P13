import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import ErrorText from "@/components/Error";
import Input from "@/components/Input";
import Header from "@/components/layout/Header";
import { AppDispatch } from "@/utils/store";
import { RootState } from "@/reducers";
import { addProfile } from "@/actions/profile.action";
import { SignupParams } from "@/actions/type.profile";
import { signupForm } from "@/data/signupForm";
import { setHeight } from "@/utils/helpers/setHeight";
import { displaySignupFormError } from "@/utils/displaySignupFormError";
import { ButtonEnum } from "@/components/Button/type";
import { ROUTES } from "@/utils/constants";

const Signup = () => {
  const currentHeight = setHeight();
  const form = useRef<HTMLFormElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profileReducer);

  const [error, setError] = useState("");

  useEffect(() => {
    profile.data && navigate(`${ROUTES.DASHBOARD}/${profile.data.id}`);
  }, [profile.data]);

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData: SignupParams = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
    };

    if (formData.email && formData.password && formData.firstName && formData.lastName) {
      dispatch(addProfile(formData));
      setError("");
    }

    const formErrors = displaySignupFormError(formData);

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
            <ErrorText text={error} />
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
