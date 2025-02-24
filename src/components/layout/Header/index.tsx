import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import LinkNavigation from "@/components/Link";
import { RootState } from "@/reducers";
import { logout } from "@/actions/login.action";
import { AppDispatch } from "@/utils/store";
import { ROUTES } from "@/utils/constants";

type HeaderProps = {
  isLogged: boolean;
};

const Header = ({ isLogged }: HeaderProps) => {
  const profile = useSelector((state: RootState) => state.profileReducer);
  const dispatch: AppDispatch = useDispatch();
  const removeCookie = useCookies(["token", "expirationDate"])[2];

  return (
    <header>
      <nav className="flex justify-between items-center py-2 px-6">
        <Link to={ROUTES.HOME}>
          <h1>
            <img src="/assets/argent-bank-logo.png" alt="logo" className="w-52" />
          </h1>
        </Link>
        {isLogged ? (
          <div className="flex flex-col md:flex-row">
            <LinkNavigation to={`${ROUTES.DASHBOARD}/${profile?.data?.id}`}>
              <img src="/assets/icons/user.svg" className="w-4" />{" "}
              {profile.data && profile.data.firstName}
            </LinkNavigation>
            <LinkNavigation
              to={ROUTES.HOME}
              onClick={() => {
                removeCookie("token");
                removeCookie("expirationDate");
                dispatch(logout());
              }}
            >
              <img src="/assets/icons/logout.svg" className="w-[14px]" /> Sign out
            </LinkNavigation>
          </div>
        ) : (
          <LinkNavigation to={ROUTES.LOGIN}>
            <img src="/assets/icons/user.svg" className="w-4" /> Sign in
          </LinkNavigation>
        )}
      </nav>
    </header>
  );
};

export default Header;
