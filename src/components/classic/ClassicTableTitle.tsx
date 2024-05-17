import { useTranslation } from "react-i18next";

export default function ClassicTableTitle() {
  const { t } = useTranslation();
  return (
    <section className="flex w-full gap-1 md:gap-2 justify-center">
      <div className="border-b-2 pb-2 border-[#B88851] md:w-28 xs:w-14 w-12">{t`Hero`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] md:w-28 xs:w-14 w-12">{t`Gender`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] md:w-28 xs:w-14 w-12">{t`Role`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] md:w-28 xs:w-14 w-12">{t`Lane`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] md:w-28 xs:w-14 w-12">{t`Region`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] md:w-28 xs:w-14 w-12">{t`Year`}</div>
    </section>
  );
}
