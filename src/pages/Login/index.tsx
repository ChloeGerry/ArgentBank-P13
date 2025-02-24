import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Header from "@/components/layout/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LinkNavigation from "@/components/Link";
import ErrorText from "@/components/Error";
import { RootState } from "@/reducers";
import config from "@/config";
import { getProfile } from "@/actions/profile.action";
import { getLogin } from "@/actions/login.action";
import { GetLoginParams } from "@/actions/type.login";
import { AppDispatch } from "@/utils/store";
import { setHeight } from "@/utils/helpers/setHeight";
import { getCurrentDate } from "@/utils/helpers/getCurrentDate";
import { decryptToken } from "@/utils/helpers/decryptToken";
import { loginForm } from "@/data/loginForm";
import { ButtonEnum } from "@/components/Button/type";
import { ONE_HOUR, ROUTES } from "@/utils/constants";

const Login = () => {
  const login = useSelector((state: RootState) => state.loginReducer);
  const profile = useSelector((state: RootState) => state.profileReducer);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "expirationDate"]);
  const form = useRef<HTMLFormElement | null>(null);
  const [isUserRemembered, setUserRemembered] = useState(false);
  const [error, setError] = useState<string>("");

  const currentHeight = setHeight();
  const date = new Date().getTime() + ONE_HOUR;
  const currentDate = getCurrentDate();
  const secretKey = config.SECRET_KEY;

  useEffect(() => {
    if (login.hasServerError) {
      return setError("Unexpected error, try again later");
    }

    if (login.hasAuthenticationFailed) {
      setError("Invalid credentials");
    }

    if (isUserRemembered && login.data) {
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(login.data.token),
        secretKey
      ).toString();
      setCookie("token", encryptedToken);
      setCookie("expirationDate", date);
    }

    const isTokenValidityExpired = currentDate > cookies.expirationDate;

    if (isTokenValidityExpired) {
      removeCookie("token");
      removeCookie("expirationDate");
    }

    if (cookies.token) {
      const decrytedToken = decryptToken(cookies.token, secretKey);
      dispatch(getProfile(decrytedToken));
    }

    if (profile.data && cookies.token) {
      navigate(`${ROUTES.DASHBOARD}/${profile.data.id}`);
    }

    if (login.data) {
      const token = login.data.token;
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(login.data.token),
        secretKey
      ).toString();

      setCookie("token", encryptedToken);
      setCookie("expirationDate", date);
      dispatch(getProfile(token));
    }

    if (login.data && profile.data) {
      navigate(`${ROUTES.DASHBOARD}/${profile.data.id}`);
      form.current && form.current.reset();
    }
  }, [
    login.data,
    login.hasAuthenticationFailed,
    login.hasServerError,
    profile.data,
    isUserRemembered,
  ]);

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
  };

  return (
    <>
      <Header isLogged={false} />
      <main className="flex bg-lightGrey" style={{ height: `${currentHeight}px` }}>
        <section className="box-border bg-white w-[300px] h-fit mt-12 mx-auto p-8">
          <img src="/assets/icons/user.svg" className="w-4 justify-self-center" />
          <h1 className="my-5 font-bold text-2xl justify-self-center">Sign in</h1>
          <form ref={form} onSubmit={(event) => handleForm(event)}>
            {loginForm.map(({ label, type, text }) => {
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
