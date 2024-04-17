import { MobileLegendsCharacter } from '../API';
import { listMobileLegendsCharacters } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";
import useFetchMobileLegendsCharacters from './useFetchMobileLegendsCharacters';
import { useState } from 'react';

const client = generateClient()


const useFetchTodayAnswer = async (gamemode : String) => {
  

    if(gamemode.toUpperCase() == "CLASSIC"){
        var characterResults : Array<MobileLegendsCharacter> = new Array<MobileLegendsCharacter>();

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
