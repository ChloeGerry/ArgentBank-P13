import { Link } from "react-router-dom";

type LinkNavigationProps = {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const LinkNavigation = ({ to, children, onClick }: LinkNavigationProps) => {
  return (
    <Link
      className="flex gap-1 font-bold no-underline hover:underline mr-2"
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LinkNavigation;
