import { useState, useEffect } from "react";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MobileLegendsCharacter } from "../../API";
import useFetchMobileLegendsCharacters from "../../hooks/useFetchMobileLegendsCharacters";
import CharacterIcon from "../icons/CharacterIcon";

interface HeroBankModel {
    showPopUp: boolean
  }

export default function HeroBank({ showPopUp } : HeroBankModel) {

    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const characterData = await useFetchMobileLegendsCharacters();
        setCharacters(characterData)

      }

      fetchData();


    })



    return(


        <div className={`flex flex-row flex-wrap w-full  flex-shrink-0 gap-5  items-center justify-center ${showPopUp ? "blur-sm" : ""}`}>
            
            {characters.map((item : MobileLegendsCharacter) => {
                    

                return(
                    <CharacterIcon character={item} />
                )
            })}
        </div>

    )





}