import CachedImage from "../../components/CachedImage";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";
import BlurGameView from "./SurvivalBlurGameView";
import ClassicGameView from "./SurvivalClassicGameView";
import DiscoGameView from "./SurvivalDiscoGameView";


interface SurvivalGameAreaInput {

    characters: MobileLegendsHero[],
    mode: string,
    seed: number,
    answer: MobileLegendsHero,
    handleUserGuess: () => void,
    handleUserCorrect: () => void
}


export default function SurvivalGameArea( {characters, mode, seed, answer, handleUserGuess, handleUserCorrect} : SurvivalGameAreaInput ) {




    return <div>

        {mode == "CLASSIC" && <ClassicGameView answer={answer} characters={characters} handleUserCorrect={handleUserCorrect} handleUserGuess={handleUserGuess} />
        }

        {mode == "BLUR" && <BlurGameView answer={answer} seed={seed} characters={characters} handleUserCorrect={handleUserCorrect} handleUserGuess={handleUserGuess} />
        }

        {mode == "DISCO" && <DiscoGameView answer={answer} seed={seed} characters={characters} handleUserCorrect={handleUserCorrect} handleUserGuess={handleUserGuess} />
        }

        {mode == "END" && 
        
        <div>
            
            Thanks for Playing!

            <CachedImage imgKey={"data/61 - Chang'e/Extras/latest_5.png"}></CachedImage>


        </div>
        
        
        
        }


    </div>


}