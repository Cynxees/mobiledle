import { GoArrowDownRight, GoArrowRight, GoPaperAirplane } from "react-icons/go";
import { useState } from "react";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import CachedImage from "../CachedImage";
import "../../index.css"

interface HeroSearchBarProps {
  characters: MobileLegendsHero[];
  onDataFromChild: (data: MobileLegendsHero) => void;
  userAnswers: MobileLegendsHero[];
}

export default function HeroSearchBar({
  characters,
  onDataFromChild,
  userAnswers
}: HeroSearchBarProps) {
  const [prefix, setPrefix] = useState("");
  const [suggestions, setSuggestions] = useState<MobileLegendsHero[]>([]);

  const findCharacterBasedOnName = (name: string) => {
    const foundCharacter = characters.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (foundCharacter) {
      onDataFromChild(foundCharacter);
    } else {
      // Handle case when character is not found
      console.log(`Character with name ${name} not found.`);
    }
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;

    setPrefix(value);

    value = value.toLowerCase();

    const newSuggestions = characters
      .filter((c) => c.name.toLowerCase().startsWith(value))
      .map((c) => c);

    if (newSuggestions.length == characters.length || newSuggestions.length < 1) {
      setSuggestions([]);
    } else {

      let tempArray = newSuggestions

      userAnswers.map(c => {

        newSuggestions.map(sug => {
          if(c.id == sug.id) tempArray = tempArray.filter(temp =>
            temp.id != sug.id
          )
        })

      })

      setSuggestions(tempArray);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      findCharacterBasedOnName(suggestions[0].name);
      setPrefix("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrefix("");
    findCharacterBasedOnName(suggestion);
    setSuggestions([]);
  };

  return (
  
    <div className="flex items-center gap-2 relative bg-gradient-to-r from-[#ffea8f] to-[#ffac4d] rounded-md rounded-b-none md:w-[600px] w-full">
      <div className="relative w-full ps-2">
        <input
          type="text"
          className="my-2 md:h-16 h-14 pl-3 w-full rounded-md outline-none bg-[#0b1e34] text-3xl ps-6 text-gray-100"
          id="search-bar-classic"
          autoComplete="off"
          placeholder="Heroes"
          value={prefix}
          onChange={onInput}
          onKeyPress={handleKeyPress}
        />
        
      </div>
      <div className={`${suggestions.length<4 ? "" : "overflow-y-scroll" } absolute top-20 w-full z-20 max-h-52 custom-scrollbar `}>
          {suggestions.map((item: MobileLegendsHero) => (
            <li
              key={item.id}
              className="bg-[#06081b] w-full list-none py-2 rounded-t-none border-b-[2px] border-b-yellow-600 text-[#e8dca4] cursor-pointer"
              onClick={() => handleSuggestionClick(item.name)}
            >
              <div className="flex items-center px-6 py-2 gap-3">
                <CachedImage
                  imgKey={item.imageKeys.icons[0]}
                  className="max-w-16 max-h-16"
                />
                
                <div className="text-2xl ms-2">{item.name}</div>
              </div>
            </li>
          ))}
        </div>
      <GoArrowRight size="50px" color="" className="text-4xl  cursor-pointer font-extrabold mr-4" />
    </div>
  
  );
}
