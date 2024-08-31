"use client";

import MarcaSmallView2 from "./MarcaSmallView2";

export default function ProductoDestacadoMarca2({
  className,
  profile,
  nameMarca,
  imageProductos,
}) {
  return (
    <div
      className={`flex flex-col  bg-raw-sienna-500 rounded-md  overflow-hidden  mx-auto pt-8 ${
        className ? className : "w-full"
      }`}
    >
      <div className="">
        <MarcaSmallView2
          className={"h-3/12 flex-col "}
          profilePicture={profile}
          brand={nameMarca}
        />

        <div
          className={`  w-full grid  ${
            imageProductos.length === 1
              ? "grid-cols-1 h-full"
              : imageProductos.length === 2
              ? "grid-cols-2"
              : imageProductos.length === 3
              ? "grid-cols-2 grid-rows-2"
              : "grid-cols-2 grid-rows-2"
          } ${imageProductos.length === 4 ? "grid-rows-2" : ""}`}
        >
          {imageProductos &&
            imageProductos.slice(0, 4).map((product, index) => {
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
                  } `}
                  key={product.id}
                >
                  <img
                    className={`w-full  ${
                      imageProductos.length === 1 ? "h-[40vh]" : "h-[20vh] "
                    } object-cover overflow-hidden`}
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
