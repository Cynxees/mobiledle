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

// const getFiveRandomQuestions = () => {
//   const randomQuestions = [];
//   while (randomQuestions.length < 5) {
//     const randomIndex = Math.floor(Math.random() * questions.questions.length);
//     const randomQuestion = questions[randomIndex];
//     if (!randomQuestions.some((q) => q.question === randomQuestion.question)) {
//       randomQuestions.push(randomQuestion);
//     }
//   }
//   return randomQuestions;
// };

const MirrorPage = () => {
  const [, setInit] = useState(false);
  const { t } = useTranslation();

  const { data: characters, isLoading, error } = useMobileLegendsCharacters();

  const [userHero, setUserHero] = useState<MobileLegendsHero>();
  const [questions, setQuestions] = useState(mirrorConstant.questions);
  const [userTraits, setUserTraits] = useState({
    role: "",
    rangeType: "",
    specialty: "",
    resource: "",
    lane: "",
    gender: "",
    year: "",
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgKey, setImgKey] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

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
  
  const particlesLoaded = async (container?: Container): Promise<void> => {
  
  };
  const options: ISourceOptions = useMemo(
  () => ({
    background: {
      color: {
        value: "",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        }
      },
      modes: {
        push: {
          quantity: 1,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#00FFFF",
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 20,
      },
      opacity: {
        value: 0.4,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 3, max: 6 },
      },
    },
    detectRetina: true,
  }),
  [],
  );

  useEffect(() => {
    if (userHero && imageRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = imageRef.current;

      img.onload = () => {
        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img, 0, 0, 200, 200);
          ctx.font = "20px Arial";
          ctx.fillStyle = "#000000";
          ctx.fillText(`Your hero is: ${userHero.name}`, 50, 200); 
        }
      };
    }
  }, [userHero]);


  const handleOption = (optionTrait) => {
    // console.log("halo : ", optionTrait)
    setUserTraits((prevUserTraits) => ({
      ...prevUserTraits,
      ...optionTrait,
    }));

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const findMostSuitedHero = (
    heroes: MobileLegendsHero[]
  ): MobileLegendsHero | null => {
    let bestMatch: MobileLegendsHero | null = null;
    let maxMatches = 0;

    heroes.forEach((hero) => {
      let matches = 0;

      if (hero.role === userTraits.role) matches++;
      if (hero.rangeType === userTraits.rangeType) matches++;
      if (hero.specialty === userTraits.specialty) matches++;
      if (hero.resource === userTraits.resource) matches++;
      if (hero.lane === userTraits.lane) matches++;
      if (hero.gender === userTraits.gender) matches++;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = hero;
      }
    });

    return bestMatch;
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
  
  return (
    <div className="flex flex-col gap-5 items-center mx-10">

    <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute -z-10" 
      />



    {userHero && currentQuestionIndex == questions.length ? 
    <Navbar mode={'simple'} currentPage={'mirror'}/>: <Navbar currentPage={'mirror'}/>    
    }


      

      {userHero && currentQuestionIndex === questions.length ? (
        <div className="flex flex-col items-center">
          <canvas ref={canvasRef} width={1080} height={1080} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}></canvas>
          <img
            ref={imageRef}
            src={imgUrl}
            alt={userHero.name}
            crossOrigin="anonymous"
            style={{ display: 'none' }}
          />
          <button onClick={downloadImage} className="mt-4 p-2 bg-blue-500 text-white rounded">Download Image</button>
        </div>
      ) : (
        <h2 className="text-lg">{t`What Hero Would You Be?`}</h2>
      )}

    {currentQuestionIndex < questions.length ? (
      <div key={currentQuestionIndex} className="+w-full md:w-[500px]">
        <p className="text-xl font-bold">{t(`${questions[currentQuestionIndex].question}`)}</p>
        <br />
        <ul className="flex gap-2 flex-wrap justify-center">
          {questions[currentQuestionIndex].options.map(
            (option, optionIndex) => (
              <li
                key={optionIndex}
                onClick={() => handleOption(option)}
                className="w-[48%] md:w-[36%] flex flex-col items-center border-2 p-2 mb-4 rounded-lg hover:bg-[#CB812D] transition duration-300 ease-in-out cursor-pointer py-4 hover:animate__animated animate__flash"
              >
                <img
                  src={`/images/mirror/${option.text}.jpg`}
                  className="w-full rounded-lg"
                />
                <p className="font-bold">{t(`${option.text}`)}</p>
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
