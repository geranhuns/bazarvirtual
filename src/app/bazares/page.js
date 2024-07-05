import BazarMediumView from "@/components/bazares/bazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";

export default function Bazares() {
  const bazares = [
    {
      id: 1,
      image: "https://picsum.photos/100/100",
      time: "10:00 AM",
      date: "10 - jul",
      name: "Bazar de Verano",
    },
    {
      id: 2,
      image: "https://picsum.photos/100/100",
      time: "12:00 PM",
      date: "15 - jul",
      name: "Bazar de Artesanías",
    },
    {
      id: 3,
      image: "https://picsum.photos/100/100",
      time: "2:00 PM",
      date: "20 - jul",
      name: "Bazar Gastronómico",
    },
    {
      id: 4,
      image: "https://picsum.photos/100/100",
      time: "4:00 PM",
      date: "25 - jul",
      name: "Bazar de Moda",
    },
    {
      id: 5,
      image: "https://picsum.photos/100/100",
      time: "6:00 PM",
      date: "30 - jul",
      name: "Bazar Nocturno",
    },
  ];

  return (
    <>
      <div className="    mx-auto  lg:max-w-screen-xl overflow-auto">
        <div className="flex flex-col  w-10/12 mx-auto items-center justify-center">
          <h2 className="self-center pt-4">Próximos Bazares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-14 py-5 ">
            {bazares.map((item) => {
              return <BazarMediumView key={item.id} item={item} />;
            })}
          </div>
          <CreaTuBazarBanner />
        </div>
      </div>
    </>
  );
}
