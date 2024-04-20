import { useEffect, useState, useCallback  } from "react";
import useFetchMobileLegendsCharacters from "../hooks/useFetchMobileLegendsCharacters";
import { MobileLegendsCharacter } from "../API";
import Draggable, {DraggableEvent, DraggableData, ControlPosition} from 'react-draggable';
import preloadImage from "../components/utils/preloadImage";
import { useMobileLegendsCharacters } from "../contexts/MobileLegendsCharactersContext";
import Navbar from "../components/navigation/Navbar";

import { useTranslation } from "react-i18next";

function getRandomStat(character: MobileLegendsCharacter) {

    let random = Math.floor(Math.random()*100)%12

    // if( random => 7 && random <= 9) return getRandomStat(character)

    let characterStats = [
        character.alias, 
        character.gender, 
        character.role, 
        character.specialty,
        character.lane,
        character.region,
        character.year,
        character.rangeType,
        character.damageType,
        character.resource,
        character.hairColor,
        character.species
    ]

    return characterStats[random]


}

function getWrongStat(character: MobileLegendsCharacter, characters: MobileLegendsCharacter[]){
    
    let characterStats = [
        character.alias, 
        character.gender, 
        character.role, 
        character.specialty,
        character.lane,
        character.region,
        character.year,
        character.rangeType,
        character.damageType,
        character.resource,
        character.hairColor,
        character.species
    ]

    while(true){
        let random = Math.floor(Math.random()*100)%12
        let randomCharacter = characters[Math.floor(Math.random()*100)%characters.length]

        let randomCharacterStats = [
            randomCharacter.alias, 
            randomCharacter.gender, 
            randomCharacter.role, 
            randomCharacter.specialty,
            randomCharacter.lane,
            randomCharacter.region,
            randomCharacter.year,
            randomCharacter.rangeType,
            randomCharacter.damageType,
            randomCharacter.resource,
            randomCharacter.hairColor,
            randomCharacter.species
        ]

        if(randomCharacterStats[random] != characterStats[random]) return randomCharacterStats[random]

        
    }

}

function getRandomCharacter(characters : MobileLegendsCharacter[]){

        
    let random = Math.floor(Math.random()*100)%30


    return characters[random]


}


export default function SurvivalPage() {

    const { t } = useTranslation();

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
    const [rightIsCorrect, setRightCorrect] = useState(false)
    const [isAllLoaded, setIsAllLoaded] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    function startRound(){

        setCountdown(10)

        let correctPrompt = getRandomStat(currentCharacter).toString()
        let wrongPrompt = getWrongStat(currentCharacter, characters).toString()
        
        if(countdown%2 == 0){
            setLeftText(correctPrompt)
            setRightText(wrongPrompt)
            setRightCorrect(false)
        }else{
            
            setRightText(correctPrompt)
            setLeftText(wrongPrompt)
            setRightCorrect(true)
        }



    }



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

                if(c.imageUrl[1] != null && c.imageUrl[1] != undefined && c.id < 30) imagesPromiseList.push(preloadImage(c.imageUrl[1]))
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
            setCurrentCharacter(getRandomCharacter(characters))


        }

        fillCurrentCharacter()
    
    }, [isAllLoaded])

    useEffect(() => {

        if(!currentCharacter) return

        startRound()

        setCountdownActive(true)
        setGameStarted(true)

    }, [currentCharacter])

    

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



        setCharactersRotation(data.lastX*0.4**5)
        setX(newX)

        setCharactersOpacity(Math.abs(x)/150)

        if(x>70){
            setRightOpacity(Math.abs(x)/500)
            setLeftOpacity(0)
        }else if(x<-70){
            
            setRightOpacity(0)
            setLeftOpacity(Math.abs(x)/400)
        }else{
            setRightOpacity(0)
            setLeftOpacity(0)
        }
        
        
        

    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        let stoppedX = data.x

        if(stoppedX < -70){

            if(!rightIsCorrect) handleCorrect() 
                else handleWrong()

        }else if(stoppedX > 70){
            if(rightIsCorrect) handleCorrect() 
                else handleWrong()
        
        }else{


        }
        setCharactersOpacity(0.2)
        setRightOpacity(0)
        setLeftOpacity(0)
        setX(0)

    };

    function handleCorrect(){


        
        setCurrentCharacter(getRandomCharacter(characters))
        startRound()
        setScore(score+1)
        

    }


    function handleWrong(){

        console.log("LOSS")
        setCountdown(0)
        setScore(0)

    }
 

    if (!gameStarted) return <div>Loading...</div>;

    
    

    return (
        <div className="flex flex-col items-center justify-center">

        <div className="w-screen h-screen -z-50 fixed">

            <video src="/survivalVideo.mp4" className="min-w-full min-h-full blur-xl opacity-10" autoPlay muted loop></video>

        </div>

        <div className="bg-gray-900 rounded-lg shadow-inner shadow-white  border-yellow-100 border-2 p-20 ">
        <Navbar>

        </Navbar>
        
        <div className="grid grid-cols-3 w-full select-none mt-20">

            <div className="h-full w-60 relative flex z-30">
            <div className={`${(leftOpacity>0) ? 'animate-pulse' :  'animate-none' } bg-orange-300 blur-3xl w-full h-full absolute`} style={{ opacity: 0.1 +leftOpacity }}/>
            <div className="w-full my-auto text-orange-200 brightness-110 items-center align-middle text-3xl relative z-00 text-shadow-lg shadow-black motion-reduce:animate-bounce" style={{ opacity: 0.2+leftOpacity*5 }}>
            {t(`${leftText}`)}
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
                <div className="handle relative z-30 mb-20 transform " style={{ WebkitFilter: `brightness(${characterOpacity + 0.6})`, filter : `brightness(100%)` }}>

                <div className="bg-image absolute inset-0 scale-[2] bg-center  w-full  blur-3xl opacity-80 motion-reduce:animate-bounce animate-pulse" 
                    style={{ backgroundImage: `url(${currentCharacter?.imageUrl[1]})`, backgroundSize: 'cover', transform: `rotate(${characterRotation}deg)` }} />
                    
                <div style={{ transform: `rotate(${characterRotation}deg)` }}>{currentCharacter?.name}
                <img className="rounded-xl w-60 h-96  relative z-10" src={currentCharacter?.imageUrl[1]} alt={currentCharacter?.name} draggable={false}></img></div>


                </div>
            </Draggable>
            <div className="w-full px-10 py-2 border-yellow-100 border-2 rounded-xl">{score}</div>
            </div>

            <div className="h-full w-60 relative flex z-10 ">
            <div className={`${(rightOpacity>0) ? 'animate-pulse' :  '' } bg-orange-300 blur-3xl w-full h-full absolute`} style={{ opacity: 0.1+rightOpacity }}/>
            <div className="w-full my-auto text-wrap text-orange-200 brightness-110  items-center align-middle text-3xl relative z-10 text-shadow-lg shadow-black motion-reduce:animate-bounce" style={{ opacity: 0.3+rightOpacity*5 }}>
            {t(`${rightText}`)}
            </div>
            </div>

        </div>
        </div>
        </div>
    );
}
