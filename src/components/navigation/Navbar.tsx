import { IoMdSettings } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import "animate.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem("savedLanguage") || 'en';
  });


  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem("savedLanguage", currentLanguage);
  }, [currentLanguage, i18n]);

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
    <nav className="flex justify-center items-center w-full gap-5 md:gap-10">
      <IoMdSettings className="md:min-w-12 min-w-6 w-6 text-3xl" />
      <Link to='/' className="md:text-7xl text-4xl font-modesto bg-gradient-to-br from-[#fff5c6]  to-[#caa172] text-transparent bg-clip-text cursor-pointer hover:text-[90px] transition-all duration-500 ease-in-out">
        MOBILEDLE
      </Link>
      {currentLanguage === "en" ? (
        <img src="/us-flag.jpeg" className="md:w-12 w-6 cursor-pointer" onClick={() => changeLanguage("id")}></img>
      ) : (
        // <button onClick={() => changeLanguage("en")}>ID</button>
        <img src="/indo-flag.jpeg" className="md:w-12 w-6  cursor-pointer" onClick={() => changeLanguage("en")}></img>
      )}
      {/* <span>
        <button className="w-full mb-3" onClick={() => changeLanguage("en")}>English</button>
        <br />
        <button onClick={() => changeLanguage("id")}>Bahasa Indonesia</button>
      </span> */}
    </nav>
  );
}

export default Navbar