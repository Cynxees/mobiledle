import { useEffect, useState } from "react";
import ColorIndicator from "../components/ColorIndicator";
import HeroShowBar from "../components/HeroShowBar";
import Navbar from "../components/Navbar";
import ClassicInput from "../components/classic/ClassicInput";
import { MobileLegendsCharacter } from "../types/MobileLegendsCharacter";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import ClassicSearchBar from "../components/ClassicSearchBar";

export default function ClassicPage() {
  const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      const characterData = await useFetchMobileLegendsCharacters();
      setCharacters(characterData);
    };

    getCharacters();
  }, []);

  console.log(characters[0])

  return (
    <section className="flex flex-col gap-10 items-center">
      <Navbar />
      <ClassicInput characters={characters}></ClassicInput>
      <HeroShowBar character={characters[0]}/>
      <ColorIndicator />
    </section>
  );
}
