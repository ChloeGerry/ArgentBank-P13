type DescriptionProps = {
  text: string;
};

const Description = ({ text }: DescriptionProps) => {
  return <p className="font-bold text-base lg:text-2xl">{text}</p>;
};

export default Description;
