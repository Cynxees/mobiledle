import { useEffect, useReducer, useRef, useState } from "react";
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

interface userGuess {
  isCorrect: boolean;
  isClicked: boolean;
}

export default function DiscoPage() {
  const { t } = useTranslation();

  const { data: characters, isLoading, error } = useMobileLegendsCharacters();
  const todayCharacter = useFetchTodayAnswer("DISCO");
  const currentDate = new Date()
  const seed = currentDate.getDate() * currentDate.getMonth() * currentDate.getFullYear()
  const [userAnswers, setUserAnswers] = useState<MobileLegendsHero[]>(
    () => {
      const storedData = localStorage.getItem("discoAnswers");
      //check if now is a new day
      const savedDate = localStorage.getItem("latestDiscoDate");
      const today = new Date().toLocaleDateString();
      if (savedDate !== today) {
        return [];
      }

      

      return storedData ? JSON.parse(storedData) : [];
    }
  );


  useEffect(()=>{

    if(isLoading) return
    
    userAnswers.map(c => {
       characters.map(ch => {
        if(c.id == ch.id){
        c.imageKeys = ch.imageKeys
        return
      }
    })
  
    })
  }, [isLoading])

  

  const [totalWins, setTotalWins] = useState<number>(() => {
    return parseInt(localStorage.getItem("totalDiscoWon")) || 0;
  });
  const [isWin, setIsWin] = useState<boolean>(() => {
    const storedData = localStorage.getItem("discoWon");
    //check if now is a new day
    const savedDate = localStorage.getItem("latestDiscoDate");
    const today = new Date().toLocaleDateString();
    if (savedDate !== today) {
      return false;
    }
    return storedData === "true";
  });
  const [userPredict, setUserPredict] = useState<userGuess>({
    isClicked: false,
    isCorrect: false,
  });

  const [showBank, setShowBank] = useState(false);

  const winCardRef = useRef<HTMLDivElement>(null);

  //local storage init
  useEffect(() => {
    // make sure that the item is in the local storage
    localStorage.setItem("discoAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("discoWon", "false");
    if (isWin) {
      localStorage.setItem("discoWon", "true");
    }
    localStorage.setItem("latestDiscoDate", new Date().toLocaleDateString());
    localStorage.setItem("totalDiscoWon", totalWins.toString());
  }, [userAnswers, isWin, totalWins]);

  //scroll to winCard
  useEffect(() => {
    if (isWin && winCardRef.current) {
      winCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isWin, winCardRef.current]);

  //userAnswer function
  const handleChildData = (dataFromChild: MobileLegendsHero) => {
    if (dataFromChild != null) {
      setUserAnswers((prevAnswers) => [...prevAnswers, dataFromChild]);

      // Check if dataFromChild matches todayCharacter
      if (dataFromChild.id === todayCharacter?.id) {
        setIsWin(true);
        setTotalWins((prevTotalWins) => prevTotalWins + 1);

        localStorage.setItem("discoWon", "true");
        localStorage.setItem("totalDiscoWon", totalWins.toString());
      }
    }
  };

  const handleShowBank = () => {
    setShowBank(!showBank);
  };

  if (isLoading || !todayCharacter) return <div> Loading...</div>;

  return (
    <div className="w-screen align-top flex flex-col">

  
      

      {(userAnswers.length>0) ?
      <div className="absolute top-0 w-full h-full" draggable="false">
        <CachedImage
          imgKey={characters[parseInt(userAnswers[userAnswers.length-1].id)-1].imageKeys.banners[0]} 
          className="absolute top-0 left-0 w-full h-full object-cover object-top brightness-[0.1] -z-30"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#10100e] -z-20"></div>
      </div>:''
      }

      {showBank ? 
        <aside
        className={`xl:block fixed top-0 right-0 z-40 justify-end xl:w-[22vw] max-xl:hidden h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
        >
          <HeroBank />
        </aside>
      
      
      
      :''}
      
      <section className={`flex flex-col w-full gap-5 items-center md:mt-[20vh] mt-[25vh] mb-32`}>
        
        

        <div className="flex flex-col gap-5 mb-16 mx-24 w-full sm:px-5 px-2 items-center justify-center">
            <div className="relative -z-1">
                <Navbar currentPage={'disco'}/>
            </div>



            <div className="flex justify-center select-none" style={{filter: `blur(0px)`}}>
                <CachedImage className='' style={{filter: `blur(${(isWin)?'0':2-userAnswers.length}px) saturate(${(isWin)?1:((userAnswers.length*0.05))})`}} imgKey={todayCharacter.imageKeys.skills[(seed)%todayCharacter.imageKeys.skills.length]} />
                
                {userAnswers.length >= 3 || isWin ? 
                
                  <CachedImage className='' style={{filter: `blur(${(isWin)?'0':2-(userAnswers.length-3)}px) saturate(${(isWin)?1:(((userAnswers.length-3)*0.05))})`}} imgKey={todayCharacter.imageKeys.skills[(seed+1)%todayCharacter.imageKeys.skills.length]} />
                  :<div className="relative">
                    <div className="text-[2.5rem] text-orange-200 font-nova-bold absolute z-10 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
                      {3-userAnswers.length}
                    </div>
                    <CachedImage className='w-24 h-24' style={{filter: `blur(5px) saturate(0.05)`}} imgKey={todayCharacter.imageKeys.skills[(seed+1)%todayCharacter.imageKeys.skills.length]} />
                  </div>
                }
                

                {userAnswers.length >= 5 || isWin ? 
                
                <CachedImage className='' style={{filter: `blur(${(isWin)?'0':2-(userAnswers.length-5)}px) saturate(${(isWin)?1:(((userAnswers.length-5)*0.05))})`}} imgKey={todayCharacter.imageKeys.skills[(seed+2)%todayCharacter.imageKeys.skills.length]} />
                :<div className={`relative ${userAnswers.length<3 ? 'hidden': ''}`}>
                  <div className="text-[2.5rem] text-orange-200 font-nova-bold absolute z-10 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
                    {5-userAnswers.length}
                  </div>
                  <CachedImage className='w-24 h-24' style={{filter: `blur(5px) saturate(0.05)`}} imgKey={todayCharacter.imageKeys.skills[(seed+2)%todayCharacter.imageKeys.skills.length]} />
                </div>
                }

                {userAnswers.length >= 7 || isWin ? 
                
                <CachedImage className='' style={{filter: `blur(${(isWin)?'0':2-(userAnswers.length-7)}px) saturate(${(isWin)?1:(((userAnswers.length-7)*0.05))})`}} imgKey={todayCharacter.imageKeys.skills[(seed+3)%todayCharacter.imageKeys.skills.length]} />
                :<div className={`relative ${userAnswers.length<5 ? 'hidden': ''}`}>
                  <div className="text-[2.5rem] text-orange-200 font-nova-bold absolute z-10 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
                    {7-userAnswers.length}
                  </div>
                  <CachedImage className='w-24 h-24' style={{filter: `blur(5px) saturate(0.05)`}} imgKey={todayCharacter.imageKeys.skills[(seed+3)%todayCharacter.imageKeys.skills.length]} />
                </div>
                }

                
                
                
            </div>

            {!isWin && (
            <HeroSearchBar
                characters={characters}
                onDataFromChild={handleChildData}
                userAnswers = {userAnswers}
            />
            )}


            <div>
            {t`Total Wins`} : {totalWins}
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
            <div className="flex gap-2 flex-wrap w-[90vw] md:w-[50vw] align-middle justify-center">
                {userAnswers.map((character, index) => (
                <div key={index} className="relative" style={{ order: userAnswers.length - index }}>

                    {character.id == todayCharacter.id ?
                    
                    
                    <div className="absolute z-10 opacity-30 animate__animated animate__zoomInRight bg-green-500 w-full md:h-28 xs:h-14 h-12">

                    </div>
                    :
                    
                    <div className="absolute z-10 opacity-30 animate__animated animate__zoomInRight bg-red-600 w-full md:h-28 xs:h-14 h-12">

                    </div>
                    
                    }
                    <HeroShowBar
                    character={character}
                    answer={todayCharacter}
                    isClassic={false}
                    />
                </div>
                ))}
                
            </div>
        </div>
        {isWin && <WinCard winCardRef={winCardRef}/>}
        <div className="w-full ">

        <ColorIndicator />
        </div>
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
