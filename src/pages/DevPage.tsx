import { useEffect, useState } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from '../API';
import ClassicSearchBar from "../components/ClassicSearchBar"

export default function DevPage(){



    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);


    useEffect(() => {
        const getCharacters = async () => {
            const characterData = await useFetchMobileLegendsCharacters();
            setCharacters(characterData);
        };

        getCharacters();
    }, []);
    
    return (


        <div>

            <h1>Dev Page</h1>


            <ClassicSearchBar />


            <ul className="list-item text-left">
                
                {characters.map((item : MobileLegendsCharacter) => {
                    return <li key="{item.id}">{item.id}: {item.name}, {item.alias}</li>
                })}
            </ul>


        </div>
        

    )

}
