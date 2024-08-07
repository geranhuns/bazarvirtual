"use client";
import Pedido from "@/components/pedidosActivos/Pedido";
import Dropdown from "@/components/Dropdown/Dropdown";

import { useEffect, useState } from "react";
import { useUserContext } from "@/components/UserContext/UserContext";
import { fetchPurchaseHistory } from "@/api/users/productLists/routes";

export default function PedidosActivos() {
  //falta hacer el estado del select y toda la logica correspondiente para mostrar lo que esté seleccionado.
  const [searchCategory, setSearchCategory] = useState("Todo");
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const { user } = useUserContext();

  const optionsMarca = [
    "Pedidos Activos",
    "Pago Pendiente",
    "Pedidos Completados",
    "Todos los pedidos",
  ];

  const optionsCliente = ["Entrega pendiente", "Todos los pedidos"];

  const getProductHistory = async () => {
    if (!user || !user.id) {
      console.error("User ID is not available");
      return;
    }

    try {
      const productsHistory = await fetchPurchaseHistory(user.id);

      // Inicializar el array para agrupar los productos por compra
      const allBoughtProducts = productsHistory.map((item) => {
        const { purchaseId, items } = item;
        // Crear un objeto con el purchaseId y los items de esa compra
        return {
          purchaseId,
          items,
        };
      });

      setPurchaseHistory(allBoughtProducts);
      console.log(allBoughtProducts); // Imprime la lista de compras agrupadas
    } catch (error) {
      console.error("Error fetching product history:", error);
    }
  };

  useEffect(() => {
    if (user && user.id) getProductHistory();
  }, [user]);

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
            <hr className="h-0.5 bg-raw-sienna-400" />

            {purchaseHistory.map((item) => {
              console.log(item);

              return (
                <>
                  <Pedido key={item.purchaseId} productGroup={item.items} />
                  <hr className="h-0.5 bg-raw-sienna-400" />
                </>
              );
            })}
            {/* <PedidoCliente showButton={true} />
            <PedidoCliente showButton={true} />
            <PedidoCliente showButton={true} /> */}
          </>
        )}
      </div>
    </div>
  );
}
