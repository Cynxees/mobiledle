import React, { useEffect, useState } from "react";
import questions from "../constant/mirror/questions.json";
import identity from "../constant/mirror/identity.json";
import Navbar from "../components/navigation/Navbar";

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
    if (currentQuestionIndex < questions.length) {
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

  const getRandomHeroBasedOnHighestTotalTrait = () => {

    const highestTrait = findHighestTrait();

    const identityEntries = Object.entries(identity)
    
    var highestTraitIndex = 0;
    for (let index = 0; index < identityEntries.length; index++) {
    
        if(highestTrait == identityEntries[index][0]) {
          highestTraitIndex = index;
          break;
        }

    }

    const randomHeroIndex = Math.floor(Math.random() * identityEntries[highestTraitIndex][1].length);

    const randomHero = identityEntries[highestTraitIndex][1][randomHeroIndex]

    // console.log(randomHero, identityEntries[highestTraitIndex][1][randomHero])
    return [highestTrait, randomHero]
  }

  return (
    <div className="flex flex-col gap-5 items-center mx-10">
      <Navbar />
      <h2 className="text-lg">What Hero Would You Be?</h2>

      {currentQuestionIndex == questions.length ? (
        <div>{getRandomHeroBasedOnHighestTotalTrait()}</div>
      ) : (
        <div></div>
      )}

      {currentQuestionIndex < questions.length ? (
        <div key={currentQuestionIndex} className=" w-full md:w-[500px]">
          <p>{questions[currentQuestionIndex].question}</p>
          <br />
          <ul>
            {questions[currentQuestionIndex].options.map(
              (option, optionIndex) => (
                <li
                  key={optionIndex}
                  onClick={() => handleOption(option.traits)}
                  className="border-2 p-2 mb-4 rounded-lg hover:bg-[#CB812D] transition duration-300 ease-in-out cursor-pointer py-4 hover:animate__animated animate__flash"
                >
                  {option.text}
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MirrorPage;
