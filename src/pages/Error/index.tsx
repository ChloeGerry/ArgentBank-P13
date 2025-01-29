import LinkNavigation from "@/components/Link";
import Header from "@/components/layout/Header";
import { setHeight } from "@/utils/helpers/setHeight";

const Error = () => {
  const currentHeight = setHeight();

  return (
    <>
      <Header isLogged={false} />
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
