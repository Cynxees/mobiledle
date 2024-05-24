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

    <div className="flex flex-col mb-5">
      <nav className="flex justify-center items-center w-full gap-5 md:gap-10">
  
        
        <IoMdSettings className="md:min-w-12 min-w-6 w-6 text-3xl" />
        <Link to='/' className="md:text-7xl text-4xl font-modesto bg-gradient-to-br from-[#fff5c6]  to-[#caa172] text-transparent bg-clip-text cursor-pointer hover:text-[90px] transition-all duration-500 ease-in-out">
          MOBILEDLE
        </Link>
        {currentLanguage === "en" ? (
          <img src="/images/us-flag.jpeg" className="md:w-12 w-6 cursor-pointer" onClick={() => changeLanguage("id")}></img>
        ) : (
          // <button onClick={() => changeLanguage("en")}>ID</button>
          <img src="/images/indo-flag.jpeg" className="md:w-12 w-6  cursor-pointer" onClick={() => changeLanguage("en")}></img>
        )}
      </nav>

        <div className="flex gap-3 mx-auto">

          <a href="https://ko-fi.com/cynxx">
            <img className="w-8 h-8 md:w-12 md:h-12 bg-[#00b9fe] rounded-full hover:brightness-110" src="/images/kofi_logo.png" alt="" />
          </a>
          <a href="https://instagram.com/mobiledle">
            <img className="w-10 h-10 md:w-14 md:h-14 -translate-y-1 hover:brightness-110" src="/images/instagram_logo.png" alt="" />
          </a>
          <a href="https://www.youtube.com/@Mobiledle">
            <img className="w-8 h-8 md:w-12 md:h-12 hover:brightness-90" src="/images/youtube_logo.svg" alt="" />
          </a>
          <a href="https://www.tiktok.com/@mobiledle">
            <img className="w-8 h-8 md:w-12 md:h-12 hover:brightness-90" src="/images/tiktok_logo.png" alt="" />
          </a>
          <a href="https://trakteer.id/cynxees/tip">
            <img className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white hover:brightness-110" src="/images/trakteer_icon.png" alt="" />
          </a>
        </div>
    </div>
  );
}

export default Navbar