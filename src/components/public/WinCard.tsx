import { useTranslation } from "react-i18next";
import SurvivalBox from "../../components/navigation/SurvivalBox";
import { useEffect, useState } from "react";
import NavigationButton from "../../components/navigation/NavigationButton";

interface WinCardProps {
  winCardRef: React.RefObject<HTMLDivElement>; // Specify the type of the ref
}

const WinCard: React.FC<WinCardProps> = ({ winCardRef }) => {
  const {t} = useTranslation();

  const [path, setPath] = useState('arcade')

  useEffect(() => {
    
    if(localStorage.getItem("classicWon") != "true"){
      setPath('classic')
    }else if(localStorage.getItem("blurWon") != "true"){
      setPath('blur')
    }else if(localStorage.getItem("discoWon") != "true"){
      setPath('disco')
    }else if(localStorage.getItem("survivalWon") != "true"){
      setPath('survival')
    }else{
      setPath('arcade')
    }

  }, [])


  return (
    <div
      className="flex flex-col items-start gap-3 border-2 border-[#fff] bg-[#d88d43] p-2 md:p-5 w-[90%] md:w-[700px] rounded-lg"
      ref={winCardRef}
    >
      <h2 className="text-white border-b-2 border-b-white w-full text-left">{t`Well Done!`}</h2>
      <h2 className="text-white">{t`Next Mode`} : </h2>
      <NavigationButton link={path} />
    </div>
  );
};

export default WinCard;
