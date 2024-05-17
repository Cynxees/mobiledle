import CharacterIcon from "../icons/CharacterIcon";
import { useMobileLegendsCharacters } from "../../providers/MobileLegendsCharactersProvider";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";


export default function HeroBank() {

    const { data: characters, isLoading, error } = useMobileLegendsCharacters();

    return(


        <div className={`flex flex-row flex-wrap w-full flex-shrink-0 gap-2 sm:gap-5  items-center justify-center `}>
            
            {characters.map((item : MobileLegendsHero) => {
                    

                return(
                    <CharacterIcon character={item} key={item.id}/>
                )
            })}
        </div>

    )





}