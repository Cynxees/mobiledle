


const MirrorPrompt = ({question, currentQuestionId, handleOption, className = ""}) => {



    const handleAgreeOption = (intensity, optionTrait) => {


        question.answerIntensity = intensity

        handleOption(currentQuestionId, question, optionTrait)


    }
    




    const agreeButtonSelectedCss = " bg-green-400 "
    const disagreeButtonSelectedCss = " bg-red-400 "
    const neutralButtonSelectedCss = " bg-gray-700 "

    // const agreeButtonSelectedCss = " bg-green-400 "
    // const disagreeButtonSelectedCss = " bg-red-400 "
    // const neutralButtonSelectedCss = " bg-gray-700 "
    
    const buttonCss = " rounded-full border-2 my-auto cursor-pointer "
    const agreeButtonCss = " border-green-400 "
    const disagreeButtonCss = " border-red-400 "
    
    
    const agreeHoverButtonCss = "bg-green-300"
    const disagreeHoverButtonCss = "bg-red-300"
    const neutralHoverButtonCss = "bg-gray-600"

    const neutralButtonCss = " border-gray-500 w-[8vw] h-[8vw] md:w-10 md:h-10"
    const smallButtonCss = buttonCss + "w-[11vw] h-[11vw] md:w-12 md:h-12 "
    const mediumButtonCss = buttonCss + "w-[12vw] h-[12vw] md:w-14 md:h-14 "
    const largeButtonCss = buttonCss + "w-[13vw] h-[13vw] md:w-16 md:h-16 "


    if(question.type == "agree"){



        return <div className={className + ' '}>
                  
            {question.question}

            <div className="flex justify-center gap-[2.5vw] md:gap-8 mt-5 ">

                <div className="my-auto text-gray-400 w-12 font-nova-bold max-md:absolute left-[3vw] bottom-0 max-md:translate-y-[120%]">    
                Disagree
                </div>
                
                <div onMouseOver={(e) => e.currentTarget.classList.add(disagreeHoverButtonCss)} onMouseLeave={(e) => e.currentTarget.classList.remove(disagreeHoverButtonCss)} className={disagreeButtonCss + largeButtonCss + (question.answer == question.options[1] && question.answerIntensity == 3 ? disagreeButtonSelectedCss: '')} onClick={() => handleAgreeOption(3, question.options[1])} />
                <div onMouseOver={(e) => e.currentTarget.classList.add(disagreeHoverButtonCss)} onMouseLeave={(e) => e.currentTarget.classList.remove(disagreeHoverButtonCss)} className={disagreeButtonCss + mediumButtonCss + (question.answer == question.options[1] && question.answerIntensity == 2 ? disagreeButtonSelectedCss: '')} onClick={() => handleAgreeOption(2, question.options[1])} />
                <div onMouseOver={(e) => e.currentTarget.classList.add(disagreeHoverButtonCss)} onMouseLeave={(e) => e.currentTarget.classList.remove(disagreeHoverButtonCss)} className={disagreeButtonCss + smallButtonCss + (question.answer == question.options[1] && question.answerIntensity == 1 ? disagreeButtonSelectedCss: '')} onClick={() => handleAgreeOption(1, question.options[1])} />
                <div onMouseOver={(e) => e.currentTarget.classList.add(neutralHoverButtonCss)} onMouseLeave={(e) => e.currentTarget.classList.remove(neutralHoverButtonCss)} className={buttonCss + neutralButtonCss + (question.answerIntensity == 0 ? neutralButtonSelectedCss: '')} onClick={() => handleAgreeOption(0, question.options[1])}></div>
                <div onMouseOver={(e) => e.currentTarget.classList.add(agreeHoverButtonCss)} onMouseLeave={(e) => e.currentTarget.classList.remove(agreeHoverButtonCss)} className={smallButtonCss + agreeButtonCss + (question.answer == question.options[0] && question.answerIntensity == 1 ? agreeButtonSelectedCss: '')} onClick={() => handleAgreeOption(1, question.options[0])} />
                <div onMouseOver={(e) => e.currentTarget.classList.add(agreeHoverButtonCss)} onMouseLeave={(e) => e.currentTarget.classList.remove(agreeHoverButtonCss)} className={mediumButtonCss + agreeButtonCss + (question.answer == question.options[0] && question.answerIntensity == 2 ? agreeButtonSelectedCss: '')} onClick={() => handleAgreeOption(2, question.options[0])} />
                <div onMouseOver={(e) => e.currentTarget.classList.add(agreeHoverButtonCss)} onMouseLeave={(e) => e.currentTarget.classList.remove(agreeHoverButtonCss)} className={largeButtonCss + agreeButtonCss + (question.answer == question.options[0] && question.answerIntensity == 3 ? agreeButtonSelectedCss: '')} onClick={() => handleAgreeOption(3, question.options[0])} />

                <div className="my-auto text-gray-400 w-12 max-md:absolute right-[3vw] font-nova-bold bottom-0 max-md:translate-y-[120%]">       
                Agree
                </div>
            </div>


        


        </div>

    }else if(question.type == "reactin"){

        return <div className={className + " translate-y-1/2"}>
                  
            <div className="bg-red-200 h-[30vh]">


            reaction game
            </div>

        </div>


    }else{

        return <div className={className + ' '}>
                  

            {question.question}
            <div className="flex justify-center gap-[2vw] md:gap-5 mt-2">


            { 
            
            question.options.map((option) => {

                return <div key={option.text} className={"border md:p-2 p-1 w-[30vw] md:w-32 rounded-md cursor-pointer   " + ((question.answer === option) ? 'border-white bg-white bg-opacity-10 shadow-sm shadow-white': 'border-gray-700')} onClick={() => handleOption(currentQuestionId, question, option)}>

                {option.text}

                </div>




                
                
                
                })}
            </div>

        </div>






    }






}





export default MirrorPrompt