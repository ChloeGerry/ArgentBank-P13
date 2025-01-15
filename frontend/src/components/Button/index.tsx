import { twMerge } from "tailwind-merge";

type buttonProps = {
  className?: string;
  text: string;
  onClick?: () => void;
  type: "submit" | "button";
};

const Button = ({ className, text, onClick, type }: buttonProps) => {
  return (
    <button
      className={twMerge(
        "font-bold p-2 bg-purple rounded-[3px] text-white cursor-pointer",
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
