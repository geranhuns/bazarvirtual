"use client";
import Pedido from "@/components/pedidosActivos/Pedido";
import Dropdown from "@/components/Dropdown/Dropdown";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PedidoCliente from "@/components/pedidosActivos/PedidoCliente";
import { useUserContext } from "@/components/UserContext/UserContext";

export default function PedidosActivos() {
  const [searchCategory, setSearchCategory] = useState("Todo");

  const { user } = useUserContext();

  const optionsMarca = [
    "Pedidos Activos",
    "Pago Pendiente",
    "Pedidos Completados",
    "Todos los pedidos",
  ];

  const optionsCliente = ["Entrega pendiente", "Todos los pedidos"];

  return (
    <div className="flex flex-col  items-center lg:max-w-screen-xl mx-auto overflow-auto ">
      <div className=" flex flex-col pt-4 md:pt-10 pb-8 w-10/12">
        {user.role === "marca" && (
          <>
            <Dropdown
              options={optionsMarca}
              className={"text-lg w-56"}
              setSearchCategory={setSearchCategory}
            />
            <p className="pb-8 ">
              Consulta la página de detalle del pedido para contactar al cliente
              y ponerse de acuerdo para la entrega. Una vez entregado el
              producto, solicita al cliente dar click en el botón Recibido.
            </p>
            <hr className="h-0.5 bg-raw-sienna-800" />
            <Pedido />
            <Pedido />
            <Pedido />
            <Pedido />
          </>
        )}
        {user.role !== "marca" && (
          <>
            <Dropdown
              options={optionsCliente}
              className={"text-lg w-56"}
              setSearchCategory={setSearchCategory}
            />
            <p className="pb-8 ">
              Consulta la página de detalle del pedido para contactar a la marca
              y ponerse de acuerdo para la entrega. Una vez recibido el
              producto, da click en el botón Recibido.
            </p>
            <hr className="h-0.5 bg-raw-sienna-800" />
            <PedidoCliente showButton={true} />
            <PedidoCliente showButton={true} />
            <PedidoCliente showButton={true} />
            <PedidoCliente showButton={true} />
          </>
        )}
      </div>
    </div>
  );
}
