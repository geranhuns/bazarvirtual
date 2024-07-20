"use client";
import Pedido from "@/components/pedidosActivos/Pedido";
import Dropdown from "@/components/Dropdown/Dropdown";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PedidoCliente from "@/components/pedidosActivos/PedidoCliente";

export default function PedidosActivos() {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.log(error("Error decoding token:", error));
      return null;
    }
  };

  const optionsMarca = [
    "Pedidos Activos",
    "Pago Pendiente",
    "Pedidos Completados",
    "Todos los pedidos",
  ];

  const optionsCliente = ["Pendientes de entrega", "Todos los pedidos"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    }
  }, [token]);
  return (
    <div className="flex flex-col  items-center lg:max-w-screen-xl mx-auto overflow-auto ">
      <div className=" flex flex-col pt-4 md:pt-10 pb-8 w-10/12">
        {decodedToken && decodeToken.role === "marca" && (
          <>
            <Dropdown options={optionsMarca} className={"text-lg w-56"} />
            <p className="pb-8 ">
              Consulta la página de detalle del pedido para contactar al cliente
              y ponerse de acuerdo para la entrega. Una vez entregado el
              producto, ingresa el código del pedido otorgado por el cliente.
            </p>
          </>
        )}
        {decodedToken && decodeToken.role !== "marca" && (
          <>
            <Dropdown options={optionsCliente} className={"text-lg w-56"} />
            <p className="pb-8 ">
              Consulta la página de detalle del pedido para contactar a la marca
              y ponerse de acuerdo para la entrega. Una vez recibido el
              producto, comparte tu código del pedido con el representante de la
              marca.
            </p>
          </>
        )}

        <hr className="h-0.5 bg-raw-sienna-800" />
        <Pedido />
        <Pedido />
        <Pedido />
        <PedidoCliente />
      </div>
    </div>
  );
}
