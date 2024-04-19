import ClassicBox from "../components/navigation/ClassicBox";
import Navbar from "../components/Navbar";
import SurvivalBox from "../components/navigation/SurvivalBox";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-10">
      <Navbar />
      <ClassicBox />
      <SurvivalBox />
    </div>
  );
}
