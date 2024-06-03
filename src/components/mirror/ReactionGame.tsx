import React, { useState, useEffect, useRef } from "react";

import questions from "../../constant/mirror/questions.json"

const ReactionGame = ({question, onGameEnd, className=''}) => {
  const [gameState, setGameState] = useState("start"); // "start", "waiting", "clickNow", "result"
  const [reactionTime, setReactionTime] = useState(null);
  const [healthPercent, setHealthPercent] = useState(100)
  const startTimeRef = useRef(null);

  const [perfectTime, setPerfectTime] = useState(0)

  useEffect(() => {

    if(gameState == "start") return

    setPerfectTime(Date.now() + 3612)

    const interval = setInterval(() => {


      setHealthPercent((old) => {
        
        if(old<0) clearInterval(interval)
        

        return old-((101-old)*0.005)

      })


      if(healthPercent < 0) return
    }, 1);


    return () => {
        clearInterval(interval)

    };

  }, [gameState])

  const handleStartClick = () => {
    setGameState("waiting");

  };

  const handleCircleClick = () => {
    console.warn('perfect: ', perfectTime)
    const endTime = Date.now();
    console.warn('end: ', endTime)
    const reactTime = endTime - perfectTime
    setReactionTime(reactTime);
    setGameState("result");
    onGameEnd(reactTime)
    
  };

  return (
    <div className={className + ((gameState == "result" ? '  ': ' absolute h-[80vh] md:pb-52'))}>
      {gameState === "start" && (
        <div
          className="flex cursor-pointer items-center justify-center h-full w-full"
          
        >
          <div className="flex flex-col">
            <h1 className="text-white">Reaction Test</h1>
            
            Retribution when Health Bar reach Line

            <button onClick={handleStartClick} className="mt-5 hover:bg-white hover:bg-opacity-10">I'm Ready</button>
            
          </div>

        </div>
      )}

      {gameState === "waiting"  && (
        <div className="flex flex-col animate__animated animate__fadeInUp gap-5 relative items-center justify-center h-full w-full motion-reduce:animate-bounce ">

          Reaction Test


          <div className="absolute w-[60%] max-w-72 h-4 rounded border-2 border-black shadow-sm shadow-orange-400 bg-neutral-700 top-[20%] md:top-[30%]">

            <div className="h-[200%] absolute left-[10%] border border-neutral-400 -translate-y-1/4 w-1 bg-red-600 rounded-lg">

            </div>
            <div style={{width:healthPercent+"%"}} className="absolute h-full from-red-500 to-red-700 bg-gradient-to-r "></div>


          </div>

          <img className="max-w-[80%] max-h-[80%]"  src="/images/turtle.png" alt="" />

          <img onClick={handleCircleClick} onMouseOver={(e) => e.currentTarget.classList.add('animate-pulse')} onMouseLeave={(e) => e.currentTarget.classList.remove('animate-pulse')} 
          className="w-16 border-2 cursor-pointer border-white rounded-full " src="/images/retribution.png" alt="" />
        </div>
      )}

      {gameState === "clickNow" && (
        <div
          className="flex animate__animated animate__fadeInUp items-center justify-center h-full w-full bg-green-500"
          onClick={handleCircleClick}
        >
          <h1>Click now!</h1>
        </div>
      )}

      {gameState === "result" && (
        <div className="flex flex-col items-center justify-center text-white w-full">
          <div className="flex flex-col items-center">
            <h1>Reaction Speed: {reactionTime} ms</h1>
          </div>

          <div className="w-[90vw] md:w-full mx-auto h-1 bg-gray-400 bg-opacity-15 rounded-xl mt-11"></div>
        </div>
      )}
    </div>
  );
};

export default ReactionGame;
