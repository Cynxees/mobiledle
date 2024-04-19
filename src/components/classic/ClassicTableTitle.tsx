import { useTranslation } from "react-i18next";

export default function ClassicTableTitle() {
  const { t } = useTranslation();
  return (
    <section className="flex w-full gap-2 justify-center">
      <div className="border-b-2 pb-2 border-[#B88851] w-20 grow">{t`Hero`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] w-20 grow">{t`Gender`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] w-20 grow">{t`Role`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] w-20 grow">{t`Lane`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] w-20 grow">{t`Region`}</div>
      <div className="border-b-2 pb-2 border-[#B88851] w-20 grow">{t`Year`}</div>
    </section>
  );
}
