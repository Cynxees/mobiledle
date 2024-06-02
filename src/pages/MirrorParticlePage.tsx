import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { useEffect, useMemo } from 'react';
import MirrorPage from './MirrorPage';




export default function MirrorParticlePage() {

    useEffect(() => {
        const particleInit = initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        }).then((res) => {
        })
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

    return <div>
        <Particles
            id="tsparticles"
            key={'particleKey'}
            particlesLoaded={() =>  particlesLoaded(this)}
            options={options}
            className="fixed w-full h-full -z-40 max-lg:hidden" 
        />
        
        <MirrorPage  />

    </div>




}