import { twMerge } from "tailwind-merge";
import { ButtonEnum } from "./type";

type buttonProps = {
  className?: string;
  text: string;
  onClick?: () => void;
  type: ButtonEnum;
};

const Button = ({ className, text, onClick, type }: buttonProps) => {
  return (
    <button
      className={twMerge(
        "font-bold p-2 border-[1px] border-solid border-purple bg-purple rounded-[3px] text-white cursor-pointer",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
