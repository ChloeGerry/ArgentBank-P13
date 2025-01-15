type FeatureProps = {
  icon: string;
  alt: string;
  title: string;
  text: string;
};

const Feature = ({ icon, alt, title, text }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center p-10">
      <img
        src={icon}
        alt={alt}
        className="w-[150px] border-solid border-[10px] border-[#00bc77] rounded-full p-4"
      />
      <h3 className="text-[#222] font-bold mb-2 mt-6 text-xl">{title}</h3>
      <p className="text-center">{text}</p>
    </div>
  );
};

export default Feature;
