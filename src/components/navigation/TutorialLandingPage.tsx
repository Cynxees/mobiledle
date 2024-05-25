import React from 'react';
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";
import { TbBuildingCircus } from 'react-icons/tb';
import { ZIndex } from '@tsparticles/engine';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { IoDiscOutline, IoIdCardOutline } from 'react-icons/io5';
import { AiFillAlert } from 'react-icons/ai';
import { GiMirrorMirror } from 'react-icons/gi';
import CachedImage from '../../components/CachedImage';

interface TraitBoxProps {
    trait: string,
    state: number,
  }

  function TraitBox({trait, state}: TraitBoxProps){


    const wrongColor = "bg-red-900"
    const partialColor = "bg-orange-700"
    const correctColor = "bg-green-700"
  
    return <div
    className={`text-shadow shadow-gray-700 md:w-28 md:h-28 xs:w-14 xs:h-14 w-12 h-12 text-[0.6rem] xs:text-xs md:text-lg  border-neutral-300 border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-1s bg-[url('/images/agelta.jpg')] bg-blend-darken ${
        state == 0 ? correctColor
          : state == 1 ? partialColor
          : wrongColor 
      } `}
    >
  
    {trait}
  
  
  </div>
  
  }  

const TutorialLandingPage = ({ isOpen, onRequestClose, currentPage}) => {
    
  const modalStyle = {
    content: {
        backgroundColor: 'rgba(48, 58, 71, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        outline: 'none',
        overflow: 'hidden',
    
    },

    overlay: {
        backdropFilter: 'blur(1px)',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        
        
    }
  };
  let tutorialContent = null;

  const gridCss =  "mx-auto grid grid-cols-5 w-52 justify-center "
  const textCss =  "text-2xl pt-1 relative text-center col-span-3"
  const propertiesCss = "text-amber-200 text-xl"
  switch (currentPage){
    case 'classic':
      tutorialContent = (
        <>
        <div className= {gridCss}>
                        <BsFillQuestionSquareFill className="text-4xl text-[#e8dca4]" />

                    <div className={textCss}>Classic</div>
        </div>
            <p className=''>
            <div className='text-2xl'>Properties</div>
            <p className={propertiesCss}>Gender:</p> 
            
                 Male, Female or Genderless

            <p className={propertiesCss}>Role:</p> 
               Each characters duties and functions in the game (can be 2). <span className='text-lime-200'>ex. Marksman, Fighter/Mage</span>
            <p className={propertiesCss}>Lane:</p> 
            Most played positions in game (can be 2). <span className='text-lime-200'>ex. Roaming, EXP Lane/Jungling</span>
            <p className={propertiesCss}>Region:</p> 
            <p className={propertiesCss}>Year:</p> 
            <div className='flex'>
            <div className=''>

            <div className="absolute md:w-28 md:h-28 xs:w-14 xs:h-14 w-12 h-12 overflow-hidden animate__animated animate__zoomInRight bg-red-50">
            <CachedImage className={`absolute z-0 w-52 h-52 object-fill opacity-80 top-0 -translate-y-1/4 blur-[9px]`} imgKey={"data/61 - Chang'e/Icons/latest_13.png"} /> 
            </div>


            <div className="py-4 md:w-28 md:h-28 xs:w-14 xs:h-14 w-12 h-12 border-2 border-white overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight">

            <CachedImage className="z-10" imgKey={"data/61 - Chang'e/Icons/latest_13.png"} /> 
            </div>



            </div>
                <TraitBox trait= {'melee'}state = {0} />
                <TraitBox trait= {'melee'} state = {0} />
                <TraitBox trait= {'melee'}state = {0} />
                <TraitBox trait= {'melee'} state = {0} />
                <TraitBox trait= {'melee'}state = {0} />
                </div>
                </p>
        </>
      );
      break;
    
      case 'arcade':
        tutorialContent = (
            <>
             <div>
                <div className= {gridCss}>
                    {/* <TbBuildingCircus className="text-4xl text-[#ff9292] absolute left-16" /> */}
                    <TbBuildingCircus className="text-4xl text-[#ff9292]" />
                    <div className={textCss}>
                        
                    Arcade
                    
                    </div>
                </div>
                <p className=''>
                Create your own room to fight againts friends or with other bang-bangers in a contest of knowledge!
                </p>
            </div>
            </>
          );
          break;

        case 'blur':
            tutorialContent = (
                <>
                 <div>
                    <div className={gridCss}>
                        <IoIdCardOutline className="text-4xl text-[#93c5fd]" />
                    
                    <div className={textCss}>Blur</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
                 </div>
                </>
              );
              break;

        case 'disco':    
        tutorialContent = (
            <>
             <div>
                <div className= {gridCss}>
                        <IoDiscOutline className="text-4xl text-[#D9F99D]" />
                    
                    <div className={textCss}>Disco</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
            </div>
            </>
          );
          break;

        case 'survival':
            tutorialContent = (
                <>
                <div>
                <div className={gridCss}>
                    <AiFillAlert className="text-4xl text-[#ecc3ff]" />
                    <div className={textCss}>Survival</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
            </div>
                </>
              );
              break;
        
        case 'mirror':
            tutorialContent = (
                <>
                 <div>
                <div className={gridCss}>
                    <GiMirrorMirror className="text-4xl text-[#b7fffa]" />
                    <div className={textCss}>Mirror</div>
                 </div>
                 <p className=''>
                    Test your knowledge everyday eivigeifaofhaoifnawaef
                    </p>
                </div>
                </>
              );
              break;
    default:
      tutorialContent = (
        <>  
            <div className='text-center flex flex-col gap-4 '>
            <div>
                <div className= {gridCss}>
                    {/* <TbBuildingCircus className="text-4xl text-[#ff9292] absolute left-16" /> */}
                    <TbBuildingCircus className="text-4xl text-[#ff9292]" />
                    <div className={textCss}>Arcade</div>
                </div>
                <p className=''>
                Create your own room to fight againts friends or with other bang-bangers in a contest of knowledge!
                </p>
            </div>

            <div>
                <div className= {gridCss}>
                        <BsFillQuestionSquareFill className="text-4xl text-[#e8dca4]" />

                    <div className={textCss}>
                        Classic</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
            </div>

            <div>
                <div className={gridCss}>
                        <IoIdCardOutline className="text-4xl text-[#93c5fd]" />
                    
                    <div className={textCss}>Blur</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
            </div>
           
            <div>
                <div className= {gridCss}>
                        <IoDiscOutline className="text-4xl text-[#D9F99D]" />
                    
                    <div className={textCss}>
                        Disco</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
            </div>
            
            <div>
                <div className={gridCss}>
                    <AiFillAlert className="text-4xl text-[#ecc3ff]" />
                    <div className={textCss}>Survival</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
            </div>
           
            <div>
                <div className={gridCss}>
                    <GiMirrorMirror className="text-4xl text-[#b7fffa]" />
                    <div className={textCss}>Mirror</div>
                </div>
                <p className=''>
                Test your knowledge everyday eivigeifaofhaoifnawaef
                </p>
            </div>
            
            </div>
            
        </>
      );
      break;
  }
  return (
    <Modal
        className = 'z-[10000000]'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      contentLabel="Tutorial Modal"
    >
      <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
        <MdClose size={24} onClick={onRequestClose} />
      </div>
      <h2 className = 'font-modesto'style={{ marginBottom: '0px', fontSize: '35px', color: '#fff5c6' }}>How to play</h2>
      <hr className='mb-3'/>
      <div className ='flex mx-auto flex-col z-50'  style={{ alignItems: 'center' }}>
        
        {tutorialContent}
      </div>
      <div className = 'mt-auto text-center pt-3'>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
}

export default TutorialLandingPage;