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
import { useMobileLegendsCharacters } from "../contexts/MobileLegendsCharactersContext";

export default function DevPage(){

    const [init, setInit] = useState(false);
    const { characters, isLoading } = useMobileLegendsCharacters();
    const [todayCharacter, setTodayCharacter] = useState<MobileLegendsCharacter | undefined>(undefined);
    
    
    const [] = useState(useGetMobileLegendsCharacterImageURL(characters[0]))
    
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

    useEffect(() => {

        if(isLoading) return
        const getTodayCharacter = async () => {
            const result = await useFetchTodayAnswer("CLASSIC");
            setTodayCharacter(result)
        };

        getTodayCharacter();
    }, [isLoading]);

    console.log(characters)

    
    if(!init)return <div>Loading...</div>

    return (


        <div>
        <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="absolute -z-10"
            />
            <h1>Dev Page</h1>

            <h2>Today's Answer = {todayCharacter?.name}</h2>

            <ul className="list-item text-left">
                
                {characters.map((item : MobileLegendsCharacter) => {

                    


                    return <li key="{item.id}">
                         
                         <img src={item.imageUrl[0]} alt=""/>
                         {item.id}: {item.name}, {item.alias}
                         
                         </li>
                })}
            </ul>
            

        </div>
        

    )

}
