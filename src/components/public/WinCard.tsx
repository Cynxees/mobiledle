import { useRef } from "react";
import SurvivalBox from "../../components/navigation/SurvivalBox";

interface WinCardProps {
  winCardRef: React.RefObject<HTMLDivElement>; // Specify the type of the ref
}

const WinCard: React.FC<WinCardProps> = ({ winCardRef }) => {
  return (
    <div
      className="flex flex-col items-start gap-3 border-2 border-[#fff] bg-[#d88d43] p-5 w-1/2 rounded-lg"
      ref={winCardRef} // Attach the ref to the div
    >
      <h2 className="text-white border-b-2 border-b-white w-full text-left">Well Done!</h2>
      <h2 className="text-white">Next Mode : </h2>
      <SurvivalBox />
    </div>
  );
};

export default WinCard;
