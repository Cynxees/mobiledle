import { useEffect, useState } from "react";
import ColorIndicator from "../components/ColorIndicator";
import HeroShowBar from "../components/HeroShowBar";
import Navbar from "../components/Navbar";
import ClassicInput from "../components/classic/ClassicInput";
import { MobileLegendsCharacter } from "../API";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import ClassicSearchBar from "../components/ClassicSearchBar";
import ClassicTableTitle from "../components/classic/ClassicTableTitle";
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";

export default function ClassicPage() {
  const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);

  const [userAnswers, setUserAnswers] = useState<MobileLegendsCharacter[]>([]);

  const [todayCharacter, setTodayCharacter] = useState<
    MobileLegendsCharacter | undefined
  >(undefined);

  useEffect(() => {
    const getCharacters = async () => {
      const characterData = await useFetchMobileLegendsCharacters();
      setCharacters(characterData);
    };

    const getTodayCharacter = async () => {
      const result = await useFetchTodayAnswer("CLASSIC");
      setTodayCharacter(result);
    };

    getCharacters();
    getTodayCharacter();
  }, []);

  const handleChildData = (dataFromChild: MobileLegendsCharacter) => {
    if (dataFromChild != null) {
      setUserAnswers((prevAnswers) => [...prevAnswers, dataFromChild]);
    }
  };

  return (
    <section className="flex flex-col gap-10 items-center">
      <Navbar />
      <ClassicInput
        characters={characters}
        onDataFromChild={handleChildData}
      ></ClassicInput>
      <ClassicTableTitle />
      {userAnswers
        ?.slice()
        .reverse()
        .map((character, index) => (
          <HeroShowBar key={index} character={character} todayCharacter={todayCharacter}/>
        ))}
      <ColorIndicator />
    </section>
  );
}
