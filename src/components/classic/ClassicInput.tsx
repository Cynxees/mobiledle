import { GoArrowDownRight, GoArrowRight, GoPaperAirplane } from "react-icons/go";
import { MobileLegendsCharacter } from "../../API";
import { useState } from "react";

interface ClassicSearchBarProps {
  characters: MobileLegendsCharacter[];
  onDataFromChild: (data: MobileLegendsCharacter) => void;
  userAnswers: MobileLegendsCharacter[];
}

export default function ClassicInput({
  characters,
  onDataFromChild,
  userAnswers
}: ClassicSearchBarProps) {
  const [prefix, setPrefix] = useState("");
  const [suggestions, setSuggestions] = useState<MobileLegendsCharacter[]>([]);

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
    setPrefix(suggestion);
    findCharacterBasedOnName(suggestion);
    setSuggestions([]);
  };

  return (
    <>
      <div className="flex items-center gap-4 bg-gradient-to-tr from-[#dccd8c] to-[#caa172] rounded-md ps-2 pr-3 md:w-96 w-full">
        <div className="relative w-full">
          <input
            type="text"
            className="my-2 md:h-10 h-14 pl-3 w-full rounded-md outline-none bg-[#0b1e34] text-gray-100"
            id="search-bar-classic"
            autoComplete="off"
            placeholder="Heroes"
            value={prefix}
            onChange={onInput}
            onKeyPress={handleKeyPress}
          />
          <div className={`${suggestions.length<4 ? "" : "overflow-y-scroll" } absolute top-12 w-full z-20 max-h-52`}>
            {suggestions.map((item: MobileLegendsCharacter) => (
              <li
                key={item.id}
                className="bg-[#caa172] w-full list-none py-2 border-t-[1px] border-t-gray-700 text-[#e8dca4] cursor-pointer"
                onClick={() => handleSuggestionClick(item.name)}
              >
                <div className="flex items-center px-2 gap-3">
                  <img
                    src={item.imageUrl[0] || undefined}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.src="/noPicture.png";
                      currentTarget.onerror = null
                    }}
                    className="max-w-10 max-h-10"
                  />
                  <div className="">{item.name}</div>
                </div>
              </li>
            ))}
          </div>
        </div>

        <GoArrowRight size="30px" color="" className="text-4xl cursor-pointer font-extrabold" />
      </div>
    </>
  );
}
