import { GoPaperAirplane } from "react-icons/go";
import { MobileLegendsCharacter } from "../../types/MobileLegendsCharacter";
import { useState } from "react";

interface ClassicSearchBarProps {
  characters: MobileLegendsCharacter[];
}

export default function ClassicInput({ characters }: ClassicSearchBarProps) {
  const [prefix, setPrefix] = useState("");
  const [suggestions, setSuggestions] = useState<String[]>([]);

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    var value = e.currentTarget.value;

    setPrefix(value);

    const newSuggestions = characters
      .filter((c) => c.name.toLowerCase().startsWith(value))
      .map((c) => c.name);

    if (newSuggestions.length == characters.length) {
      setSuggestions([]);
    } else {
      setSuggestions(newSuggestions);
    }
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
          />
          <div className="absolute top-12 w-full">
            {suggestions.map((item: String) => (
              <li
                key="item"
                className="bg-[#3b3b3b] w-full list-none py-2 border-white border text-[#e8dca4]"
              >
                {item}
              </li>
            ))}
          </div>
        </div>

        <GoPaperAirplane className="text-4xl cursor-pointer" />
      </div>
    </>
  );
}
