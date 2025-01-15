import { Link } from "react-router-dom";
import LinkNavigation from "@/components/Link";
import { ROUTES } from "@/utils/constants";

type HeaderProps = {
  isLogged: boolean;
};

const Header = ({ isLogged }: HeaderProps) => {
  return (
    <header>
      <nav className="flex justify-between items-center py-2 px-6">
        <Link to={ROUTES.HOME}>
          <h1>
            <img src="/assets/argent-bank-logo.png" alt="logo" className="w-52" />
          </h1>
        </Link>
        {isLogged ? (
          <div className="flex">
            <LinkNavigation to={`${ROUTES.DASHBOARD}/1`}>
              <img src="/assets/icons/user.svg" className="w-4" /> Name
            </LinkNavigation>

            <LinkNavigation to={ROUTES.HOME} onClick={() => {}}>
              <img src="/assets/icons/logout.svg" className="w-[14px]" /> Sign Out
            </LinkNavigation>
          </div>
        ) : (
          <LinkNavigation to={ROUTES.LOGIN}>
            <img src="/assets/icons/user.svg" className="w-4" /> Sign In
          </LinkNavigation>
        )}
      </nav>
    </header>
  );
};

export default Header;
