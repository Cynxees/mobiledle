import { useEffect, useState, useContext } from 'react';
import { useMobileLegendsCharacters } from '../providers/MobileLegendsCharactersProvider';

const useFetchTodayAnswer = (gamemode) => {
    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    const [todayCharacter, setTodayCharacter] = useState(null);

    useEffect(() => {

        
        if (!isLoading && gamemode.toUpperCase() === "CLASSIC" && characters.length > 0) {
            const today = new Date();
            const date = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const todayIndex = (date * month * year) % characters.length;
            setTodayCharacter(characters[todayIndex]);

            console.log("today's answer: ", characters[todayIndex].name)
        }

        
    }, [gamemode, characters, isLoading]); 

    return todayCharacter;
};

export default useFetchTodayAnswer;
