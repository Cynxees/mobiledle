import { useEffect, useState } from "react";
import ColorIndicator from "../components/ColorIndicator";
import HeroShowBar from "../components/HeroShowBar";
import Navbar from "../components/Navbar";
import ClassicInput from "../components/classic/ClassicInput";
import { MobileLegendsCharacter } from '../API';
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
      <section className="flex gap-2 w-full">
        <div className="border-b-2 pb-2 border-[#B88851] grow">Hero</div>
        <div className="border-b-2 pb-2 border-[#B88851] grow">Gender</div>
        <div className="border-b-2 pb-2 border-[#B88851] grow">Role</div>
        <div className="border-b-2 pb-2 border-[#B88851] grow">Lane</div>
        <div className="border-b-2 pb-2 border-[#B88851] grow">Region</div>
        <div className="border-b-2 pb-2 border-[#B88851] grow">Year</div>

      </section>
      <HeroShowBar character={characters[0]}/>
      <ColorIndicator />
    </section>
  );
}
