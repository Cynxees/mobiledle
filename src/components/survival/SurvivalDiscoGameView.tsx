import { useState } from "react";
import HeroSearchBar from "../classic/HeroSearchBar";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";
import ClassicGameView from "./SurvivalClassicGameView";
import ClassicTableTitle from "../classic/ClassicTableTitle";
import HeroShowBar from "../classic/HeroShowBar";
import CachedImage from "../CachedImage";


interface SurvivalGameViewInput {

    characters: MobileLegendsHero[],
    answer: MobileLegendsHero,
    seed: number,
    handleUserGuess: () => void,
    handleUserCorrect: () => void
}


export default function SurvivalDiscoGameView( {characters, answer, seed, handleUserGuess, handleUserCorrect} : SurvivalGameViewInput ) {

    const [userAnswers, setUserAnswers] = useState<MobileLegendsHero[]>([])

    const handleChildData = (dataFromChild: MobileLegendsHero) => {
        if (dataFromChild != null) {
          setUserAnswers((prevAnswers) => [...prevAnswers, dataFromChild]);
          if (dataFromChild.id === answer.id) {
            setUserAnswers([])
            handleUserCorrect()
          }else{

            handleUserGuess()

          }
        }
    };

    return <div className="flex flex-col gap-5">


            <div className="flex justify-center select-none" style={{filter: `blur(0px)`}}>
                <CachedImage className='' style={{filter: `blur(${2-userAnswers.length}px) saturate(${((userAnswers.length*0.05))})`}} imgKey={answer.imageKeys.skills[(seed)%answer.imageKeys.skills.length]} />
                
                {userAnswers.length >= 2 ? 
                
                  <CachedImage className='' style={{filter: `blur(${2-(userAnswers.length-2)}px) saturate(${(((userAnswers.length-2)*0.05))})`}} imgKey={answer.imageKeys.skills[(seed+1)%answer.imageKeys.skills.length]} />
                  :<div className="relative">
                    <div className="text-[2.5rem] text-orange-200 font-nova-bold absolute z-10 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
                      {2-userAnswers.length}
                    </div>
                    <CachedImage className='w-24 h-24' style={{filter: `blur(5px) saturate(0.05)`}} imgKey={answer.imageKeys.skills[(seed+1)%answer.imageKeys.skills.length]} />
                  </div>
                }
                

                {userAnswers.length >= 4 ? 
                
                <CachedImage className='' style={{filter: `blur(${2-(userAnswers.length-4)}px) saturate(${(((userAnswers.length-4)*0.05))})`}} imgKey={answer.imageKeys.skills[(seed+2)%answer.imageKeys.skills.length]} />
                :<div className={`relative ${userAnswers.length<2 ? 'hidden': ''}`}>
                  <div className="text-[2.5rem] text-orange-200 font-nova-bold absolute z-10 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
                    {4-userAnswers.length}
                  </div>
                  <CachedImage className='w-24 h-24' style={{filter: `blur(5px) saturate(0.05)`}} imgKey={answer.imageKeys.skills[(seed+2)%answer.imageKeys.skills.length]} />
                </div>
                }

                {userAnswers.length >= 6 ?
                
                <CachedImage className='' style={{filter: `blur(${2-(userAnswers.length-6)}px) saturate(${(((userAnswers.length-6)*0.05))})`}} imgKey={answer.imageKeys.skills[(seed+3)%answer.imageKeys.skills.length]} />
                :<div className={`relative ${userAnswers.length<4 ? 'hidden': ''}`}>
                  <div className="text-[2.5rem] text-orange-200 font-nova-bold absolute z-10 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
                    {6-userAnswers.length}
                  </div>
                  <CachedImage className='w-24 h-24' style={{filter: `blur(5px) saturate(0.05)`}} imgKey={answer.imageKeys.skills[(seed+3)%answer.imageKeys.skills.length]} />
                </div>
                }

                
                
                
            </div>

        <HeroSearchBar
            characters={characters}
            onDataFromChild={handleChildData}
            userAnswers = {userAnswers}
        />

        <div className="flex gap-2 flex-wrap w-[90vw] md:w-[50vw] align-middle justify-center">
            {userAnswers.map((character, index) => (
            <div key={index} className="relative" style={{ order: userAnswers.length - index }}>

                {character.id == answer.id ?
                
                
                <div className="absolute z-10 opacity-30 animate__animated animate__zoomInRight bg-green-500 w-full md:h-28 xs:h-14 h-12">

                </div>
                :
                
                <div className="absolute z-10 opacity-30 animate__animated animate__zoomInRight bg-red-600 w-full md:h-28 xs:h-14 h-12">

                </div>
                
                }
                <HeroShowBar
                character={character}
                answer={answer}
                isClassic={false}
                />
            </div>
            ))}
                
        </div>

    </div>


}