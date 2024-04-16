import ClassicBox from "../components/ClassicBox";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-10">
      <Navbar />
      <h1>Landing Page</h1>
      <ClassicBox />
    </div>
  );
}
