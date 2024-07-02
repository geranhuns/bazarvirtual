import ProximosBazares from "@/components/ProximosBazaresBanner/ProximosBazaresBanner";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
export default function Home() {
  const productsExample = [
    {
      id: 1,
      image: "https://picsum.photos/200/200",
      title: "Camiseta Deportiva",
      description: "Camiseta de alta calidad, ideal para hacer deporte.",
      price: 19.99,
      brand: "SportBrand",
    },
    {
      id: 2,
      image: "https://picsum.photos/200/200",
      title: "Zapatillas de Running",
      description:
        "Zapatillas ligeras y cómodas para correr largas distancias.",
      price: 49.99,
      brand: "RunFast",
    },
    {
      id: 3,
      image: "https://picsum.photos/200/200",
      title: "Auriculares Inalámbricos padrísimos",
      description:
        "Auriculares con cancelación de ruido y batería de larga duración.",
      price: 89.99,
      brand: "SoundMagic",
    },
    {
      id: 4,
      image: "https://picsum.photos/200/200",
      title: "Mochila para Laptop",
      description: "Mochila resistente al agua con múltiples compartimentos.",
      price: 39.99,
      brand: "UrbanGear",
    },
    {
      id: 5,
      image: "https://picsum.photos/200/200",
      title: "Reloj Inteligente",
      description:
        "Reloj con monitor de actividad física y notificaciones inteligentes.",
      price: 99.99,
      brand: "TechTime",
    },
  ];

  return (
    <div className="flex flex-col    mx-auto  lg:max-w-screen-xl overflow-auto ">
      <div className="flex flex-col w-10/12 mx-auto lg:max-w-screen-xl items-center">
        <ProximosBazares className="" />
        <h2 className="pt-6 text-xl">Productos destacados</h2>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
          {productsExample.map((item) => {
            return <ProductSmallView key={item.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
