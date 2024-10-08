import { useEffect, useState } from "react";
import Button from "../Button/Button";
export default function PedidoCliente({ showButton, singleProduct, quantity }) {
  return (
    <>
      <div className="flex flex-col md:flex-row  bg-raw-sienna-50 py-5 px-4 ">
        <img
          className="rounded-md self-center"
          src={singleProduct.productImage}
          width="100px"
          heigth="100px"
          alt="producto"
        />
        <div className="flex w-full flex-col md:flex-row  mt-6 md:mt-0 ">
          <div className="pl-10 flex flex-col md:flex-row md:justify-between w-full gap-4">
            <div>
              <h3 className="  text-base italic  ">Nombre de la Marca</h3>
              <h3 className="  text-lg  ">
                {singleProduct.createdBy.username}
              </h3>
            </div>

            <div>
              <h3 className="  text-base italic">Producto</h3>
              <h3 className="  text-lg  ">{singleProduct.title}</h3>
            </div>

            <div className="flex flex-col items-center ">
              <h4 className="  text-base italic">Cantidad </h4>
              <h4 className="bg-raw-sienna-400 w-9 text-center text-raw-sienna-50 rounded-sm py-1">
                {quantity}
              </h4>
            </div>
          </div>
          {showButton && (
            <div className="flex flex-col pl-10 md:items-start md:mt-0 items-center md:pt-0 mt-6 ">
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
      <h3 className="bg-raw-sienna-50 text-xl w-full text-right pr-4">
        ${singleProduct.price}
      </h3>
      <hr className="h-0.5 bg-raw-sienna-800" />
    </>
  );
}
