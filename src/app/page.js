import ProximosBazares from "@/components/ProximosBazaresBanner/ProximosBazaresBanner";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
export default function Home() {
  return (
    <main className="flex flex-col    mx-auto  lg:max-w-7xl overflow-auto ">
      <div className="flex flex-col w-10/12 mx-auto  lg:max-w-7xl items-center">
        <ProximosBazares className="  " />
        <div className=" grid grid-cols-4 gap-4 py-10 px-20">
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
