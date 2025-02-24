import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Account from "@/components/Account";
import Collapse from "@/components/Collapse";
import Header from "@/components/layout/Header";
import { RootState } from "@/reducers";
import config from "@/config";
import { AppDispatch } from "@/utils/store";
import { getProfile } from "@/actions/profile.action";
import { getCurrentDate } from "@/utils/helpers/getCurrentDate";
import { decryptToken } from "@/utils/helpers/decryptToken";
import { accounts } from "@/data/accounts";
import { transactions, transactionsHeader } from "@/data/transactions";
import { ROUTES } from "@/utils/constants";

const Transactions = () => {
  const userId = useParams();
  const accountId = userId.accountId;
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profileReducer);
  const dispatch: AppDispatch = useDispatch();
  const cookies = useCookies(["token", "expirationDate"])[0];
  const removeCookie = useCookies(["token", "expirationDate"])[2];
  const currentDate = getCurrentDate();
  const expirationDateExpired = currentDate > cookies.expirationDate;
  const secretKey = config.SECRET_KEY;

  useEffect(() => {
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
  }, [profile.data]);

  const currentAccount = accounts.find((account) => {
    return account.id === Number(accountId);
  });

  if (!currentAccount) {
    return navigate(`${ROUTES.DASHBOARD}/${userId.id}`);
  }

  return (
    <>
      <Header isLogged={true} />
      <main>
        <Account
          title={currentAccount?.title}
          amount={currentAccount?.amount}
          description={currentAccount?.description}
          isButtonVisible={false}
          className="items-center"
        />
        <div className="bg-lightGrey pt-36 pb-8 px-4 md:px-28">
          <div className="grid grid-cols-4 text-center text-xs md:text-base md:px-4 mb-2">
            {transactionsHeader.map((transaction) => {
              return (
                <p key={transaction} className={twMerge("font-semibold")}>
                  {transaction}
                </p>
              );
            })}
          </div>
          {transactions.map(({ date, description, amount, balance }, index) => {
            const isLastItem = transactions.length - 1 === index;
            return (
              <Collapse
                key={index}
                date={date}
                description={description}
                amount={amount}
                balance={balance}
                isLastItem={isLastItem}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Transactions;
