import { MobileLegendsCharacter } from "../API";

interface ClassicSearchBarProps {
  character: MobileLegendsCharacter;
  todayCharacter: MobileLegendsCharacter | undefined;
}

export default function HeroShowBar({
  character,
  todayCharacter,
}: ClassicSearchBarProps) {
  // const formattedRole = character.role.replace("/", " ");

  return (
    <div className="flex gap-2">
      <div className="py-4 w-20 h-20 bg-green-500 border-white border-2 overflow-hidden flex justify-center items-center">
        <img src={character.imageUrl} alt="" />
      </div>
      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center ${
          character.gender === todayCharacter?.gender
            ? "bg-green-500"
            : "bg-red-400"
        }`}
      >
        {character.gender}
      </div>
      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center ${
          character.role === todayCharacter?.role
            ? "bg-green-500"
            : character?.role?.includes(todayCharacter?.role || "")
              ? "bg-yellow-400" // Apply yellow if character's role is a subset of todayCharacter's role
              : "bg-red-400"
        }`}
      >
        {character.role?.replace("/", " , ")}
      </div>
      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center ${
          character.lane === todayCharacter?.lane
            ? "bg-green-500"
            : character?.lane?.includes(todayCharacter?.lane || "")
              ? "bg-yellow-400" // Apply yellow if character's lane is a subset of todayCharacter's lane
              : "bg-red-400"
        }`}
      >
        {character.lane?.replace("/", " , ")}
      </div>

      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center ${
          character.region === todayCharacter?.region
            ? "bg-green-500"
            : "bg-red-400"
        }`}
      >
        {character.region}
      </div>
      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center ${
          character.year === todayCharacter?.year
            ? "bg-green-500"
            : "bg-red-400"
        }`}
      >
        {character.year}
      </div>
    </div>
  );
}
