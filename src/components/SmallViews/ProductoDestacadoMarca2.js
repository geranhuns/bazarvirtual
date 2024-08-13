"use client";

import MarcaSmallView2 from "./MarcaSmallView";

export default function ProductoDestacadoMarca2({profile , nameMarca, imageProductos}) {
console.log(imageProductos)

  return (
    <div
      className={`flex flex-col  self-start bg-raw-sienna-50  py-5  rounded-md    h-[60vh] md:h-96 border-4`}
    >
      
        <div className="h-full w-full">
          <MarcaSmallView2
            className={"h-3/12 flex-col"}
            profilePicture={profile}
            brand={nameMarca}
          />
          {/* este es de 4 imagenes */}
          <div className="h-9/12 w-full grid grid-cols-2  ">
            {imageProductos &&
              imageProductos.slice(0, 4).map((product) => {
                return (
                  <div >
                    <img
                      className="w-full h-[20vh] md:h-32  object-cover overflow-hidden"
                      src={product}
                      width="200px"
                      heigth="200px"
                      // alt={pro}
                    />
                  </div>
                );
              })}
          </div>
        </div>
    </div>
  );
}
