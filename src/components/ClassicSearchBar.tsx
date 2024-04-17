import { useEffect, useState } from "react";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MobileLegendsCharacter } from '../API';
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";



export default function ClassicSearchBar() {
  
    const [prefix, setPrefix] = useState("")
    const [suggestions, setSuggestions] = useState<String[]>([])
  
    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);


    useEffect(() => {
        const getCharacters = async () => {
            const characterData = await useFetchMobileLegendsCharacters();
            setCharacters(characterData);
        };

        getCharacters();
    }, []);

    const onInput = (e : React.FormEvent<HTMLInputElement>) =>{
        
        var value = e.currentTarget.value;

        setPrefix(value);

        


        const newSuggestions = characters.filter(c => c.name.toLowerCase().startsWith(value)).map(c => c.name);
        
        if(newSuggestions.length == characters.length){
            
            setSuggestions([])
        }else{
            
            setSuggestions(newSuggestions);
        }




    }

    


    return (
    
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="text" 
                    id="search-bar" 
                    autoComplete="off"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Heroes" 
                    value = {prefix}
                    onChange = {onInput}
                />

                <div className="absolute w-full">
                {suggestions.map((item : String) => (
                    <li key="item" className="bg-gray-600 w-full list-none py-2 border-gray-400 border">{item}</li>
                ))}
                </div>
            </div>
  );
}
