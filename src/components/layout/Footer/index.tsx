import { getCurrentYear } from "@/utils/helpers/getCurrentYear";

const Footer = () => {
  const currentYear = getCurrentYear();

  return (
    <footer className="flex justify-center border-2 border-solid border-[#C4D0D9] pt-8 pb-6">
      <p className="m-0">Copyright {currentYear} Argent Bank</p>
    </footer>
  );
};

export default Footer;
