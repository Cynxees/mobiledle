import { IoMdSettings } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import "animate.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem("savedLanguage");
    i18n.changeLanguage(savedLanguage);
    return savedLanguage;
  });

  const changeLanguage = (lng: any) => {
    currentLanguage === "en"
      ? setCurrentLanguage("id")
      : setCurrentLanguage("en");

    localStorage.setItem("savedLanguage", lng);

    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    localStorage.setItem("savedLanguage", "en");
  }, []);

  return (
    <nav className="flex justify-between items-center w-full gap-10">
      <IoMdSettings className="text-5xl" />
      <div className="text-logo-sm font-modesto bg-gradient-to-r from-[#e8dca4] to-[#caa172] text-transparent bg-clip-text cursor-pointer hover:text-logo-lg transition-all duration-500 ease-in-out">
        MOBILEDLE
      </div>
      {currentLanguage === "en" ? (
        <img src="public\us-flag.jpeg" className="w-12 h-8 cursor-pointer" onClick={() => changeLanguage("id")}></img>
      ) : (
        // <button onClick={() => changeLanguage("en")}>ID</button>
        <img src="public\indo-flag.jpeg" className="w-12 h-8 cursor-pointer" onClick={() => changeLanguage("en")}></img>
      )}
      {/* <span>
        <button className="w-full mb-3" onClick={() => changeLanguage("en")}>English</button>
        <br />
        <button onClick={() => changeLanguage("id")}>Bahasa Indonesia</button>
      </span> */}
    </nav>
  );
}
