import React, { useEffect, useState } from "react";
import ColorIndicator from "../components/classic/ColorIndicator";
import HeroShowBar from "../components/classic/HeroShowBar";
import Navbar from "../components/navigation/Navbar";
import ClassicInput from "../components/classic/ClassicInput";
import { MobileLegendsCharacter } from "../API";
import ClassicTableTitle from "../components/classic/ClassicTableTitle";
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import HeroBank from "../components/classic/HeroBank";

import { useTranslation } from "react-i18next";
import { useMobileLegendsCharacters } from "../contexts/MobileLegendsCharactersContext";

interface userGuess {
  isCorrect: boolean;
  isClicked: boolean;
}

export default function ClassicPage() {
  const { t } = useTranslation();

  const { characters, isLoading } = useMobileLegendsCharacters();
  const [todayCharacter, setTodayCharacter] = useState<
    MobileLegendsCharacter | undefined
  >(undefined);

  const [userAnswers, setUserAnswers] = useState<MobileLegendsCharacter[]>(
    () => {
      const storedData = localStorage.getItem("userAnswers");
      //check if now is a new day
      const savedDate = localStorage.getItem("savedDate");
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
        c.imageUrl = ch.imageUrl
        return
      }
    })
  
    })
  }, [isLoading])
  

  const [totalWins, setTotalWins] = useState<number>(() => {
    return parseInt(localStorage.getItem("totalWins")) || 0;
  });
  const [isWin, setIsWin] = useState<boolean>(() => {
    const storedData = localStorage.getItem("isWin");
    //check if now is a new day
    const savedDate = localStorage.getItem("savedDate");
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

  const [showBank, setShowBank] = useState(true);

  //fetching character and todayCharacter
  useEffect(() => {
    if (isLoading) return;

    const fetchData = async () => {
      const result = await useFetchTodayAnswer("CLASSIC");
      setTodayCharacter(result);
    };

    fetchData();
  }, [isLoading]);

  //local storage init
  useEffect(() => {
    // make sure that the item is in the local storage
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("isWin", "false");
    if (isWin) {
      localStorage.setItem("isWin", "true");
    }
    localStorage.setItem("savedDate", new Date().toLocaleDateString());
    localStorage.setItem("totalWins", totalWins.toString());
  }, [userAnswers, isWin, totalWins]);

  //userAnswer function
  const handleChildData = (dataFromChild: MobileLegendsCharacter) => {
    if (dataFromChild != null) {
      setUserAnswers((prevAnswers) => [...prevAnswers, dataFromChild]);

      // Check if dataFromChild matches todayCharacter
      if (dataFromChild.id === todayCharacter?.id) {
        setIsWin(true);
        setTotalWins((prevTotalWins) => prevTotalWins + 1);

        localStorage.setItem("isWin", "true");
        localStorage.setItem("totalWins", totalWins.toString());
      }
    }
  };

  const handleShowBank = () => {
    setShowBank(!showBank);
  };

  if (characters.length < 1) return <div> Loading...</div>;

  return (
    <>
      <aside
        className={`${
          showBank ? "lg:block" : "hidden"
        } fixed top-0 right-0 z-40 justify-end lg:w-[22vw] max-lg:hidden h-screen overflow-y-scroll`}
      >
        <HeroBank />
      </aside>
      <section className={`flex flex-col gap-5 items-center mt-[20vh]`}>
        
        

        <div className="flex flex-col gap-5 mb-16 mx-24 items-center justify-center">
        <Navbar />
        {!isWin && (
          <ClassicInput
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
          <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Mythical IMMORTAL 😎 Mode
          </span>
        </label>
          <ClassicTableTitle />
          {userAnswers.map((character, index) => (
            <div key={index} style={{ order: userAnswers.length - index }}>
              <HeroShowBar
                character={character}
                todayCharacter={todayCharacter}
              />
            </div>
          ))}
        </div>
        <ColorIndicator />
      </section>
      <div
        className={`${
          showBank ? "block" : "hidden"
        } flex flex-col lg:hidden align-middle mx-auto`}
      >
        <div className={`text-4xl text-white mb-5 `}>Heroes</div>
        <HeroBank />
      </div>
    </>
  );
}
