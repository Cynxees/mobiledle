import { useState } from "react";
import HeroSearchBar from "../classic/HeroSearchBar";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";
import ClassicGameView from "./SurvivalClassicGameView";
import ClassicTableTitle from "../classic/ClassicTableTitle";
import HeroShowBar from "../classic/HeroShowBar";
import CachedImage from "../../components/CachedImage";


interface SurvivalGameViewInput {

    characters: MobileLegendsHero[],
    answer: MobileLegendsHero,
    seed: number,
    handleUserGuess: () => void,
    handleUserCorrect: () => void
}


export default function SurvivalBlurGameView( {characters, answer, seed, handleUserGuess, handleUserCorrect} : SurvivalGameViewInput ) {

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


        <div className="w-96 h-96 flex justify-center mx-auto" style={{filter: `blur(0px)`}}>
            <CachedImage style={{filter: `blur(${13-userAnswers.length}px) saturate(${((userAnswers.length*0.05))})`}} className='' 
            imgKey={answer.imageKeys.cards[Math.floor(seed%answer.imageKeys.cards.length)]} />
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