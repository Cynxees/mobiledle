import { BsFillQuestionSquareFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";

export default function ClassicBox() {
  const { t } = useTranslation();

  return (
    <>
      <a
        className="p-8 border-2 group rounded-lg cursor-pointer border-[#CB812D]  hover:bg-[#CB812D] hover:border-[#e8dca4] transition duration-500 bg-[#101010] shadow-xl shadow-black"
        href="/classic"
      >
        <div className="flex justify-center items-center gap-4">
          <BsFillQuestionSquareFill className="text-5xl text-[#e8dca4]" />
          <p className="text-left text-white">
            CLASSIC <br />{" "}
            <span className="text-[#e8dca4] group-hover:text-white">{t`Get Clues On Every Try`}</span>
          </p>
        </div>
      </a>
    </>
  );
}
