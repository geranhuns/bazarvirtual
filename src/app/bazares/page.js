import BazarMediumView from "@/components/bazares/bazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";

export default function Bazares() {
  return (
    <>
      <div className="    mx-auto  lg:max-w-screen-xl overflow-auto">
        <div className="flex flex-col  w-10/12 mx-auto items-center justify-center">
          <h2 className="self-center pt-4">Próximos Bazares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-14 py-5 ">
            <BazarMediumView />
            <BazarMediumView />
            <BazarMediumView />
            <BazarMediumView />
            <BazarMediumView />
            <BazarMediumView />
          </div>
          <CreaTuBazarBanner />
        </div>
      </div>
    </>
  );
}
