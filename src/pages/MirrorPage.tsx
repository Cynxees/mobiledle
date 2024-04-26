import React, { useEffect, useState } from "react";
import questions from "../constant/mirror/questions.json";
import identity from "../constant/mirror/identity.json";

const getFiveRandomQuestions = () => {
  const randomQuestions = [];
  while (randomQuestions.length < 5) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    if (!randomQuestions.some((q) => q.question === randomQuestion.question)) {
      randomQuestions.push(randomQuestion);
    }
  }
  return randomQuestions;
};

const MirrorPage = () => {
  const [questions, setQuestions] = useState(getFiveRandomQuestions());
  const [userTraits, setUserTraits] = useState({
    Brave: 0,
    Clever: 0,
    Sly: 0,
    Loyal: 0,
    Honorable: 0,
    Adventurous: 0,
    Wise: 0,
    Calm: 0,
    Mysterious: 0,
    Charismatic: 0,
    Determined: 0,
    Resourceful: 0,
    Noble: 0,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOption = (optionTrait) => {
    const updatedTraits = { ...userTraits };
    for (const trait in optionTrait) {
      if (updatedTraits.hasOwnProperty(trait)) {
        updatedTraits[trait] += optionTrait[trait];
      }
    }
    setUserTraits(updatedTraits);
    if (currentQuestionIndex < questions.length ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const findHighestTrait = () => {
    const traitEntries = Object.entries(userTraits);
    let highestTrait = null;
    let highestValue = Number.NEGATIVE_INFINITY;

    for (const [trait, value] of traitEntries) {
      if (value > highestValue) {
        highestValue = value;
        highestTrait = trait;
      }
    }

    return highestTrait;
  };

  return (
    <div className="flex flex-col gap-5">
      <h2>Title</h2>

      {currentQuestionIndex == questions.length  ? (
        <div>Congrats : {findHighestTrait()}</div>
      ) : (
        <div></div>
      )}

      {currentQuestionIndex < questions.length ? (
        <div key={currentQuestionIndex} className="mx-5">
          <h3>Question {currentQuestionIndex + 1}:</h3>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].options.map(
              (option, optionIndex) => (
                <li
                  key={optionIndex}
                  onClick={() => handleOption(option.traits)}
                  className="border-2 p-2"
                >
                  {option.text}
                </li>
              )
            )}
          </ul>
        </div>
      ) : <div></div>}
    </div>
  );
};

export default MirrorPage;
