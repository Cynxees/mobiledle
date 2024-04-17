import { BsFillQuestionSquareFill } from "react-icons/bs";

export default function ClassicBox() {
  return (
    <a className="p-8 border-2 rounded-lg cursor-pointer border-[#CB812D]" href="/classic">
      <div className="flex justify-center items-center gap-4">
        <BsFillQuestionSquareFill className="text-5xl text-[#B88851]" />
        <p className="text-left text-white">CLASSIC <br /> <span className="text-[#e8dca4]">Get Clues On Every Try</span></p>
      </div>
    </a>
  );
}
