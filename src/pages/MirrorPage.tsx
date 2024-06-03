import React, { useEffect, useMemo, useRef, useState } from "react";
import mirrorConstant from "../constant/mirror/questions.json";
import identity from "../constant/mirror/identity.json";
import Navbar from "../components/navigation/Navbar";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import { useTranslation } from "react-i18next";
import { MobileLegendsHero } from "../types/MobileLegendsHero";
import CachedImage from "../components/CachedImage";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Container, ISourceOptions } from "@tsparticles/engine";
import html2canvas from "html2canvas";
import { getUrl } from 'aws-amplify/storage';
import MirrorPrompt from "../components/mirror/MirrorPrompt";


const MirrorPage = () => {
  const [, setInit] = useState(false);
  const { t } = useTranslation();
  const { data: characters, isLoading, error } = useMobileLegendsCharacters();


  const [userHero, setUserHero] = useState<MobileLegendsHero>();
  const questions = mirrorConstant.questions

  const [displayedQuestions, setDisplayedQuestions] = useState([questions[0]])
  const displayedQuestionsRef = useRef(null)
  const [results, setResults] = useState([])

  const [userTraits, setUserTraits] = useState({
    passive_aggresive: 5,
    kill_team: 5,
    slow_quick: 5,
    micro_macro: 5,
    early_late: 5
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgKey, setImgKey] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {

    questions.map((question) => {
      question.answer = {
        "passive_aggresive": 0,
        "kill_team": 0,
        "slow_quick": 0,
        "micro_macro": 0,
        "early_late": 0
      }
    })

  }, [])

  useEffect(() => {
    if (displayedQuestionsRef.current) {
      const { scrollHeight, clientHeight } = displayedQuestionsRef.current;
      displayedQuestionsRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [currentQuestionIndex]);
  
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!imgKey || imgKey == '') return

      try {
        const url = await getUrl({
          key: imgKey,
          options: {
            accessLevel: 'guest',
            expiresIn: 60*60*24
          }
        })
        setImgUrl(url.url.href);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImageUrl();
  }, [imgKey]);
  
  

  useEffect(() => {
    if (userHero && imageRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = imageRef.current;

      img.onload = () => {
        if (ctx) {
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(backgroundRef.current, 0, 0, 1080, 1080);
          ctx.drawImage(img, 390, 350, 300, 300);
          ctx.font = "128px Modesto";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(userHero.name, 1080/2, 290); 
        }
      };
    }
  }, [userHero]);


  const handleOption = (currentQuestionId, question, optionTrait) => {
    // console.log("halo : ", optionTrait

    question.answer = optionTrait

    // setUserTraits((prevUserTraits) => {

    //   const temp = prevUserTraits

    //   console.warn('old traits: ', temp)

      // if(optionTrait.passive_aggresive) temp.passive_aggresive += optionTrait.passive_aggresive/2
      // if(optionTrait.kill_team) temp.kill_team += optionTrait.kill_team/2
      // if(optionTrait.slow_quick) temp.slow_quick += optionTrait.slow_quick/2
      // if(optionTrait.micro_macro) temp.micro_macro += optionTrait.micro_macro/2
      // if(optionTrait.early_late) temp.early_late += optionTrait.early_late/2


    //   console.warn('new traits::: ',temp)
    //   return temp


    // });


    if(currentQuestionId >= currentQuestionIndex){

      const temp = currentQuestionIndex
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      setDisplayedQuestions((prevDisplayedQuestions) => {

        return [...prevDisplayedQuestions, questions[temp+1]]
      })
      
    }else{
      setDisplayedQuestions((prevDisplayedQuestions) => {

        return [...prevDisplayedQuestions]
      })
    }
  };

  const findMostSuitedHero = (
    heroes: MobileLegendsHero[]
  ): MobileLegendsHero => {


    const temp = {
      passive_aggresive: 5,
      kill_team: 5,
      slow_quick: 5,
      micro_macro: 5,
      early_late: 5

    }
    
    questions.map((question) => {

      const optionTrait = question.answer

      if(optionTrait.passive_aggresive) temp.passive_aggresive += optionTrait.passive_aggresive/2
      if(optionTrait.kill_team) temp.kill_team += optionTrait.kill_team/2
      if(optionTrait.slow_quick) temp.slow_quick += optionTrait.slow_quick/2
      if(optionTrait.micro_macro) temp.micro_macro += optionTrait.micro_macro/2
      if(optionTrait.early_late) temp.early_late += optionTrait.early_late/2



    })

    console.warn('final traits: ', temp)

    let mostSuitedHeroDifference = 100
    let mostSuitedHero = null

    characters.map((hero) => {

      const heroIdentity = identity.heroes[parseInt(hero.id) - 1]

      let difference = 0

      difference += Math.abs(temp.early_late - heroIdentity.early_late)
      difference += Math.abs(temp.micro_macro - heroIdentity.micro_macro)
      difference += Math.abs(temp.kill_team - heroIdentity.kill_team)
      difference += Math.abs(temp.passive_aggresive - heroIdentity.passive_aggressive)
      difference += Math.abs(temp.slow_quick - heroIdentity.slow_quick)

      if(mostSuitedHeroDifference > difference){

        mostSuitedHero = hero
        mostSuitedHeroDifference = difference

      }


    })

    return mostSuitedHero
    


  };

  useEffect(() => {
    if (currentQuestionIndex == questions.length) {
      // console.log(userTraits)
      const mostSuitedHero = findMostSuitedHero(characters);
      // console.log(mostSuitedHero)
      setUserHero(mostSuitedHero);
      setImgKey(mostSuitedHero.imageKeys.icons[0])
    }
  }, [currentQuestionIndex]);

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'hero-personality.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };
  
  if(isLoading) return <div>loading..</div>

  return (
    <div className="flex flex-col gap-5 items-center h-screen w-screen overflow-y-scroll" ref={displayedQuestionsRef}>



    <div className="mt-[20vh]">
      {userHero && currentQuestionIndex == questions.length ? 
      <Navbar mode={'simple'} currentPage={'mirror'}/>: <Navbar currentPage={'mirror'}/>    
      }

    </div>


      

    {userHero && currentQuestionIndex === questions.length ? (
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} width={1080} height={1080} className="max-h-[50vh]" style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}>

        <img ref={backgroundRef} src="/images/mirror_template.png" alt="" crossOrigin="anonymous"
          style={{ display: 'none' }} />
        </canvas>

        <img
          ref={imageRef}
          src={imgUrl}
          alt={userHero.name}
          crossOrigin="anonymous"
          style={{ display: 'none' }}
        />
        <button onClick={downloadImage} className="mt-4 p-2 bg-blue-500 text-white rounded">Download Image</button>
      </div>
    ) : ''}



    {currentQuestionIndex !== questions.length && <div className="flex flex-col gap-10 pb-[45vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {

            displayedQuestions.map((question) => {

              
              const currentQuestionId = questions.findIndex((tempQuestion) => tempQuestion == question )

              return <div>
                <MirrorPrompt currentQuestionId={currentQuestionId} handleOption={handleOption} question={question} className={(' '+((currentQuestionId == currentQuestionIndex) ? 'text-white animate__animated animate__fadeInUp':'text-gray-600')) + `` + ((question.type == "reaction") ? '':'')} key={question.question} />

                {question.type != "reaction" && <div className="w-[90vw] md:w-full mx-auto h-1 bg-gray-400 bg-opacity-15 rounded-xl mt-11"></div>}
              </div> 


            })


          }

        </div>}
    
    </div>
  );
};

export default MirrorPage;
