import { useState } from "react";
import Button from "../Button/Button";
import { markProductAsDelivered } from "@/api/orders/routes";
import { userAgent } from "next/server";

export default function PedidoGrupo({
  producto,
  onProductDelivered,
  userRole,
}) {
  const [pendingDelivery, setPendingDelivery] = useState(
    producto.pendingDelivery
  );

  const markProductAsReceived = async () => {
    await markProductAsDelivered(producto.purchaseId, producto.productId._id);
    setPendingDelivery(false);
    onProductDelivered(producto.purchaseId, producto.productId._id);
  };

  return (
    <div className="flex flex-row bg-raw-sienna-50 md:py-5 px-4 rounded-md mb-3 items-center">
      <a
        href={`/productos/${producto.productId._id}`}
        className="w-28 h-28 overflow-hidden rounded-md"
      >
        <img
          className="rounded-md self-center w-full  object-cover"
          src={producto.productId.productImage}
          width="100px"
          height="100px"
          alt="producto"
        />
      </a>
      <div className="flex w-full flex-col md:flex-row my-2 md:mt-0 items-center">
        <div className="pl-10 flex flex-col md:flex-row md:justify-between w-full md:gap-4">
          <div className="hidden md:flex flex-col">
            <h3 className="text-base italic">Nombre de la Marca</h3>
            <h3 className="text-lg">{producto.brandId?.username}</h3>
          </div>
          <div className="md:w-40">
            <h3 className="text-base italic">Producto</h3>
            <h3 className="md:text-lg">{producto.productId.title}</h3>
          </div>
          <div className="flex md:flex-col gap-2 items-center">
            <h4 className="text-base italic">Cantidad</h4>
            <h4 className="bg-raw-sienna-200 w-9 text-center text-raw-sienna-900 rounded-sm py-1">
              {producto.quantity}
            </h4>
          </div>
          <div className="flex flex-col gap-2 md:items-center mt-1">
            <h4 className="text-base italic">Referencia</h4>
            <h4 className=" text-center text-raw-sienna-900 rounded-sm py-1 bg-raw-sienna-100">
              {producto.purchaseId.slice(20)}
            </h4>
          </div>
        </div>
        {pendingDelivery && userRole === "cliente" && (
          <div className="flex flex-col pl-10 md:items-start md:mt-0 items-center md:pt-0 mt-2">
            <Button
              text={"Recibido"}
              type={"button"}
              variant={"yellow"}
              className={"px-6"}
              onClick={markProductAsReceived}
            />
          </div>
        )}
        {!pendingDelivery && userRole === "cliente" && (
          <div className="flex flex-col pl-10 md:items-start md:mt-0 items-center md:pt-0 mt-2">
            <h3 className="text-center">¡Gracias por tu compra!</h3>
          </div>
        )}
        {!pendingDelivery && userRole === "marca" && (
          <div className="flex flex-col pl-10 md:items-start md:mt-0 items-center md:pt-0 mt-2 w-56">
            <h3 className="text-center">¡Venta registrada!</h3>
          </div>
        )}
        {pendingDelivery && userRole === "marca" && (
          <div className="flex flex-col pl-10 md:items-start md:mt-0 items-center md:pt-0 mt-2 w-56">
            <h3 className="text-center">
              Contacta al cliente para coordinar la entrega
            </h3>
          </div>
        )}
      </div>
      <hr className="h-0.5 bg-raw-sienna-400" />
    </div>
  );
}
