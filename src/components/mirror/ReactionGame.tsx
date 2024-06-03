import React, { useState, useEffect, useRef } from "react";

import questions from "../../constant/mirror/questions.json"

const ReactionGame = ({onGameEnd, className=''}) => {
  const [gameState, setGameState] = useState("start"); // "start", "waiting", "clickNow", "result"
  const [reactionTime, setReactionTime] = useState(null);
  const startTimeRef = useRef(null);

  const handleStartClick = () => {
    setGameState("waiting");
    const randomDelay = 100000000 + Math.floor(Math.random() * 4000);

    setTimeout(() => {
      setGameState("clickNow");
      startTimeRef.current = Date.now();
    }, randomDelay);
  };

  const handleCircleClick = () => {
    if (gameState === "clickNow") {
      const endTime = Date.now();
      setReactionTime(endTime - startTimeRef.current);
      setGameState("result");
      if(reactionTime < 300) {
        onGameEnd(questions.questions[5].options[0])
      }else{
        onGameEnd(questions.questions[5].options[1])
      }
    }
  };

  return (
    <div className={className + ((gameState == "result" ? ' ': ' absolute'))}>
      {gameState === "start" && (
        <div
          className="flex items-center justify-center h-full w-full bg-gray-200"
          onClick={handleStartClick}
        >
          <h1 className="text-black">Click anywhere to start</h1>
        </div>
      )}

      {gameState === "waiting"  && (
        <div className="flex flex-col gap-5 relative items-center justify-center h-full w-full motion-reduce:animate-bounce ">

          <div className="absolute w-[60%] max-w-72 h-4 rounded border-2 border-black shadow-sm shadow-orange-400 bg-neutral-700 top-[20%] md:top-[30%]">

            <div className="absolute w-[30%] h-full from-red-500 to-red-700 bg-gradient-to-r "></div>


          </div>

          <img className="w-[80%]"  src="/images/turtle.png" alt="" />

          <img className="w-16" src="/images/retribution.png" alt="" />
        </div>
      )}

      {gameState === "clickNow" && (
        <div
          className="flex items-center justify-center h-full w-full bg-green-500"
          onClick={handleCircleClick}
        >
          <h1>Click now!</h1>
        </div>
      )}

      {gameState === "result" && (
        <div className="flex items-center justify-center h-full w-full bg-gray-200">
          <div className="flex flex-col items-center">
            <h1>Your reaction time: {reactionTime} ms</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionGame;
