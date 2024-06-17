import ProximosBazares from "@/components/ProximosBazaresBanner/ProximosBazaresBanner";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
export default function Home() {
  return (
    <main className="flex flex-col    mx-auto  lg:max-w-7xl overflow-auto ">
      <div className="flex flex-col w-10/12 mx-auto  lg:max-w-7xl items-center">
        <ProximosBazares className="  " />
        <h2 className="pt-6 text-xl">Productos destacados</h2>
        <div className=" grid grid-cols-4 gap-4 py-5 px-20">
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
        </div>
      </div>
    </main>
  );
}
