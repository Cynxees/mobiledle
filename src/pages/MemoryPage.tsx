import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import MemoryCard from "../components/memory/MemoryCard";
import Timer from "../components/memory/Timer";
import { useEffect, useState } from "react";

import { initCardArray } from "../constant/memory/index";
import { MobileLegendsCharacter } from "../API";

const MemoryPage = () => {
  const { data: characters, isLoading, error } = useMobileLegendsCharacters();

  // // character card array that is shown to player
  const [cardChar, setCardChar] = useState<MobileLegendsCharacter[]>([]);

  useEffect(() => {
    if (characters != null) {
      setCardChar(initCardArray(characters));
    }
  }, [characters]);

  // // current card that is being shown
  const [cardSelected, setCardSelected] = useState([]);

  // points
  const [points, setPoints] = useState(0);

  const handleCardIsShow = (data) => {
    if (cardSelected.includes(data)) return;

    setCardSelected([...cardSelected, data]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (cardSelected.length === 2) {
        if (cardChar[cardSelected[0]] === cardChar[cardSelected[1]]) {
          console.log("Correct match!");
          setPoints(points + 100);
        } else {
          console.log("Incorrect match!");
        }

        setCardSelected([]);
      }
    }, 500);
  }, [cardSelected]);

  // console.log(cardChar);

  if (isLoading) return <div> Loading...</div>;

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-3xl">Memory</h2>
      <Timer initialTime={120} />
      <p>Points : {points}</p>
      <div className="flex flex-wrap gap-2 lg:w-8/12 mx-8">
        {cardChar &&
          cardChar.map((element, index) => (
            <div
              onClick={
                cardSelected.length === 2 ? null : () => handleCardIsShow(index)
              }
              key={index}
              className="grow"
            >
              <MemoryCard
                imageUrl={element.imageUrl[0]}
                isShow={cardSelected.includes(index) ? true : false}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MemoryPage;
