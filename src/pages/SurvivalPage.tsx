import { useEffect, useRef, useState } from "react";
import ColorIndicator from "../components/classic/ColorIndicator";
import HeroShowBar from "../components/classic/HeroShowBar";
import Navbar from "../components/navigation/Navbar";
import HeroSearchBar from "../components/classic/HeroSearchBar";
import ClassicTableTitle from "../components/classic/ClassicTableTitle";
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import HeroBank from "../components/classic/HeroBank";

import { useTranslation } from "react-i18next";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import WinCard from "../components/public/WinCard";
import { MobileLegendsHero } from "../types/MobileLegendsHero";
import CachedImage from "../components/CachedImage";
import SurvivalGameArea from "../components/survival/SurvivalGameArea";

interface userGuess {
  isCorrect: boolean;
  isClicked: boolean;
}

export default function SurvivalPage() {
  const { t } = useTranslation();
  const { data: characters, isLoading, error } = useMobileLegendsCharacters();
  const [answer, setAnswer] = useState<MobileLegendsHero>()
  const [mode, setMode] = useState("")
  const currentDate = new Date()
  const seed = currentDate.getDate() * currentDate.getMonth() * currentDate.getFullYear() * 200 +1
  const [init, setInit] = useState(false)

  const [highscore, setHighscore] = useState<number>(() => {
    return parseInt(localStorage.getItem("survivalHighscore")) || 0;
  });

  const [tries, setTries] = useState(10)
  const [score, setScore] = useState(0)

  const [isWin, setIsWin] = useState<boolean>(() => {
    const storedData = localStorage.getItem("survivalWon");
    const savedDate = localStorage.getItem("latestSurvivalWon");
    const today = new Date().toLocaleDateString();
    if (savedDate !== today) {
      return false;
    }
    return storedData === "true";
  });

  const [showBank, setShowBank] = useState(false);

  const winCardRef = useRef<HTMLDivElement>(null);

  const modeDictionary = {
    100: 'END',
    0: 'CLASSIC',
    1: 'BLUR',
    2: 'DISCO'
  }

  useEffect(() => {

    if(isLoading || !characters || isWin)return

    const newAnswer = ((seed*(score+1))%characters.length)
    setAnswer(characters[newAnswer])

    const totalGamemodes = 3
    const newMode = parseInt((((seed*3)*(score+3)*(score+3))).toString().charAt(2))%totalGamemodes
        
    setMode(modeDictionary[newMode])

    console.log(modeDictionary[newMode], ' : ', characters[newAnswer].id, characters[newAnswer].name)
    

    if(score > highscore){

      setHighscore(score)
      localStorage.setItem("survivalHighscore", score.toString());


    }



  }, [isLoading, score])


  useEffect(() => {
    
    localStorage.setItem("survivalWon", "false");
    if (isWin) {
      localStorage.setItem("survivalWon", "true");
      setMode(modeDictionary[100])
      setTries(0)
    }
    
    localStorage.setItem("latestSurvivalWon", new Date().toLocaleDateString())
  }, [isWin]);


  useEffect(() => {
    if (isWin && winCardRef.current) {
      winCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isWin, winCardRef.current]);

  
  const handleShowBank = () => {
    setShowBank(!showBank);
  };

  const handleUserGuess = () => {


    setTries((oldTries) => {
      
      if(oldTries - 1 <= 0){
        setIsWin(true)
      }

      return oldTries-1
    
    })

    

  }

  const handleUserCorrect = () => {

    setTries((oldTries) => {
      
      if(oldTries+3 > 10) return 10

      return oldTries+3
    
    })
    setScore((oldScore) => oldScore+1)


  }

  if (isLoading) return <div> Loading...</div>;

  return (
    <div className="w-screen align-top flex flex-col mb-52">


      {showBank ? 
        <aside
        className={`xl:block fixed top-0 right-0 z-40 justify-end xl:w-[22vw] max-xl:hidden h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
        >
          <HeroBank />
        </aside>
      
      
      
      :''}
      <button className="bg-red-50 absolute top-0" onClick={handleUserCorrect}></button>
      
      <section className={`flex flex-col w-full gap-5 items-center md:mt-[20vh] mt-[25vh] mb-32`}>
        
        <div className="flex flex-col gap-5 mb-16 mx-24 w-full sm:px-5 px-2 items-center justify-center">
            <div className="relative -z-1">
                <Navbar currentPage={'survival'} />
            </div>


            <div className="grid grid-cols-3 text-sm lg:text-xl border-2 bg-white bg-opacity-5 border-orange-200 rounded-lg p-2 md:p-5 w-[95%] sm:w-[85%] md:w-[500px] lg:w-[700px]">
              <div className="grid grid-rows-3">
                {t`Current Score`}
                <div className="row-span-2 text-3xl my-auto">
                  {score}
                </div>

              </div>
              <div className="grid grid-rows-4">
                {t`Tries`}
                <div className="row-span-3 text-[3rem] my-auto">
                  {tries}
                </div>

              </div>
              <div className="grid grid-rows-3">
                {t`High Score`}
                <div className="row-span-2 text-3xl my-auto">
                  {highscore}
                </div>
                

              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleShowBank}
            />
            <div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-orange-500"></div>
            <span className="ms-3 my-auto text-sm font-medium text-gray-900 dark:text-gray-300">
                NOOB MODE
            </span>
            </label>
            
            <SurvivalGameArea answer={answer} seed={seed} characters={characters} handleUserCorrect={handleUserCorrect} handleUserGuess={handleUserGuess} mode={mode} />



        </div>
        {isWin && <WinCard winCardRef={winCardRef}/>}
        
      </section>
      <div
        className={`${
          showBank ? "block" : "hidden"
        } flex flex-col xl:hidden align-middle mx-auto`}
      >
        <div className={`text-4xl text-white mb-5 `}>Heroes</div>
        
        <HeroBank />
        
      </div>
    </div>
  );
}
