import { useTranslation } from "react-i18next";

export default function ColorIndicator() {
  const { t } = useTranslation();
  return (
    <div className="border-2 py-4 mx-auto border-[#CB812D] rounded-md sm:w-96 w-[90%]">
      <h3>{t`Color Indicator`}</h3>
      <div className="flex gap-5 justify-center mt-5">
        <span className="flex flex-col items-center">
          <div className="bg-green-600 w-8 h-8"></div>
          <p>{t`Correct`}</p>
        </span>
        <span className="flex flex-col items-center">
          <div className="bg-red-700 w-8 h-8"></div>
          <p>{t`Incorrect`}</p>
        </span>
        <span className="flex flex-col items-center">
          <div className="bg-orange-600 w-8 h-8"></div>
          <p>{t`Partial`}</p>
        </span>
      </div>
    </div>
  );
}
