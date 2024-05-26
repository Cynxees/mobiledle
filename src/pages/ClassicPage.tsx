import { useEffect, useRef, useState } from "react";
import ColorIndicator from "../components/classic/ColorIndicator";
import HeroShowBar from "../components/classic/HeroShowBar";
import Navbar from "../components/navigation/Navbar";
import HeroSearchBar from "../components/classic/HeroSearchBar";
import ClassicTableTitle from "../components/classic/ClassicTableTitle";
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import HeroBank from "../components/classic/HeroBank";

import { useTranslation } from "react-i18next";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import WinCard from "../components/public/WinCard";
import { MobileLegendsHero } from "../types/MobileLegendsHero";
import CachedImage from "../components/CachedImage";

interface userGuess {
  isCorrect: boolean;
  isClicked: boolean;
}

export default function ClassicPage() {
  const { t } = useTranslation();

  const { data: characters, isLoading, error } = useMobileLegendsCharacters();
  const todayCharacter = useFetchTodayAnswer("CLASSIC");

  const [userAnswers, setUserAnswers] = useState<MobileLegendsHero[]>(
    () => {
      const storedData = localStorage.getItem("classicAnswers");
      //check if now is a new day
      const savedDate = localStorage.getItem("latestClassicDate");
      const today = new Date().toLocaleDateString();
      if (savedDate !== today) {
        return [];
      }

      

      return storedData ? JSON.parse(storedData) : [];
    }
  );


  useEffect(()=>{

    if(isLoading) return
    
    userAnswers.map(c => {
       characters.map(ch => {
        if(c.id == ch.id){
        c.imageKeys = ch.imageKeys
        return
      }
    })
  
    })
  }, [isLoading])
  

  const [totalWins, setTotalWins] = useState<number>(() => {
    return parseInt(localStorage.getItem("totalClassicWon")) || 0;
  });
  const [isWin, setIsWin] = useState<boolean>(() => {
    const storedData = localStorage.getItem("classicWon");
    //check if now is a new day
    const savedDate = localStorage.getItem("latestClassicDate");
    const today = new Date().toLocaleDateString();
    if (savedDate !== today) {
      return false;
    }
    return storedData === "true";
  });
  const [userPredict, setUserPredict] = useState<userGuess>({
    isClicked: false,
    isCorrect: false,
  });

  const [showBank, setShowBank] = useState(false);

  const winCardRef = useRef<HTMLDivElement>(null);

  //local storage init
  useEffect(() => {
    // make sure that the item is in the local storage
    localStorage.setItem("classicAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("classicWon", "false");
    if (isWin) {
      localStorage.setItem("classicWon", "true");
    }
    localStorage.setItem("latestClassicDate", new Date().toLocaleDateString());
    localStorage.setItem("totalClassicWon", totalWins.toString());
  }, [userAnswers, isWin, totalWins]);

  //scroll to winCard
  useEffect(() => {
    if (isWin && winCardRef.current) {
      winCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isWin, winCardRef.current]);

  //userAnswer function
  const handleChildData = (dataFromChild: MobileLegendsHero) => {
    if (dataFromChild != null) {
      setUserAnswers((prevAnswers) => [...prevAnswers, dataFromChild]);

      // Check if dataFromChild matches todayCharacter
      if (dataFromChild.id === todayCharacter?.id) {
        setIsWin(true);
        setTotalWins((prevTotalWins) => prevTotalWins + 1);

        localStorage.setItem("classicWon", "true");
        localStorage.setItem("totalClassicWon", totalWins.toString());
      }
    }
  };

  const handleShowBank = () => {
    setShowBank(!showBank);
  };

  if (isLoading) return <div> Loading...</div>;

  return (
    <div className="w-screen align-top flex flex-col">


      {(userAnswers.length>0) ?
      <div className="absolute top-0 w-full h-full" draggable="false">
        <CachedImage
          imgKey={characters[parseInt(userAnswers[userAnswers.length-1].id)-1].imageKeys.banners[0]} 
          className="absolute top-0 left-0 w-full h-full object-cover object-top brightness-[0.1] -z-30"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#10100e] -z-20"></div>
      </div>:''
      }

      {showBank ? 
        <aside
        className={"hidden xl:block fixed top-0 right-0 z-40 justify-end xl:w-[22vw] h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"}
        >
          <HeroBank />
        </aside>
      
      
      
      :''}
      
      <section className={`flex flex-col w-full gap-5 items-center md:mt-[20vh] mt-[25vh] mb-32 `}>
        
        

        <div className="flex flex-col gap-5 mb-16 mx-24 w-full sm:px-5 px-2 items-center justify-center">
          <div className="relative -z-1">
        <Navbar currentPage={'classic'} />

          </div>
        {!isWin && (
          <HeroSearchBar
            characters={characters}
            onDataFromChild={handleChildData}
            userAnswers = {userAnswers}
          />
        )}
        <div>
          {t`Total Wins`} : {totalWins}
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={handleShowBank}
          />
          <div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-orange-500"></div>
          <span className="ms-3 my-auto text-sm font-medium text-gray-900 dark:text-gray-300">
            NOOB MODE
          </span>
        </label>
          <ClassicTableTitle />
          {userAnswers.map((character, index) => (
            
            <div key={index} className="" style={{ order: userAnswers.length - index }}>
              <HeroShowBar
                character={character}
                answer={todayCharacter}
              />
            </div>
          ))}
        </div>
        {isWin && <WinCard winCardRef={winCardRef}/>}
        <div className="w-full ">

        <ColorIndicator />
        </div>
      </section>
      <div
        className={`${
          showBank ? "block" : "hidden"
        } flex flex-col xl:hidden align-middle mx-auto`}
      >
        <div className={`text-4xl text-white mb-5 `}>Heroes</div>
        
        <HeroBank />
        
      </div>
    </div>
  );
}
