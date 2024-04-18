import { useEffect, useState } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../API";
import Draggable from 'react-draggable';

export default function SurvivalPage() {
    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);
    const [currentCharacter, setCurrentCharacter] = useState<MobileLegendsCharacter>();
    const [score, setScore] = useState(0);
    const [correctPrompt, setCorrectPrompt] = useState("")
    const [incorrectPrompt, setIncorrectPrompt] = useState("")


    function startRound(){

        // let random = Math.random()*100%characters.length

        let random = 0

        setCurrentCharacter(characters[random])
        
        console.log(random)

    }

    useEffect(() => {
        const fetchData = async () => {
            const characterData = await useFetchMobileLegendsCharacters();
            setCharacters(characterData);
            
            startRound()
            

        };

        fetchData();
    }, []);


    const handleDrag = (e : DragEvent, data : DraggableData) => {

        e.preventDefault()
        console.log(e)
        

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
                    <img src={currentCharacter?.imageUrl[1]} alt={currentCharacter?.name} draggable={false} />

                </div>
            </Draggable>

        </div>
    );
}
