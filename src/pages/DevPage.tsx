import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../types/MobileLegendsCharacter";

export default function DevPage(){



    var characterArray : Array<MobileLegendsCharacter> = useFetchMobileLegendsCharacters("chris")


    
    return (


        <div>

            <h1>Dev Page</h1>


            {characterArray.map((item : MobileLegendsCharacter) => {
                return <li>{item.name}</li>
            })}


        </div>
        

    )

}