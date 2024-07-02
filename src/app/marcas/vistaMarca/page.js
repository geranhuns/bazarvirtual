import MarcaHeaderInfo from "@/components/Marcas/MarcaHeaderInfo";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";

export default function VistaMarca() {
  return (
    <>
      <div className=" flex flex-col w-10/12 items-center  mx-auto  lg:max-w-7xl overflow-auto ">
        <MarcaHeaderInfo
          imageURL={"https://picsum.photos/500/500"}
          altText={"marcaLogo"}
        />
        <h3>Catálogo de productos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
        </div>
      </div>
    </>
  );
}
