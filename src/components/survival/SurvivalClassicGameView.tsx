import { useState } from "react";
import HeroSearchBar from "../../components/classic/HeroSearchBar";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";
import ClassicGameView from "./SurvivalClassicGameView";
import ClassicTableTitle from "../../components/classic/ClassicTableTitle";
import HeroShowBar from "../../components/classic/HeroShowBar";


interface SurvivalGameViewInput {

    characters: MobileLegendsHero[],
    answer: MobileLegendsHero,
    handleUserGuess: () => void,
    handleUserCorrect: () => void
}


export default function SurvivalClassicGameView( {characters, answer, handleUserGuess, handleUserCorrect} : SurvivalGameViewInput ) {

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


        <HeroSearchBar
            characters={characters}
            onDataFromChild={handleChildData}
            userAnswers = {userAnswers}
        />

        <ClassicTableTitle />
            {userAnswers.map((character, index) => (
                <div key={index} className="" style={{ order: userAnswers.length - index }}>
                    <HeroShowBar
                    character={character}
                    answer={answer}
                    />
            </div>
        ))}

    </div>


}