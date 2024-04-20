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

export default function LandingPage() {

  const [init, setInit] = useState(false);


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
        value: "#101010",
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
        value: "#e6d8a0",
      },
      links: {
        color: "#e6d8a0",
        distance: 300,
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
        value: 1,
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


  if(!init) return <div>Loading...</div>

  return (
    <div>
    <img className="w-screen h-screen object-cover absolute -z-10 left-0 top-0 blur-lg opacity-20" src="/landing-bg.jpg"/>
    <div className="flex flex-col gap-10">

        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute -z-10" 
        />
        
      
      <Navbar />
      <ClassicBox />
      <SurvivalBox />
    </div>
    </div>
  );
}
