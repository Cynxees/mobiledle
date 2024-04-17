import { GoPaperAirplane } from "react-icons/go";
import { MobileLegendsCharacter } from '../../API';
import { useState } from "react";

interface ClassicSearchBarProps {
  characters: MobileLegendsCharacter[];
  onDataFromChild: (data: MobileLegendsCharacter) => void;
}

export default function ClassicInput({ characters, onDataFromChild }: ClassicSearchBarProps) {
  const [prefix, setPrefix] = useState("");
  const [suggestions, setSuggestions] = useState<MobileLegendsCharacter[]>([]);

  const findCharacterBasedOnName =  (name : String) => {

    const foundCharacter = characters.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (foundCharacter) {
      onDataFromChild(foundCharacter);
    } else {
      // Handle case when character is not found
      console.log(`Character with name ${name} not found.`);
    }

  }

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    var value = e.currentTarget.value;

    setPrefix(value);
    
    value = value.toLowerCase()
    
    const newSuggestions = characters
      .filter((c) => c.name.toLowerCase().startsWith(value))
      .map((c) => c);

    if (newSuggestions.length == characters.length) {
      setSuggestions([]);
    } else {
      setSuggestions(newSuggestions);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      findCharacterBasedOnName(suggestions[0].name);
      setPrefix("")
      setSuggestions([])
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrefix(suggestion);
    findCharacterBasedOnName(suggestion);
    setSuggestions([])
  };


  return (
    <>
      <div className="flex items-center gap-4 bg-[#B88851] rounded-md px-3 w-96">
        <div className="relative w-full">
          <input
            type="text"
            className="my-2 h-10 pl-3 w-full rounded-md outline-none"
            id="search-bar-classic"
            autoComplete="off"
            placeholder="Heroes"
            value={prefix}
            onChange={onInput}
            onKeyPress={handleKeyPress}
          />
          <div className="absolute top-12 w-full">
            {suggestions.map((item: MobileLegendsCharacter) => (
              <li
                key="item"
                className="bg-[#3b3b3b] w-full list-none py-2 border-white border text-[#e8dca4] cursor-pointer"
                onClick={() => handleSuggestionClick(item.name)}
              >
                <img src={item.imageUrl} alt="" />
                {item.name}
              </li>
            ))}
          </div>
        </div>

        <GoPaperAirplane className="text-4xl cursor-pointer" />
      </div>
    </>
  );
}
