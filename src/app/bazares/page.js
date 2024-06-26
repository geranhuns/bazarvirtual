import BazarMediumView from "@/components/bazares/bazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";

export default function Bazares() {
  return (
    <>
      <main className="flex flex-col    mx-auto  lg:max-w-7xl overflow-auto ">
        <div className="flex flex-col w-10/12 mx-auto  ">
          <h2 className="self-center pt-4">Próximos Bazares</h2>
          <div className="grid grid-cols-4 gap-4 py-5 px-20">
            <BazarMediumView />
            <BazarMediumView />
            <BazarMediumView />
            <BazarMediumView />
            <CreaTuBazarBanner />
          </div>
        </div>
      </main>
    </>
  );
}
