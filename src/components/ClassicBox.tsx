import { BsFillQuestionSquareFill } from "react-icons/bs";

export default function ClassicBox() {
  return (
    <section className="p-8 border border-2 rounded-lg border-[#CB812D]">
      <div className="flex justify-center items-center gap-4">
        <BsFillQuestionSquareFill className="text-5xl text-[#B88851]" />
        <p className="text-left">CLASSIC <br /> <span className="text-[#e8dca4]">Get Clues On Every Try</span></p>
      </div>
    </section>
  );
}
