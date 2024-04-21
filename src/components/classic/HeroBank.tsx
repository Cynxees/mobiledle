import { MobileLegendsCharacter } from "../../API";
import CharacterIcon from "../icons/CharacterIcon";
import { useMobileLegendsCharacters } from "../../contexts/MobileLegendsCharactersContext";


export default function HeroBank() {

    const {characters, isLoading} = useMobileLegendsCharacters();

    return(


        <div className={`flex flex-row flex-wrap w-full  flex-shrink-0 gap-5  items-center justify-center `}>
            
            {characters.map((item : MobileLegendsCharacter) => {
                    

                return(
                    <CharacterIcon character={item} key={item.id}/>
                )
            })}
        </div>

    )





}