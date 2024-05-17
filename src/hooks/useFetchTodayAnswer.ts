import { useEffect, useState, useContext } from 'react';
import { useMobileLegendsCharacters } from '../providers/MobileLegendsCharactersProvider';
import { MobileLegendsHero } from '../types/MobileLegendsHero';

const useFetchTodayAnswer = (gamemode) => {
    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    const [todayCharacter, setTodayCharacter] = useState<MobileLegendsHero>();

    useEffect(() => {

        
        if (!isLoading && characters.length > 0) {
            const today = new Date();
            const date = today.getDate() + 5;
            const month = today.getMonth() + 5;
            const year = today.getFullYear() + 5;
            
            if(gamemode.toUpperCase() === "CLASSIC"){

                const todayIndex = (date * month * year * 5) % characters.length;
                setTodayCharacter(characters[todayIndex]);

                console.log("today's classic answer: ", characters[todayIndex].name)
            
            }

            if(gamemode.toUpperCase() === "BLUR"){

                const todayIndex = (date * month * year * 23) % characters.length;
                setTodayCharacter(characters[todayIndex]);

                console.log("today's blur answer: ", characters[todayIndex].name)
            
            }
            
        }

        
    }, [gamemode, characters, isLoading]); 

    return todayCharacter;
};

export default useFetchTodayAnswer;
