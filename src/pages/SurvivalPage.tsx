import { useEffect, useState } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../API";
import Draggable, {DraggableEvent, DraggableData, ControlPosition} from 'react-draggable';


export default function SurvivalPage() {
    const [characters, setCharacters] = useState<MobileLegendsCharacter[]>([]);
    const [currentCharacter, setCurrentCharacter] = useState<MobileLegendsCharacter>();
    const [countdown, setCountdown] = useState(10);
    const [score, setScore] = useState(0);
    const [correctPrompt, setCorrectPrompt] = useState("")
    const [incorrectPrompt, setIncorrectPrompt] = useState("")
    const [characterRotation, setCharactersRotation] = useState(0)
    const [x, setX]= useState(0)
    const [countdownClass, setCountdownClass]= useState("")
    const [countdownSpeed, setCountdownSpeed]= useState(1000)

    

    function startRound(){

        // let random = Math.random()*100%characters.length

        let random = 0

        setCurrentCharacter(characters[random])
        
        console.log(characters)

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    
    useEffect(() => {
        if (countdown < 4) {
            setCountdownClass('animate-ping text-red-500');
        } else {
            setCountdownClass('animate-ping');
        }

        console.log(countdown);
    }, [countdown]);


    useEffect(() => {
        const fetchData = async () => {
            const characterData = await useFetchMobileLegendsCharacters().then( c=> {

                console.log("setting characters")
                setCurrentCharacter(c[0])
                setCharacters(c)
            }

            );
            
            

        };

        fetchData()
    }, []);


    const handleDrag = (e : DraggableEvent, data : DraggableData) => {


        const bounds = { left: -100, right: 100 };
        let newX = data.x;
        const distanceToLeftBound = Math.abs(bounds.left - newX);
        const distanceToRightBound = Math.abs(bounds.right - newX);


        if (newX < bounds.left) newX = bounds.left - Math.sqrt(Math.abs(newX - bounds.left));
        else if (newX > bounds.right) newX = bounds.right + Math.sqrt(Math.abs(newX - bounds.right));

        

        setCharactersRotation(data.lastX*0.5**3)
        setX(newX)

        
        
        console.log('rotation : ', characterRotation, ' x: ', x)
        

    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        console.log('Drag stopped', data);
    };


    if (!currentCharacter) return <div>Loading...</div>;
    return (
        <div>


            <div className={`font-nova-bold text-6xl mb-10 ${countdownClass}`}>
                {countdown}
            </div>

            <Draggable
                onDrag={handleDrag}
                onStop={handleStop}
                position={{x:x,y:0}}
                axis="x"
                handle=".handle"
                bounds={{left: -300, right:300}}
                defaultPosition={{ x: 0, y: 0 }}
                grid={[1, 0]}
                scale={1}
            >
                <div className="handle relative">

                <div className="bg-image absolute inset-0 scale-[2] bg-center  w-[10vw]  blur-3xl opacity-80 motion-reduce:animate-bounce animate-pulse" 
                    style={{ backgroundImage: `url(${currentCharacter?.imageUrl[1]})`, backgroundSize: 'cover', transform: `rotate(${characterRotation}deg)` }} />
                    
                    <div style={{ transform: `rotate(${characterRotation}deg)` }}>{currentCharacter?.name}
                    <img className="rounded-xl max-w-[50vw]" src={currentCharacter?.imageUrl[1]} alt={currentCharacter?.name} draggable={false}></img></div>



                </div>
            </Draggable>

        </div>
    );
}
