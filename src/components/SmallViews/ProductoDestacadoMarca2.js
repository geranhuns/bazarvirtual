"use client";

import MarcaSmallView2 from "./MarcaSmallView2";

export default function ProductoDestacadoMarca2({
  profile,
  nameMarca,
  imageProductos,
})

{
  
  return (
    <div className={`flex flex-col  self-start bg-raw-sienna-50  p-1  rounded-md    h-[60vh] md:h-96  md:w-80 mx-auto   `}>
      <div className="h-full w-full">
        <MarcaSmallView2 className={"h-3/12 flex-col "} profilePicture={profile}  brand={nameMarca}/>
      
        <div
          className={`h-9/12 w-full grid gap-1 ${
            imageProductos.length === 1
              ? "grid-cols-1"
              : imageProductos.length === 2
              ? "grid-cols-2"
              : imageProductos.length === 3
              ? "grid-cols-2 grid-rows-2"
              : "grid-cols-2 grid-rows-2"
          } ${imageProductos.length === 4 ? "grid-rows-2" : ""}`}>
            {imageProductos && imageProductos.slice(0, 4).map((product, index) => {
              return (
                <div
                  className={`${
                    imageProductos.length === 1
                      ? "col-span-2 row-span-2"
                      : imageProductos.length === 2
                      ? "col-span-2 flex justify-center items-center"
                      : imageProductos.length === 3
                      ? index === 2
                        ? "col-span-2 row-span-1"
                        : "col-span-1 row-span-1"
                      : ""
                  }`}
                  key={product.id}>
                  <img
                    className={`w-full p-1 ${
                      imageProductos.length === 1
                        ? "h-60"
                        : "h-[20vh] md:h-32"
                    } object-cover overflow-hidden rounded-lg`}
                    src={product.image}
                    alt={`product-${product.id}`}
                  />
                </div>
              );
            })}
        </div>


      </div>
    </div>
  );
}
