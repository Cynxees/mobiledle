import React, { useState, useEffect, useRef } from "react";

import questions from "../../constant/mirror/questions.json"

const ReactionGame = ({onGameEnd}) => {
  const [gameState, setGameState] = useState("start"); // "start", "waiting", "clickNow", "result"
  const [reactionTime, setReactionTime] = useState(null);
  const startTimeRef = useRef(null);

  const handleStartClick = () => {
    setGameState("waiting");
    const randomDelay = 1000 + Math.floor(Math.random() * 4000);

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
    <>
      {gameState === "start" && (
        <div
          className="flex items-center justify-center h-full w-full bg-gray-200"
          onClick={handleStartClick}
        >
          <h1 className="text-black">Click anywhere to start</h1>
        </div>
      )}

      {gameState === "waiting" && (
        <div className="flex items-center justify-center h-full w-full bg-red-500">
          <h1>Wait for green...</h1>
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
    </>
  );
};

export default ReactionGame;
