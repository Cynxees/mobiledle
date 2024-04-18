import { useEffect, useState } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../API";
import Draggable, {DraggableEvent, DraggableData} from 'react-draggable';


export default function SurvivalPage() {
    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);
    const [currentCharacter, setCurrentCharacter] = useState<MobileLegendsCharacter>();
    const [score, setScore] = useState(0);
    const [correctPrompt, setCorrectPrompt] = useState("")
    const [incorrectPrompt, setIncorrectPrompt] = useState("")
    const [characterRotation, setCharactersRotation] = useState(0)


    function startRound(){

        // let random = Math.random()*100%characters.length

        let random = 0

        setCurrentCharacter(characters[random])
        
        console.log(random)

    }

    useEffect(() => {
        const fetchData = async () => {
            const characterData = await useFetchMobileLegendsCharacters().then( c=> {

                console.log("setting characters")
                setCharacters(c)
                setCurrentCharacter(c[0])
                startRound()
            }

            );
            
            

        };

        fetchData()
    }, []);


    const handleDrag = (e : DraggableEvent, data : DraggableData) => {

        setCharactersRotation(data.lastX*2)
        
        console.log(characterRotation)

        
        

    }

    return (
        <div>
            <Draggable
                onDrag={handleDrag}
                axis="x"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                grid={[1, 0]}
                scale={1}
            >
                <div className="handle">

                    {currentCharacter?.name}
                    <img className={`${"rotate-" + characterRotation.toString()}`} src={currentCharacter?.imageUrl[1]} alt={currentCharacter?.name} draggable={false} />

                </div>
            </Draggable>

        </div>
    );
}
