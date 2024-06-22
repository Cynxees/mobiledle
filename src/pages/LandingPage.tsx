import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import { useUser } from "../providers/UserProvider";
import NavigationButton from "../components/navigation/NavigationButton";

export default function LandingPage() {

  const [, setInit] = useState(false);
  
  const { data: user, isLoading: userIsLoading, error: userError } = useUser();
  const { data: characters, isLoading, error } = useMobileLegendsCharacters();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  
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
        value: "#ffffcc",
      },
      move: {
        direction: "top",
        enable: true,
        outModes: {
          default: "out",
        },
        random: false,
        speed: 1,
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



  return (
    <div className="mt-20">
    <img className="w-full h-full object-cover fixed -z-10 left-0 top-0  motion-reduce:animate-bounce opacity-40" src="/images/landing-bg.jpg"/>
    <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute -z-10" 
        />
    <div className="flex flex-col mt-[5%] md:mt-[20%] md:w-[500px] w-[90vw]">
      
      <Navbar />
      <div className="relative" style={{WebkitMaskImage: "linear-gradient(to top, black 85%, transparent 100%)"}}>

        <div style={{WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"}}>
          <div className="flex flex-col h-[85vh] md:h-[60vh] overflow-y-scroll justify-start pt-12 md:pt-16 pb-52 mx-auto gap-4 md:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          
            <NavigationButton link="arcade"/>
            <NavigationButton link="classic"/>

            <NavigationButton link="blur"/>
            <NavigationButton link="disco"/>
            <NavigationButton link="survival"/>
            <NavigationButton link="swipe"/>
            <NavigationButton link="mirror"/>
          
          </div>

        </div>


      </div>
    </div>
    </div>
  );
}
