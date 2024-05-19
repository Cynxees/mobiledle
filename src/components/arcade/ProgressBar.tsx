
import { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface ProgressBarProps {
    value : number;
    maxValue : number;
}


function ProgressBar({value, maxValue} :ProgressBarProps) {

    
    const percent = (value/maxValue*100)


    

    let props = useSpring({ width: `${percent}%`, from: { width: '0%' } });
    return(
        <div className="w-full h-[2px] lg:h-1 relative">
            
            <animated.div
                style={props}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-r-md"

            />
            

        
        </div>

    )

}


export default ProgressBar
