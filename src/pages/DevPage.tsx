import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../types/MobileLegendsCharacter";

import { list } from "aws-amplify/storage";


async function fetchData(){

    

    try {
        const result = await list({
          prefix: 'mobile'
        });
        console.log(result);
      } catch (error) {
        console.log("error: ",error);
    }


} 

export default function DevPage(){



    var characterArray : Array<MobileLegendsCharacter> = useFetchMobileLegendsCharacters("chris")
    fetchData()
    
    return (


        <div>

            <h1>Dev Page</h1>


            {characterArray.map((item : MobileLegendsCharacter) => {
                return <li>{item.name}</li>
            })}


        </div>
        

    )

}