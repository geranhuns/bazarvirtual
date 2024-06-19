import ProductWithStar from "@/components/ProductoConEstrella/ProductoConEstrella";
export default function vistaDetalladaProducto() {
  return (
    <>
      <main className="flex flex-col  items-center  mx-auto  lg:max-w-7xl overflow-auto ">
        <div className="relative inline-block pt-10 pb-8 w-10/12">
          <ProductWithStar
            imageUrl="https://picsum.photos/400/400"
            altText="Sample Product"
          />
        </div>
      </main>
    </>
  );
}
