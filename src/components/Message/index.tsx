import { twMerge } from "tailwind-merge";

type MessageProps = {
  text: string;
  textColor?: string;
};

const Message = ({ text, textColor = "text-red-600" }: MessageProps) => {
  return <p className={twMerge("mb-4 text-center", textColor)}>{text}</p>;
};

export default Message;
