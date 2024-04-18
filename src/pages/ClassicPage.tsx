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
import { MdCancel } from "react-icons/md";

export default function ClassicPage() {
  const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);
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

  const [isWin, setIsWin] = useState<boolean>(() => {
    const storedData = localStorage.getItem("isWin");
    return storedData === "true"; // Convert the string to boolean
  });

  const [aliasOptions, setAliasOptions] = useState<MobileLegendsCharacter[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const characterData = await useFetchMobileLegendsCharacters();
      setCharacters(characterData);

      const result = await useFetchTodayAnswer("CLASSIC");
      setTodayCharacter(result);
    };

    fetchData();
  }, []);

  const handleChildData = (dataFromChild: MobileLegendsCharacter) => {
    if (dataFromChild != null) {
      setUserAnswers((prevAnswers) => [...prevAnswers, dataFromChild]);

      console.log(dataFromChild, todayCharacter);

      // Check if dataFromChild matches todayCharacter
      if (dataFromChild.id === todayCharacter?.id) {
        setIsWin(true);
        localStorage.setItem("isWin", "true");
        setTimeout(() => {
          setShowPopup(true);
        }, 3650);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("isWin", "false");
    if (isWin) {
      localStorage.setItem("isWin", "true");
    }
    localStorage.setItem("savedDate", new Date().toLocaleDateString());
  }, [userAnswers, isWin]);

  useEffect(() => {
    // Check if the data was saved today
    const savedDate = localStorage.getItem("savedDate");
    const today = new Date().toLocaleDateString();
    if (savedDate !== today) {
      // Clear localStorage if it's a new day
      localStorage.removeItem("userAnswers");
      localStorage.removeItem("isWin");
      // Save the current date as the savedDate
      localStorage.setItem("savedDate", today);
    }
  }, []);

  const handleShowBank = () => {
    setShowBank(!showBank)
  }

  const handleCancelClick = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      <aside className={`${showBank ? "lg:block" : "hidden"} fixed top-0 right-0 z-40 justify-end   lg:w-[30vw] max-lg:hidden h-screen overflow-y-scroll`}>
        <HeroBank showPopUp={showPopup}/>
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

        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" onChange={handleShowBank} />
          <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Mythical IMMORTAL 😎 Mode</span>
        </label>

        <ClassicTableTitle />
        <div className="flex flex-col gap-5 mb-16">
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
          <div className="relative p-4 rounded-lg dark:bg-[#B88851]">
            <div className="flex gap-3 justify-center items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Congratulations
              </h3>
              <MdCancel onClick={handleCancelClick} className="text-3xl" />
            </div>
            <div className="user-guess-alias">
              <div className="user-guess-alias">
                {aliasOptions.map((hero, index) => (
                  <div key={index}>{hero.alias}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
