import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Account from "@/components/Account";
import Message from "@/components/Message";
import { RootState } from "@/reducers";
import config from "@/config";
import { editProfile, getProfile } from "@/actions/profile.action";
import { EditProfileParams } from "@/actions/type.profile";
import { AppDispatch } from "@/utils/store";
import { getCurrentDate } from "@/utils/helpers/getCurrentDate";
import { accounts } from "@/data/accounts";
import { editProfileForm } from "@/data/editProfileForm";
import { decryptToken } from "@/utils/helpers/decryptToken";
import { ButtonEnum } from "@/components/Button/type";
import { ROUTES, lettersRegex } from "@/utils/constants";

const Dashboard = () => {
  const profile = useSelector((state: RootState) => state.profileReducer);
  const login = useSelector((state: RootState) => state.loginReducer);
  const dispatch: AppDispatch = useDispatch();
  const cookies = useCookies(["token", "expirationDate"])[0];
  const removeCookie = useCookies(["token", "expirationDate"])[2];
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState({
    message: "",
    onSuccess: false,
  });
  const currentDate = getCurrentDate();
  const expirationDateExpired = currentDate > cookies.expirationDate;
  const secretKey = config.SECRET_KEY;

  useEffect(() => {
    if (profile.hasServerError) {
      navigate(`${ROUTES.LOGIN}`);
    }

    if (!profile.data && cookies.token) {
      const decrytedToken = decryptToken(cookies.token, secretKey);

      if (!decrytedToken) {
        removeCookie("token");
        removeCookie("expirationDate");
        navigate(`${ROUTES.LOGIN}`);
      }

      dispatch(getProfile(decrytedToken));
    }

    if (expirationDateExpired || !cookies.token) {
      removeCookie("token");
      removeCookie("expirationDate");
      navigate(`${ROUTES.LOGIN}`);
    }
  }, [profile.data, profile.hasServerError]);

  const resetFormStatus = () => {
    setFormStatus({
      message: "",
      onSuccess: false,
    });
    form?.current?.reset();
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const decrytedToken = decryptToken(cookies.token, secretKey);
    const token = login?.data?.token ?? decrytedToken;

    if (!token) {
      return setFormStatus({
        ...formStatus,
        message: "Unexpected error, try again later",
      });
    }

    const formData: EditProfileParams = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
    };

    const isFirstNameMatchingRegex = lettersRegex.test(formData.firstName);
    const isLastNameMatchingRegex = lettersRegex.test(formData.lastName);

    if (
      formData.firstName &&
      formData.lastName &&
      isFirstNameMatchingRegex &&
      isLastNameMatchingRegex
    ) {
      dispatch(editProfile(token, formData));
      setFormStatus({
        message: "User name successfully changed",
        onSuccess: true,
      });
      form.reset();
    } else {
      const updateErrorMessage =
        !formData.firstName || !formData.lastName
          ? "You have to enter a first name and a last name"
          : "Your have to enter a proper first and last name";

      return setFormStatus({
        ...formStatus,
        message: updateErrorMessage,
      });
    }
  };

  formStatus.onSuccess &&
    setTimeout(() => {
      resetFormStatus();
    }, 1500);

  return (
    <>
      <Header isLogged={true} />
      <main className="flex flex-col gap-8 bg-lightGrey px-6 pt-8 pb-36">
        <div className="">
          <h1 className="text-center font-semibold text-3xl">Welcome back</h1>
          <form
            className="flex flex-col items-center"
            ref={form}
            onSubmit={(event) => handleForm(event)}
          >
            <div className="flex flex-col gap-2 mt-6 md:flex-row md:gap-4">
              {editProfileForm(profile?.data).map(({ label, type, placeholder }) => {
                return (
                  <Input
                    htmlFor={label}
                    name={label}
                    type={type}
                    id={label}
                    placeholder={placeholder}
                    key={label}
                  />
                );
              })}
            </div>
            {formStatus.onSuccess ? (
              <Message text={formStatus.message} textColor="text-green-800" />
            ) : (
              <Message text={formStatus.message} />
            )}
            <div className="flex gap-4">
              <Button
                text="Save"
                type={ButtonEnum.SUBMIT}
                className="p-2 w-36 bg-white text-purple"
              />
              <Button
                text="Cancel"
                type={ButtonEnum.BUTTON}
                className="p-2 w-36 bg-white text-purple"
                onClick={() => resetFormStatus()}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col align-middle gap-8">
          {accounts.map(({ title, amount, description, id }) => {
            return (
              <Account title={title} amount={amount} description={description} id={id} key={id} />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
