import ColorIndicator from "../components/ColorIndicator";
import HeroShowBar from "../components/HeroShowBar";
import Navbar from "../components/Navbar";
import ClassicInput from "../components/classic/ClassicInput";

export default function ClassicPage() {
  return (
    <section className="flex flex-col gap-10 items-center">
      <Navbar />
      <ClassicInput />
      <HeroShowBar />
      <ColorIndicator />
    </section>
  );
}
