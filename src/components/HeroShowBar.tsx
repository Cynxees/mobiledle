import { MobileLegendsCharacter } from "../API";

interface ClassicSearchBarProps {
  character: MobileLegendsCharacter;
  todayCharacter: MobileLegendsCharacter | undefined;
}

export default function HeroShowBar({
  character,
  todayCharacter,
}: ClassicSearchBarProps) {

  var wrongColor = "bg-red-700 text-shadow shadow-black"
  var partialColor = "bg-orange-600 text-shadow shadow-black"
  var correctColor = "bg-green-600 text-shadow shadow-black"

  
  

  return (
    <div className="flex gap-2 z-0 font-nova-bold text-shadow-lg">
      <div className="py-4 w-20 h-20 border-white border-2 bg-white overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight">
        <img src={character.imageUrl || undefined} alt="" onError={({ currentTarget }) => {
                    currentTarget.src="/noPicture.png";
                    currentTarget.onerror = null
                }}/>
      </div>
      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-1s ${
          character.gender === todayCharacter?.gender
            ? correctColor
            : wrongColor
        } `}
      >
        {character.gender}
      </div>
      <div
        className={`py-4 w-20 h-20 font-extrabold border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-2s ${
          character.role === todayCharacter?.role
            ? correctColor
            : character?.role?.includes(todayCharacter?.role || "")
              ? partialColor
              : wrongColor
        }`}
      >
        {character.role?.replace("/", " , ")}
      </div>
      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-3s ${
          character.lane === todayCharacter?.lane
            ? correctColor
            : character?.lane?.includes(todayCharacter?.lane || "")
              ? partialColor
              : wrongColor
        }`}
      >
        {character.lane?.replace("/", " , ")}
      </div>

      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-4s ${
          character.region === todayCharacter?.region
            ? correctColor
            : wrongColor
        }`}
      >
        {character.region}
      </div>
      <div
        className={`py-4 w-20 h-20 border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-5s ${
          character.year === todayCharacter?.year
            ? correctColor
            : wrongColor
        }`}
      >
        {character.year}
      </div>
    </div>
  );
}
