import React, { useEffect, useState } from "react";
import ColorIndicator from "../components/ColorIndicator";
import HeroShowBar from "../components/HeroShowBar";
import Navbar from "../components/Navbar";
import ClassicInput from "../components/classic/ClassicInput";
import { MobileLegendsCharacter } from "../API";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import ClassicTableTitle from "../components/classic/ClassicTableTitle";
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import HeroBank from "../components/classic/HeroBank";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { useMobileLegendsCharacters } from "../contexts/MobileLegendsCharactersContext";

interface userGuess {
  isCorrect: boolean;
  isClicked: boolean;
}

export default function ClassicPage() {
  const { t } = useTranslation();

  const { characters, isLoading } = useMobileLegendsCharacters();
  const [userAnswers, setUserAnswers] = useState<MobileLegendsCharacter[]>(
    () => {
      const storedData = localStorage.getItem("userAnswers");
      return storedData ? JSON.parse(storedData) : [];
    }
  );

  const [todayCharacter, setTodayCharacter] = useState<
    MobileLegendsCharacter | undefined
  >(undefined);

  const [showPopup, setShowPopup] = useState(false);
  const [showBank, setShowBank] = useState(true);
  const [totalWins, setTotalWins] = useState<number>(() => {
    return parseInt(localStorage.getItem("totalWins")) || 0
  })

  const [userPredict, setUserPredict] = useState<userGuess>({
    isClicked: false,
    isCorrect: false,
  });

  const [isWin, setIsWin] = useState<boolean>(() => {
    const storedData = localStorage.getItem("isWin");
    return storedData === "true"; // Convert the string to boolean
  });

  const [aliasOptions, setAliasOptions] = useState<MobileLegendsCharacter[]>(
    []
  );

  //fetching character and todayCharacter
  useEffect(() => {


    if(isLoading) return;

    const fetchData = async () => {

      const result = await useFetchTodayAnswer("CLASSIC");
      setTodayCharacter(result);
    };

    fetchData();
  }, [isLoading]);

  //alias option function
  useEffect(() => {
    if (!todayCharacter || todayCharacter.id === undefined) {
      console.log("todayCharacter or its id is undefined.");
      return;
  }
    const initialOptions = [todayCharacter];
    const availableIndices = new Set(Array.from({ length: characters.length }, (_, index) => index)); // Create a set of all indices

    availableIndices.delete(parseInt(todayCharacter.id) - 1);

    while (initialOptions.length < 3) {
        const randomIndex = Math.floor(Math.random() * availableIndices.size);
        const randomIndexValue = Array.from(availableIndices)[randomIndex];
        initialOptions.push(characters[randomIndexValue]);
        availableIndices.delete(randomIndexValue);
    }

    initialOptions.sort(() => Math.random() - 0.5);

    setAliasOptions(initialOptions);
}, [todayCharacter]);

  //local storage init
  useEffect(() => {
    //check if now is a new day
    const savedDate = localStorage.getItem("savedDate");
    const today = new Date().toLocaleDateString();
    if (savedDate !== today) {
      localStorage.removeItem("userAnswers");
      localStorage.removeItem("isWin");
      localStorage.setItem("savedDate", today);
    }

    // make sure that the item is in the local storage
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("isWin", "false");
    if (isWin) {
      localStorage.setItem("isWin", "true");
    }
    localStorage.setItem("savedDate", new Date().toLocaleDateString());
    localStorage.setItem("totalWins", totalWins.toString())
  }, [userAnswers, isWin, totalWins]);

  //userAnswer function
  const handleChildData = (dataFromChild: MobileLegendsCharacter) => {
    if (dataFromChild != null) {
      setUserAnswers((prevAnswers) => [...prevAnswers, dataFromChild]);

      console.log(dataFromChild, todayCharacter);

      // Check if dataFromChild matches todayCharacter
      if (dataFromChild.id === todayCharacter?.id) {
        setIsWin(true);
        localStorage.setItem("isWin", "true");
        setTotalWins(prevTotalWins => prevTotalWins + 1);
        localStorage.setItem("totalWins", (totalWins).toString())
        setTimeout(() => {
          setShowPopup(true);
        }, 3630);
      }
    }
  };

  const handlePopUpClick = (clickedAlias: string) => {
    setUserPredict((prevPredict) => ({
      ...prevPredict,
      isClicked: true,
      isCorrect: clickedAlias === todayCharacter?.alias,
    }));
  };

  const handleShowBank = () => {
    setShowBank(!showBank);
  };

  const handleCancelClick = () => {
    setShowPopup(false); 
  };

  if (characters.length < 1) return <div>Loading...</div>;

  return (
    <>
      <aside
        className={`${
          showBank ? "lg:block" : "hidden"
        } fixed top-0 right-0 z-40 justify-end lg:w-[22vw] max-lg:hidden h-screen overflow-y-scroll`}
      >
        <HeroBank showPopUp={showPopup} />
      </aside>
      <section
        className={`flex flex-col gap-5 items-center ${
          showPopup ? "blur-sm" : ""
        }`}
      >
        <Navbar />
        {!isWin && (
          <ClassicInput
            characters={characters}
            onDataFromChild={handleChildData}
          />
        )}
        <div>{t`Total Wins`} : {totalWins}</div>
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

        
        <div className="flex flex-col gap-5 mb-16 mx-24">
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
        <div
          className={`text-4xl text-white mb-5 ${showPopup ? "blur-sm" : ""}`}
        >
          Heroes
        </div>
        <HeroBank showPopUp={showPopup} />
      </div>
      {showPopup && (
        <div
          id="info-popup"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg h-auto md:h-auto"
        >
          <div className="relative rounded-lg bg-[#B88851] p-5">
            <div className="flex gap-3 justify-center items-center">
              <h3 className="text-2xl font-bold text-[#E8DCA4]">
                {todayCharacter.name} Alias(2x point if correct)
              </h3>
              {userPredict.isClicked && <MdCancel onClick={handleCancelClick} className="text-3xl cursor-pointer" />}
              
            </div>
            <div className="user-guess-alias flex flex-col gap-2 mt-4">
              {!userPredict.isClicked &&
                aliasOptions.map((hero, index) => (
                  <div
                    key={index}
                    id={hero.alias}
                    className={`border-2 py-3 cursor-pointer border-[#D8C088] hover:bg-[#C8A46D] hover:border-white hover:text-white transition-all duration-300 ease-in-out text-[#E8DCA4]`}
                    onClick={() => handlePopUpClick(hero.alias)}
                  >
                    {hero.alias}
                  </div>
                ))}
              {userPredict.isClicked && (
                <div className="text-[#E8DCA4] flex items-center justify-center gap-2">
                  {userPredict.isCorrect === true ? (
                    <>
                      <TiTick className="text-4xl text-green-300"/>
                      <p className="text-green-300 text-xl">Correct</p>
                    </>
                  ) : (
                    <>
                      <IoClose  className="text-4xl text-rose-200"/>
                      <p className="text-rose-200 text-xl">False</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
