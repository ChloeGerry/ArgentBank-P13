import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { transactionsInformations } from "@/data/transactions";

type CollapseProps = {
  date: string;
  description: string;
  amount: number;
  balance: number;
  isLastItem: boolean;
};

const Collapse = ({ date, description, amount, balance, isLastItem }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={twMerge(
        "grid grid-cols-4 text-center border-t-2 border-x-2 border-solid border-mediumGrey bg-white p-2 items-center gap-4 font-bold text-xs md:text-base md:p-4",
        isLastItem && "border-b-2"
      )}
    >
      <div className="flex items-center gap-2">
        <img
          src="/assets/icons/chevron.svg"
          alt="chevron"
          className={twMerge("w-4 md:w-5 cursor-pointer", isOpen && "transition-all rotate-180")}
          onClick={() => setIsOpen(!isOpen)}
        />
        <p className="w-4/5 text-center">{date}</p>
      </div>
      <p>{description}</p>
      <p>${amount}</p>
      <p>{balance}</p>
      {isOpen &&
        transactionsInformations.map(({ label, value }, index) => {
          return (
            <form
              key={label}
              className={twMerge(
                "flex justify-start col-start-1 col-span-1 gap-2 md:justify-center",
                `row-start-${(index += 2)}`
              )}
            >
              <label>{label}: </label>
              <p>{value}</p>
              {index !== 2 && (
                <img src="/assets/icons/pencil.svg" alt="pencil" className="w-4 text-red-200" />
              )}
            </form>
          );
        })}
    </div>
  );
};

export default Collapse;
