
import { useTranslation } from "react-i18next";
import { AiFillAlert } from "react-icons/ai";

export default function SurvivalBox() {
  const { t } = useTranslation();

  return (
    <>
      <a
        className="p-8 border-2 rounded-lg cursor-pointer border-[#d1b4ff] hover:bg-purple-400 group transition duration-500 bg-[#101010] shadow-lg shadow-black "
        href="/survival"
      >
        <div className="flex justify-center items-center gap-4 ">
          <AiFillAlert className="text-5xl text-[#edd2ff] group-hover:text-purple-100" />
          <p className="text-left text-white">
            SURVIVAL <br />{" "}
            <span className="text-[#ecc3ff] group-hover:text-white shadow-black">{t`How Long Will You Last?`}</span>
          </p>
        </div>
      </a>
    </>
  );
}