type ErrorTextProps = {
  text: string;
};

const ErrorText = ({ text }: ErrorTextProps) => {
  return <p className="mb-4 text-red-600">{text}</p>;
};

export default ErrorText;
