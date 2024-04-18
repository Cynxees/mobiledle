import { useState, useEffect } from "react";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MobileLegendsCharacter } from "../../API";
import useFetchMobileLegendsCharacters from "../../hooks/useFetchMobileLegendsCharacters";
import CharacterIcon from "../icons/CharacterIcon";



export default function HeroBank() {

    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const characterData = await useFetchMobileLegendsCharacters();
        setCharacters(characterData)

      }

      fetchData();


    })



    return(


        <div className="flex flex-row flex-wrap w-full flex-grow-0 flex-shrink-0 gap-5  items-center justify-center">
            
            {characters.map((item : MobileLegendsCharacter) => {
                    

                return(
                    <CharacterIcon character={item} />
                )
            })}
        </div>

    )





}