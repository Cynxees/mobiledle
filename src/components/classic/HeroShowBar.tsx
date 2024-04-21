import { useTranslation } from "react-i18next";
import { MobileLegendsCharacter } from "../../API";

interface ClassicSearchBarProps {
  character: MobileLegendsCharacter;
  todayCharacter: MobileLegendsCharacter | undefined;
}

export default function HeroShowBar({
  character,
  todayCharacter,
}: ClassicSearchBarProps) {
  const { t } = useTranslation();

  const wrongColor = "bg-red-700 text-shadow shadow-gray-700 w-28 h-28"
  const partialColor = "bg-orange-600 text-shadow shadow-gray-700 w-28 h-28"
  const correctColor = "bg-green-600 text-shadow shadow-gray-700 w-28 h-28"

  if(!todayCharacter) return

  const characterLanes = character.lane.split('/')
  const todayCharacterLanes = todayCharacter.lane.split('/')
  let laneIsPartial = false

  characterLanes.forEach(lane => {
    

    todayCharacterLanes.forEach(todayLane => {


      
      if(lane == todayLane){

        laneIsPartial = true
        
      }

    })
  
  })

  

  return (
    <div className="flex gap-2 z-0 font-nova-bold text-shadow-lg h-full w-full">
      
      <div className="absolute w-28 h-28 overflow-hidden animate__animated animate__zoomInRight">
      <img className="absolute z-0 w-52 h-52 object-fill opacity-80 top-0 -translate-y-1/4 blur-[9px]" src={character.imageUrl[0] || undefined} alt="" onError={({ currentTarget }) => {
                    currentTarget.src="/noPicture.png";
                    currentTarget.onerror = null
              }}/>
      </div>
      <div className="py-4 w-28 h-28 border-2 border-white overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight">
      
        <img className="z-10" src={character.imageUrl[0] || undefined} alt="" onError={({ currentTarget }) => {
                    currentTarget.src="/noPicture.png";
                    currentTarget.onerror = null
                }}/>
      </div>
      <div
        className={`py-4  border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-1s bg-[url('/classic-bg.png')] bg-blend-multiply ${
          character.gender === todayCharacter?.gender
            ? correctColor
            : wrongColor
        } `}
      >
      {character.gender === "Male" ? t("Male") : t("Female")}

      </div>
      <div
        className={`py-4  font-extrabold border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-2s ${
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
        className={`py-4 border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-3s ${
          todayCharacterLanes.sort((a,b) => a>b ? 1 : -1).every(e => characterLanes.includes(e) )
            ? correctColor
            : laneIsPartial
              ? partialColor
              : wrongColor
        }`}
      >
        {character.lane?.replace("/", " , ")}
      </div>

      <div
        className={`py-4  border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-4s ${
          character.region === todayCharacter?.region
            ? correctColor
            : wrongColor
        }`}
      >
        {t(`${character.region}`)}
      </div>
      <div
        className={`py-4  border-white border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-5s ${
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
