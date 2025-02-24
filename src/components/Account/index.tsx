import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import LinkNavigation from "@/components/Link";
import Button from "@/components/Button";
import { RootState } from "@/reducers";
import { ButtonEnum } from "@/components/Button/type";
import { ROUTES } from "@/utils/constants";

type AccountProps = {
  title: string;
  amount: string;
  description: string;
  id?: number;
  isButtonVisible?: boolean;
  className?: string;
};

const Account = ({
  title,
  amount,
  description,
  id,
  isButtonVisible = true,
  className,
}: AccountProps) => {
  const profile = useSelector((state: RootState) => state.profileReducer);

  return (
    <section className="flex flex-col justify-between items-center border-[1px] border-solid border-mediumGrey bg-white p-6 box-border text-left md:flex-row">
      <div className={twMerge("flex flex-col w-full", className)}>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-[2.5rem] font-bold">{amount}</p>
        <p className="font-bold">{description}</p>
      </div>
      {isButtonVisible && (
        <LinkNavigation to={`${ROUTES.DASHBOARD}/${profile?.data?.id}/accounts/${id}/transactions`}>
          <Button text="View transactions" type={ButtonEnum.BUTTON} />
        </LinkNavigation>
      )}
    </section>
  );
};

export default Account;
