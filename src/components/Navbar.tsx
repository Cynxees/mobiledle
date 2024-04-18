import { IoMdSettings } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import "animate.css";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <IoMdSettings className="text-2xl"/>
      <div className="text-logo-sm font-modesto mx-10 bg-gradient-to-r from-[#e8dca4] to-[#caa172] text-transparent bg-clip-text cursor-pointer hover:text-logo-lg transition-all duration-500 ease-in-out">
        MOBILEDLE
      </div>
      <FaLanguage className="text-2xl"/>
    </nav>
  );
}
