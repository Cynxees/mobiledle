import { useEffect, useState } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from '../API';
import ClassicSearchBar from "../components/ClassicSearchBar"
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import useGetMobileLegendsCharacterImageURL from "../hooks/useGetMobileLegendsCharacterImageURL"

export default function DevPage(){



    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);

    const [todayCharacter, setTodayCharacter] = useState<MobileLegendsCharacter | undefined>(undefined);
    
    
    
    const [] = useState(useGetMobileLegendsCharacterImageURL(characters[0]))
    

    useEffect(() => {
        const getCharacters = async () => {
            const characterData = await useFetchMobileLegendsCharacters();
            setCharacters(characterData);
        };
        const getTodayCharacter = async () => {
            const result = await useFetchTodayAnswer("CLASSIC");
            setTodayCharacter(result)
        };
        

        getCharacters();
        getTodayCharacter();
    }, []);

    
    
    return (


        <div>

            <h1>Dev Page</h1>

            <h2>Today's Answer = {todayCharacter?.name}</h2>

            <ClassicSearchBar />


            <ul className="list-item text-left">
                
                {characters.map((item : MobileLegendsCharacter) => {




                    return <li key="{item.id}">
                         
                         {item.id}: {item.name}, {item.alias}
                         
                         </li>
                })}
            </ul>
            

        </div>
        

    )

}
