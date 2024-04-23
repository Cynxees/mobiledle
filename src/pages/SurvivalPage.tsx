import { useEffect, useState, useMemo  } from "react";
import { MobileLegendsCharacter } from "../API";
import Draggable, {DraggableEvent, DraggableData} from 'react-draggable';
import preloadImage from "../utils/preloadImage";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import Navbar from "../components/navigation/Navbar";
import {
    type Container,
    type ISourceOptions
  } from "@tsparticles/engine";
import { useTranslation } from "react-i18next";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function getRandomStat(character: MobileLegendsCharacter) {

    const random = Math.floor(Math.random()*100)%12

    // if( random => 7 && random <= 9) return getRandomStat(character)

    const characterStats = [
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

    console.log('right stat: ',characterStats[random], 'from ', character)
    return characterStats[random].toString().replace('/', '/ ')


}

function getWrongStat(character: MobileLegendsCharacter, characters: MobileLegendsCharacter[]){
    
    const characterStats = [
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
        const random = Math.floor(Math.random()*100)%12
        const randomCharacter = characters[Math.floor(Math.random()*100)%characters.length]

        const randomCharacterStats = [
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

        console.log('wrong stat: ',randomCharacterStats[random], 'from ', randomCharacter)

        if(randomCharacterStats[random] != characterStats[random]) return randomCharacterStats[random].toString().replace('/', '/ ')

        
    }

}

function getRandomCharacter(characters : MobileLegendsCharacter[]){

        
    const random = Math.floor(Math.random()*100)%30


    return characters[random]


}


export default function SurvivalPage() {

    const { t } = useTranslation();

    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
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
    // const [particleInit, setParticleInit] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // const [particleSpeed, setParticleSpeed] = useState(1)


    // const particlesLoaded = async (container?: Container): Promise<void> => {

    // };


    // const options: ISourceOptions = useMemo(
    // () => ({
    //     background: {
    //     color: {
    //         value: "",
    //     },
    //     },
    //     fpsLimit: 60,
    //     interactivity: {
    //     events: {
    //         onClick: {
    //         enable: true,
    //         mode: "push",
    //         }
    //     },
    //     modes: {
    //         push: {
    //         quantity: 1,
    //         },
    //         repulse: {
    //         distance: 150,
    //         duration: 0.4,
    //         },
    //     },
    //     },
    //     particles: {
    //     color: {
    //         value: "#ffffcc",
    //     },
    //     move: {
    //         direction: "top",
    //         enable: true,
    //         outModes: {
    //         default: "out",
    //         },
    //         random: false,
    //         speed: particleSpeed,
    //         straight: false,
    //     },
    //     number: {
    //         density: {
    //         enable: true,
    //         },
    //         value: 20,
    //     },
    //     opacity: {
    //         value: 0.4,
    //     },
    //     shape: {
    //         type: "circle",
    //     },
    //     size: {
    //         value: { min: 3, max: 6 },
    //     },
    //     },
    //     detectRetina: false,
    // }),
    // [],
    // );

    function startRound(){

        setCountdown(10)

        const correctPrompt = getRandomStat(currentCharacter).toString()
        const wrongPrompt = getWrongStat(currentCharacter, characters).toString()
        
        const random = Math.floor(Math.random()*10)

        if(random%2 == 0){
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

        const timer = window.setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, countdownSpeed);

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

                if(c.imageUrl[1] != null && c.imageUrl[1] != undefined && parseInt(c.id) < 30) imagesPromiseList.push(preloadImage(c.imageUrl[1]))
            }

            )


            await Promise.all(imagesPromiseList)
            
            setIsAllLoaded(true)

        };

        fetchData()
    }, [isLoading]);

    
    // useEffect(() => {

        
    //     console.log("init particle")

    //     if(!particleInit) initParticlesEngine(async (engine) => {
    //         await loadSlim(engine);
    //       }).then(() => {
    //         setParticleInit(true);
    //     });

    // }, )

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
        const center = innerWidth/2
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
        const stoppedX = data.x

        if(stoppedX < -70){

            if(!rightIsCorrect) handleCorrect() 
                else handleWrong()

        }else if(stoppedX > 70){
            if(rightIsCorrect) handleCorrect() 
                else handleWrong()
        
        }else{


        }
        setCharactersRotation(0)
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
        <div className="items-center justify-center w-screen h-screen overflow-hidden">

        <div className="w-full h-full -z-50 fixed max-md:hidden">

            <video src="/survivalVideo.mp4" className="min-w-full min-h-full object-cover blur-xl opacity-10" autoPlay muted loop></video>

            {/* <Particles
            id="tsparticles-survival"
            particlesLoaded={particlesLoaded}
            options={options}
            className="absolute -z-10" 
            /> */}

        </div>

        <div className="w-screen h-screen -z-30 fixed">

        </div>

        <div className="bg-gray-900 rounded-lg shadow-inner shadow-white  border-yellow-100 border-2 p-5 md:p-20 w-full h-full mx-auto md:mt-[10vh] md:w-4/5 md:h-4/5 lg:w-3/5 xl:w-2/5">
        <Navbar />


        <div className="grid grid-cols-6 w-full h-full select-none mt-20 px-2">

            <div className="h-full w-full relative flex z-30">
            <div className={`${(leftOpacity>0) ? 'animate-pulse' :  'animate-none' } bg-orange-300 blur-3xl w-full h-[50vh] top-1/2 -translate-y-1/2 absolute`} style={{ opacity: 0.1 +leftOpacity }}/>
            <div className="w-full mr-auto text-center text-balance my-auto -translate-y-10 text-orange-200 brightness-110 items-center align-middle text-xl md:text-3xl relative z-00 text-shadow-lg shadow-black motion-reduce:animate-bounce" style={{ opacity: 0.2+leftOpacity*5 }}>
            {t(`${leftText}`)}
            </div>
            </div>
            
            
            <div className="z-10 col-span-4 h-full relative flex-shrink">

            <div className={`font-nova-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-10 ${countdownClass}`}>
                {(countdown > 12) ? "?" : (countdown > 11) ? "READY?" : (countdown > 10) ? "START" : (countdown < 1) ? "DEFEAT" : countdown} 
            </div>

            <div className="absolute mx-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ">
                
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
                <div className="handle relative z-30 mb-20 transform w-full h-full " style={{ WebkitFilter: `brightness(${characterOpacity + 0.6})`, filter : `brightness(100%)` }}>

                <div className="bg-image absolute inset-0 bg-center bg-cover max-h-[28vh] lg:max-h-full blur-3xl opacity-80 motion-reduce:animate-bounce animate-pulse" 
                    style={{ backgroundImage: `url(${currentCharacter?.imageUrl[1]})`, backgroundSize: 'cover', transform: `rotate(${characterRotation}deg)` }} />
                    
                <img className="rounded-xl max-h-[28vh] lg:max-h-full z-10 mx-auto scale-150 md:scale-110 " src={currentCharacter?.imageUrl[1]} alt={currentCharacter?.name} draggable={false}></img>
                


                </div>
            </Draggable>
            
            <div className="px-5 mx-auto py-2 border-yellow-100 text-xl">{score*100}</div>
            </div>

            </div>

            <div className="h-full w-full relative flex z-10 ">
            <div className={`${(rightOpacity>0) ? 'animate-pulse' :  '' } bg-orange-300 blur-3xl w-full h-[50vh] top-1/2 -translate-y-1/2 absolute`} style={{ opacity: 0.1+rightOpacity }}/>
            <div className="w-full text-center text-balance mr-14 -translate-y-10 my-auto text-orange-200 brightness-110 items-center align-middle text-xl md:text-3xl relative z-10 text-shadow-lg shadow-black motion-reduce:animate-bounce" style={{ opacity: 0.3+rightOpacity*5 }}>
            {t(`${rightText}`)}
            </div>
            </div>

        </div>
        </div>
        </div>
    );
}
