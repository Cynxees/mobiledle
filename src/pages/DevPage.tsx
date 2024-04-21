import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { MobileLegendsCharacter } from '../API';
import useFetchTodayAnswer from "../hooks/useFetchTodayAnswer";
import useGetMobileLegendsCharacterImageURL from "../hooks/useGetMobileLegendsCharacterImageURL"
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";

export default function DevPage(){

    const [init, setInit] = useState(false);
    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    const todayCharacter = useFetchTodayAnswer('CLASSIC')
    
    
    
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
    [],
  );


    
    if(!init || isLoading)return <div>Loading...</div>

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
                
                {characters.map((item : MobileLegendsCharacter) => {

                    


                    return <div key="{item.id}" className="flex flex-row w-[10vw] gap-5">
                         
                         <img src={item.imageUrl[0]} alt="" className="w-24 h-24"/>
                         <div>
                          
                         <div className="text-xl">{item.id}: {item.name}</div>
                         <div className="text-sm text-gray-400">{item.alias}</div>
                         </div>
                         
                         </div>
                })}
            </ul>
            </div>

        </div>
        

    )

}
