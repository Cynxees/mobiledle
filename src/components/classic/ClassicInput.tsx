import { GoPaperAirplane } from "react-icons/go";

export default function ClassicInput() {
  return (
    <div className="flex items-center gap-4 bg-[#B88851] rounded-md px-3 w-96">
        <input
          type="text"
          className="my-2 h-10 pl-3 w-full rounded-md outline-none"
        />
        <GoPaperAirplane className="text-4xl cursor-pointer" />
      </div>
  );
}
