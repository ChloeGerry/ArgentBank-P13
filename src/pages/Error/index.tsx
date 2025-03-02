import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import LinkNavigation from "@/components/Link";
import Header from "@/components/layout/Header";
import { getProfile } from "@/actions/profile.action";
import { AppDispatch } from "@/utils/store";
import { decryptToken } from "@/utils/helpers/decryptToken";
import { setHeight } from "@/utils/helpers/setHeight";
import config from "@/config";

const Error = () => {
  const currentHeight = setHeight();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const cookies = useCookies(["token", "expirationDate"])[0];
  const removeCookie = useCookies(["token", "expirationDate"])[2];
  const secretKey = config.SECRET_KEY;

  useEffect(() => {
    if (cookies.token) {
      const decrytedToken = decryptToken(cookies.token, secretKey);

      if (!decrytedToken) {
        removeCookie("token");
        removeCookie("expirationDate");
        window.location.reload();
      } else {
        dispatch(getProfile(decrytedToken));
        setIsUserLogged(true);
      }
    }
  }, []);

  return (
    <>
      <Header isLogged={isUserLogged} />
      <main
        className="flex flex-col gap-2 px-6 justify-center items-center text-center"
        style={{ height: `${currentHeight}px` }}
      >
        <p className="text-2xl md:text-4xl">Cette page n'existe pas...</p>
        <LinkNavigation to="/">Cliquez ici pour retourner sur la page d'accueil</LinkNavigation>
      </main>
    </>
  );
};

export default Error;
