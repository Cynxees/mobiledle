import { useEffect, useState } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../API";
import Draggable, {DraggableEvent, DraggableData, ControlPosition} from 'react-draggable';
import preloadImage from "../components/utils/preloadImage";
import { useMobileLegendsCharacters } from "../contexts/MobileLegendsCharactersContext";
import Navbar from "../components/Navbar";


function getRandomStat(character: MobileLegendsCharacter) {

    let random = Math.floor(Math.random()*100)%16

    // if( random => 7 && random <= 9) return getRandomStat(character)

    switch(random){
        case 0 : return character.name
        case 1 : return character.alias
        case 2 : return character.gender
        case 3 : return character.role
        case 4 : return character.specialty
        case 5 : return character.lane
        case 6 : return character.region
        case 7 : return character.goldPrice
        case 8 : return character.ticketPrice
        case 9 : return character.diamondPrice
        case 10: return character.year
        case 11 : return character.rangeType
        case 12 : return character.damageType
        case 13 : return character.resource
        case 14 : return character.hairColor
        case 15 : return character.species
    }
    


}

export default function SurvivalPage() {
    const { characters, isLoading } = useMobileLegendsCharacters();
    const [currentCharacter, setCurrentCharacter] = useState<MobileLegendsCharacter>();
    const [countdown, setCountdown] = useState(14);
    const [score, setScore] = useState(0);
    const [correctPrompt, setCorrectPrompt] = useState("")
    const [incorrectPrompt, setIncorrectPrompt] = useState("")
    const [characterRotation, setCharactersRotation] = useState(0)
    const [characterOpacity, setCharactersOpacity] = useState(0)
    const [x, setX]= useState(0)
    const [countdownClass, setCountdownClass]= useState("")
    const [countdownSpeed, setCountdownSpeed]= useState(1000)
    const [countdownActive, setCountdownActive] = useState(false);

    const [leftOpacity, setLeftOpacity]= useState(0)
    const [rightOpacity, setRightOpacity]= useState(0)

    const [leftText, setLeftText]= useState("")
    const [rightText, setRightText]= useState("")
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);


    useEffect(() => {
        
        if(!countdownActive) return 

        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, countdownActive]);


    useEffect(() => {
        if (countdown < 4) {
            setCountdownClass('animate-ping text-red-500');
        } else {
            setCountdownClass('animate-ping');
        }

        console.log(countdown);
    }, [countdown]);


    useEffect(() => {

        if(isLoading) return
        
        const fetchData = async () => {

            console.log("setting characters")
            const imagesPromiseList: Promise<any>[] = []
            characters.forEach(c =>{

                imagesPromiseList.push(preloadImage(c.imageUrl[0]))
            }

            )


            await Promise.all(imagesPromiseList)
            
            setIsAllLoaded(true)

        };

        fetchData()
    }, [isLoading]);

    useEffect(() => {
    
        if(!isAllLoaded) return
        const fillCurrentCharacter = () => {
            console.log("starting round")
            setRandomCurrentCharacter()


        }

        fillCurrentCharacter()
    
    }, [isAllLoaded])

    useEffect(() => {

        if(!currentCharacter) return

        setLeftText(getRandomStat(currentCharacter).toString())
        setRightText(getRandomStat(currentCharacter).toString())

        setCountdownActive(true)
        setGameStarted(true)

    }, [currentCharacter])

    function setRandomCurrentCharacter(){

        
        let random = Math.floor(Math.random()*100)%characters.length

        setCurrentCharacter(characters[0])


    }


    const handleDrag = (e : DraggableEvent, data : DraggableData) => {

        const bounds = { left: -100, right: 100 };


        // let mouseX = e['targetTouches'][0].clientX
        let center = innerWidth/2
        const mouseBounds = { left: center-100, right: center+100 };

        // console.log('mouseX ', mouseX, 'center', center, mouseBounds)

        // if(mouseX < mouseBounds.left || mouseX > mouseBounds.right) {
        //     console.log('mouse out of bounds')
        //     return
        // }

        let newX = data.x;
        const distanceToLeftBound = Math.abs(bounds.left - newX);
        const distanceToRightBound = Math.abs(bounds.right - newX);


        if (newX < bounds.left) newX = bounds.left - Math.cbrt(Math.abs(newX - bounds.left));
        else if (newX > bounds.right) newX = bounds.right + Math.cbrt(Math.abs(newX - bounds.right));



        setCharactersRotation(data.lastX*0.5**3)
        setX(newX)

        setCharactersOpacity(Math.abs(x)/150)

        if(x>0){
            setRightOpacity(Math.abs(x)/500)
            setLeftOpacity(0)
        }else{
            
            setRightOpacity(0)
            setLeftOpacity(Math.abs(x)/400)
        }
        
        
        

    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        console.log('Drag stopped', data);
    };


    

    if (!gameStarted) return <div>Loading...</div>;

    
    

    return (
        <div className="flex flex-col items-center justify-center">

        <div className="w-screen h-screen -z-50 fixed">

            <video src="/survivalVideo.mp4" className="min-w-full min-h-full blur-xl opacity-10" autoPlay muted loop></video>

        </div>
        <Navbar>

        </Navbar>
            
        <div className="grid grid-cols-3 w-full select-none mt-20">



            <div className="h-full relative flex -z-10 ">
            <div className={`${(leftOpacity>0) ? 'animate-pulse' :  '' } bg-orange-300 blur-3xl w-full h-full absolute`} style={{ opacity: 0.1 +leftOpacity }}/>
            <div className="w-full my-auto items-center align-middle text-3xl relative z-00 text-shadow-lg shadow-black motion-reduce:animate-bounce" style={{ opacity: 0.2+leftOpacity*5 }}>
            {leftText}
            </div>
            </div>
            
                

            <div className="z-10 relative">

            <div className={`font-nova-bold text-6xl mb-10 ${countdownClass}`}>
                {(countdown > 12) ? "?" : (countdown > 11) ? "READY?" : (countdown > 10) ? "START" : (countdown < 1) ? "DEFEAT" : countdown} 
            </div>

            <Draggable
                onDrag={handleDrag}
                onStop={handleStop}
                position={{x:x,y:0}}
                axis="x"
                handle=".handle"
                bounds={{left: -300, right:300}}
                defaultPosition={{ x: 0, y: 0 }}
                grid={[10, 0]}
                scale={1}
            >
                <div className="handle relative z-10 mb-20 transform " style={{ WebkitFilter: `brightness(${characterOpacity + 0.6})`, filter : `brightness(100%)` }}>

                <div className="bg-image absolute inset-0 scale-[2] bg-center  w-full  blur-3xl opacity-80 motion-reduce:animate-bounce animate-pulse" 
                    style={{ backgroundImage: `url(${currentCharacter?.imageUrl[1]})`, backgroundSize: 'cover', transform: `rotate(${characterRotation}deg)` }} />
                    
                <div style={{ transform: `rotate(${characterRotation}deg)` }}>{currentCharacter?.name}
                <img className="rounded-xl w-full max-w-[50vw] relative z-10" src={currentCharacter?.imageUrl[1]} alt={currentCharacter?.name} draggable={false}></img></div>



                </div>
            </Draggable>
            </div>

            <div className="h-full relative flex -z-10 ">
            <div className={`${(rightOpacity>0) ? 'animate-pulse' :  '' } bg-orange-300 blur-3xl w-full h-full absolute`} style={{ opacity: 0.1+rightOpacity }}/>
            <div className="w-full my-auto items-center align-middle text-3xl relative z-00 text-shadow-lg shadow-black motion-reduce:animate-bounce" style={{ opacity: 0.3+rightOpacity*5 }}>
            {rightText}
            </div>
            </div>

        </div>
        </div>
    );
}
