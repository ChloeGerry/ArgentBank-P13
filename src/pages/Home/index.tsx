import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Header from "@/components/layout/Header";
import Description from "@/components/Description";
import Feature from "@/components/Folder";
import { getProfile } from "@/actions/profile.action";
import { AppDispatch } from "@/utils/store";
import { descriptions } from "@/data/descriptions";
import { features } from "@/data/features";
import { decryptToken } from "@/utils/helpers/decryptToken";
import config from "@/config";

const Home = () => {
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
      <main className="flex flex-col">
        <>
          <img
            src="/assets/bank-tree.jpeg"
            alt="bank tree"
            className="w-full relative object-cover h-[300px] lg:h-[400px]"
          />
          <section className="absolute top-[11%] xs:left-[42%] -translate-x-1/2 bg-white p-8 m-8 text-left w-[264px] sm:left-[50%]  lg:w-[364px] lg:top-[14%] lg:left-[77%]">
            <h1 className="sr-only">Promoted Content</h1>
            {descriptions.map((description, index) => {
              return <Description key={index} text={description} />;
            })}
            <p className="mt-4 mb-0 text-sm lg:text-lg lg:mt-5">
              Open a savings account with Argent Bank today !
            </p>
          </section>
        </>
        <section className="flex flex-col lg:grid lg:grid-cols-3">
          <h2 className="sr-only">Features</h2>
          {features.map(({ title, icon, alt, text }) => {
            return <Feature key={title} icon={icon} alt={alt} title={title} text={text} />;
          })}
        </section>
      </main>
    </>
  );
};

export default Home;
