import { useEffect, useMemo, useState } from "react";
import ClassicBox from "../components/navigation/ClassicBox";
import Navbar from "../components/navigation/Navbar";
import SurvivalBox from "../components/navigation/SurvivalBox";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useMobileLegendsCharacters } from "../providers/MobileLegendsCharactersProvider";
import ArcadeBox from "../components/navigation/ArcadeBox";
import { useUser } from "../providers/UserProvider";
import MirrorBox from "../components/navigation/MirrorBox";

export default function LandingPage2() {

  const [init, setInit] = useState(false);
  
  const { data: user, isLoading: userIsLoading, error: userError } = useUser() 
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


  if (false) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
    <img className="w-screen h-screen object-cover absolute -z-10 left-0 top-0  motion-reduce:animate-bounce opacity-40" src="/landing-bg.jpg"
    
    />
    <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute -z-10" 
        />
    <div className="flex flex-col gap-10 h-screen justify-center w-[400px] md:w-[500px]">
      
      <Navbar />
      <ClassicBox />
      <SurvivalBox />
      <ArcadeBox />
      <MirrorBox />
    </div>
    <div>
        hi
    </div>
    </div>
  );
}
