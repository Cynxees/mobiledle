import React, { useEffect, useState } from "react";
import ColorIndicator from "../components/ColorIndicator";
import HeroShowBar from "../components/HeroShowBar";
import Navbar from "../components/Navbar";
import ClassicInput from "../components/classic/ClassicInput";
import { MobileLegendsCharacter } from "../API";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import ClassicSearchBar from "../components/ClassicSearchBar";
import ClassicTableTitle from "../components/classic/ClassicTableTitle";
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import HeroBank from "../components/classic/HeroBank";
import { MdCancel } from "react-icons/md";

export default function ClassicPage() {
  const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);
  const [userAnswers, setUserAnswers] = useState<MobileLegendsCharacter[]>([]);
  const [todayCharacter, setTodayCharacter] = useState<
    MobileLegendsCharacter | undefined
  >(undefined);
  const [showPopup, setShowPopup] = useState(false); // State for showing/hiding popup

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
        setTimeout(() => {
          setShowPopup(true);
        }, 3650);
      }
    }
  };

  const handlePopupToggle = () => {
    setShowPopup((prev) => !prev);
  };

  const handleCancelClick = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      <aside className="fixed top-0 right-0 z-40 hidden md:block md:w-60 lg:w-96 h-screen transition-transform -translate-x-full sm:translate-x-0 overflow-y-scroll">
        <HeroBank />
      </aside>
      <section
        className={`flex flex-col gap-10 items-center ${
          showPopup ? "blur-sm" : ""
        }`}
      >
        <Navbar />
        <ClassicInput
          characters={characters}
          onDataFromChild={handleChildData}
        />
        <ClassicTableTitle />
        <div className="flex flex-col gap-5">
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
      <div className="flex flex-col md:hidden align-middle mx-auto">

          <div className="text-4xl text-white mb-5">Heroes</div>
          <HeroBank/>
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
              <MdCancel onClick={handleCancelClick} className="text-3xl"/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
