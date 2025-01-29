import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "@/components/layout/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LinkNavigation from "@/components/Link";
import { InputEnum } from "@/components/Input/type";
import { ButtonEnum } from "@/components/Button/type";
import ErrorText from "@/components/Error";
import { RootState } from "@/reducers";
import { getProfile } from "@/actions/profile.action";
import { getLogin } from "@/actions/login.action";
import { GetLoginParams } from "@/actions/type.login";
import { AppDispatch } from "@/utils/store";
import { setHeight } from "@/utils/helpers/setHeight";
import { getCurrentDate } from "@/utils/helpers/getCurrentDate";
import { FOUR_HOURS, ROUTES } from "@/utils/constants";

const Login = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const login = useSelector((state: RootState) => state.loginReducer);
  const profile = useSelector((state: RootState) => state.profileReducer);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isUserRemembered, setUserRemembered] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "expirationDate"]);

  const [error, setError] = useState<string>("");

  const currentHeight = setHeight();
  // const currentDate = new Date().getTime();

  useEffect(() => {
    if (login.hasAuthenticationFailed) {
      setError("Invalid credentials");
    }

    if (isUserRemembered && login.data) {
      const date = new Date().getTime() + FOUR_HOURS;
      setCookie("token", login.data.token);
      setCookie("expirationDate", date);
    }

    const currentDate = getCurrentDate();
    const expirationDateExpired = currentDate > cookies.expirationDate;
    if (expirationDateExpired) {
      removeCookie("token");
      removeCookie("expirationDate");
    }

    if (cookies.token) {
      dispatch(getProfile(cookies.token));
    }

    if (profile.data && cookies.token) {
      navigate(`${ROUTES.DASHBOARD}/${profile.data.id}`);
    }

    if (login.data) {
      const token = login?.data.token;
      dispatch(getProfile(token));
    }

    if (login.data && profile.data) {
      navigate(`${ROUTES.DASHBOARD}/${profile.data.id}`);
      form.current && form.current.reset();
    }
  }, [login.data, login.hasAuthenticationFailed, profile.data, isUserRemembered]);

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData: GetLoginParams = {
      email: (form.elements.namedItem("username") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };

    if (!formData.email || !formData.password) {
      return setError("Invalid credentials");
    }

    dispatch(getLogin(formData));

    setError("");
  };

  return (
    <>
      <Header isLogged={false} />
      <main className="flex bg-lightGrey" style={{ height: `${currentHeight}px` }}>
        <section className="box-border bg-white w-[300px] h-fit mt-12 mx-auto p-8">
          <img src="/assets/icons/user.svg" className="w-4 justify-self-center" />
          <h1 className="my-5 font-bold text-2xl justify-self-center">Sign In</h1>
          <form ref={form} onSubmit={(event) => handleForm(event)}>
            <Input
              wrapperClassName="flex-col"
              htmlFor="username"
              name="username"
              type={InputEnum.TEXT}
              id="username"
              text="Username"
            />
            <Input
              wrapperClassName="flex-col"
              htmlFor="password"
              name="password"
              type={InputEnum.PASSWORD}
              id="password"
              text="Password"
            />
            <ErrorText text={error} />
            <div className="flex">
              <input
                type="checkbox"
                id="remember-me"
                onClick={() => setUserRemembered(!isUserRemembered)}
              />
              <label htmlFor="remember-me" className="ml-1">
                Remember me
              </label>
            </div>
            <Button
              className="block w-full text-base mt-4 mb-8 underline"
              text="Sign In"
              type={ButtonEnum.SUBMIT}
            />
          </form>
          <LinkNavigation to="/signup">New member ? Sign up here !</LinkNavigation>
        </section>
      </main>
    </>
  );
};

export default Login;
