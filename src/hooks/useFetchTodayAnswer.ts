import { MobileLegendsCharacter } from '../API';
import useFetchMobileLegendsCharacters from './useFetchMobileLegendsCharacters';

const useFetchTodayAnswer = async (gamemode : String) => {
  

    if(gamemode.toUpperCase() == "CLASSIC"){

        const characterData = await useFetchMobileLegendsCharacters();
    
        const today = new Date();
    
        const date = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
    
        const todayIndex = (date*month*year)%characterData.length 
        return characterData[todayIndex]
    }
    

    
    

};

export default useFetchTodayAnswer;
