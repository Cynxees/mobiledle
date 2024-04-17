import { useEffect, useState } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../types/MobileLegendsCharacter";


export default function DevPage(){



    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);


    useEffect(() => {
        const getCharacters = async () => {
            const characterData = await useFetchMobileLegendsCharacters("bodoh");
            setCharacters(characterData);
        };

        getCharacters();
    }, []);
    
    return (


        <div>

            <h1>Dev Page</h1>


            {characters.map((item : MobileLegendsCharacter) => {
                return <li key="{item.id}">{item.name}</li>
            })}


        </div>
        

    )

}
