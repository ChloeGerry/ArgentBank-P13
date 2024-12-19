import { Link } from "react-router-dom";
import LinkNavigation from "@/components/Link";
import Icon from "@/components/Icon";
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
            <img src="/public/assets/argentBankLogo.png" alt="logo" className="w-52" />
          </h1>
        </Link>
        {isLogged ? (
          <div>
            <LinkNavigation to={`${ROUTES.DASHBOARD}/1`}>
              <Icon /> Name
            </LinkNavigation>

            <LinkNavigation to={ROUTES.HOME} onClick={() => {}}>
              <Icon /> Sign Out
            </LinkNavigation>
          </div>
        ) : (
          <LinkNavigation to={ROUTES.LOGIN}>
            <Icon /> Sign In
          </LinkNavigation>
        )}
      </nav>
    </header>
  );
};

export default Header;
