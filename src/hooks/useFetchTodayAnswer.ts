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

            const classicIndex = (date+2 * month+2 * year+2 * 5) % characters.length;

            let blurIndex = (date+2 * month+2 * year+2 * 25) % characters.length;

            if(blurIndex == classicIndex) blurIndex += 1

            let discoIndex = (date+2 * month+2 * year+2 * 55) % characters.length;
            if(discoIndex == classicIndex || discoIndex == blurIndex ) blurIndex += 1
            if(discoIndex == classicIndex || discoIndex == blurIndex ) blurIndex += 1
            
            if(gamemode.toUpperCase() === "CLASSIC"){

                setTodayCharacter(characters[classicIndex]);

                console.log("today's classic answer: ", characters[classicIndex].name)
            
            }

            if(gamemode.toUpperCase() === "BLUR"){

                const todayIndex = (date * month * year * 23) % characters.length;
                setTodayCharacter(characters[todayIndex]);

                console.log("today's blur answer: ", characters[todayIndex].name)
            
            }

            if(gamemode.toUpperCase() === "DISCO"){

                const todayIndex = (date * month * year * 55) % characters.length;
                setTodayCharacter(characters[todayIndex]);

                console.log("today's blur answer: ", characters[todayIndex].name)
            
            }
            
        }

        
    }, [gamemode, characters, isLoading]); 

    return todayCharacter;
};

export default useFetchTodayAnswer;
