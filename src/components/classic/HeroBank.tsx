import { MobileLegendsCharacter } from "../../API";
import CharacterIcon from "../icons/CharacterIcon";
import { useMobileLegendsCharacters } from "../../providers/MobileLegendsCharactersProvider";


export default function HeroBank() {

    const { data: characters, isLoading, error } = useMobileLegendsCharacters();

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