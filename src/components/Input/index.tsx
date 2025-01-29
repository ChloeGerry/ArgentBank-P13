import { twMerge } from "tailwind-merge";
import { InputEnum } from "./type";

type InputProps = {
  wrapperClassName?: string;
  labelClassName?: string;
  htmlFor: string;
  type: InputEnum;
  name: string;
  id: string;
  text?: string;
  onChange?: () => void;
  value?: string;
  placeholder?: string;
};

const Input = ({
  wrapperClassName,
  labelClassName,
  htmlFor,
  type,
  name,
  id,
  text,
  onChange,
  value,
  placeholder,
}: InputProps) => {
  return (
    <div className={twMerge("flex text-left mb-4", wrapperClassName)}>
      <label className={twMerge("font-bold", labelClassName)} htmlFor={htmlFor}>
        {text}
      </label>
      <input
        className="p-[5px] text-[1.2rem] border-[1px] border-solid rounded-[3px] border-mediumGrey"
        autoComplete="off"
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
