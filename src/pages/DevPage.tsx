import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { MobileLegendsCharacter } from "../API";
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import useGetMobileLegendsCharacterImageURL from "../hooks/useGetMobileLegendsCharacterImageURL";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";

import identity from "../constant/mirror/identity.json";
import CachedImage from '../components/CachedImage'

export default function DevPage() {
  const [init, setInit] = useState(false);
  const { data: characters, isLoading, error } = useMobileLegendsCharacters();
  const todayCharacter = useFetchTodayAnswer("CLASSIC");

  const [userPersonality, setUserPersonality] = useState({
    Brave: 28,
    Clever: 17,
    Sly: 10,
    Loyal: 25,
    Honorable: 22,
    Adventurous: 30,
    Wise: 19,
    Calm: 14,
    Mysterious: 23,
    Charismatic: 27,
    Determined: 26,
    Resourceful: 24,
    Noble: 21,
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#222021",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // console.log(characters)

  const findTraitWithLargestValue = () => {
    const entries = Object.entries(userPersonality);
    const largestValue = Math.max(...Object.values(userPersonality));
    const traitWithLargestValue = entries.find(([key, value]) => value === largestValue);
    if (traitWithLargestValue) {
      return traitWithLargestValue[0]; // Return the trait name (key)
    }
    return null; // Return null if no trait is found
  };

  // useEffect(() => {

  //   const personalityTrait = findTraitWithLargestValue()

  //   console.log(personalityTrait)
    
  //   console.log(identity[personalityTrait]);


  // //   var allHeroesInIdentity = []
  // //   var tempArray = [];

  // //   Object.entries(identity).forEach(([personality, heroes]) => {
  // //     // heroes.forEach(hero => allHeroesInIdentity.push(hero))
  // //     heroes.forEach(hero => allHeroesInIdentity.push(hero))
  // //   });

  // //   console.log(allHeroesInIdentity.length)

  // //   for (let index = 0; index < characters.length; index++) {
  // //     const region = characters[index].region;
  // //     const gender = characters[index].gender;
  // //     const role = characters[index].role;
  // //     const name = characters[index].name;
  // //     const specialty = characters[index].specialty;
  // //     const alias = characters[index].alias;


  // //     if (!allHeroesInIdentity.includes(name)) {
  // //       // console.log(name);
  // //       // Do something with the heroes not in identity
  // //       tempArray.push(name.concat(", " + alias + " from " + region + " specializes in" + specialty))
  // //     }


  // //   }

  //   // console.log(tempArray)
  // }, [characters]);

  if (!init || isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute -z-10"
      />

      <div className="mt-[30vh]">
        <h1>Dev Page</h1>

        <h2>Today's Answer = {todayCharacter?.name}</h2>

        <ul className="text-left flex flex-wrap w-[80%] mx-auto py-16 justify-center mt-10 border-4 border-white shadow-white shadow-2xl mb-72 bg-gray-400 bg-opacity-10 rounded-3xl gap-5">
          {characters.map((item) => {
            return (
              <div key="{item.id}" className="flex flex-row w-[10vw] gap-5">
                <CachedImage imgKey={item.imageKeys.icons[Math.floor(Math.random()*100) % item.imageKeys.icons.length]} className="w-24 h-24" />
                <div>
                  <div className="text-xl">
                    {item.id}<br/>{item.name}
                  </div>
                  {/* <div className="text-sm text-gray-400">{item.region}</div> */}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
something