import { useEffect, useState } from "react";
import Button from "../Button/Button";
export default function PedidoGrupo({ showButton, singleProduct, quantity }) {
  //Onclick del button se debe actualizar en la base de datos el deliveryPending del item seleccionado
  return (
    <>
      <div className="flex flex-row  bg-raw-sienna-50 md:py-5 px-4 rounded-md">
        <img
          className="rounded-md self-center"
          src={singleProduct.productImage}
          width="100px"
          heigth="100px"
          alt="producto"
        />
        <div className="flex w-full flex-col md:flex-row  my-2 md:mt-0 items-center ">
          <div className="pl-10 flex flex-col md:flex-row md:justify-between w-full md:gap-4">
            <div className="hidden md:flex flex-col">
              <h3 className="  text-base italic  ">Nombre de la Marca</h3>
              <h3 className="  text-lg  ">
                {singleProduct.createdBy.username}
              </h3>
            </div>

            <div>
              <h3 className="  text-base italic">Producto</h3>
              <h3 className="  md:text-lg  ">{singleProduct.title}</h3>
            </div>

            <div className="flex md:flex-col gap-2 items-center ">
              <h4 className="  text-base italic">Cantidad </h4>
              <h4 className="bg-raw-sienna-200 w-9 text-center text-raw-sienna-900 rounded-sm py-1">
                {quantity}
              </h4>
            </div>
          </div>
          {showButton && (
            <div className="flex flex-col pl-10 md:items-start md:mt-0 items-center md:pt-0 mt-2 ">
              <Button
                text={"Recibido"}
                type={"button"}
                variant={"yellow"}
                className={"px-6"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
