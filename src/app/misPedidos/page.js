"use client";
import Pedido from "@/components/pedidosActivos/Pedido";
import PedidoGrupo from "@/components/pedidosActivos/PedidoGrupo";
import Dropdown from "@/components/Dropdown/Dropdown";

import { useEffect, useState } from "react";
import { useUserContext } from "@/components/UserContext/UserContext";
import { fetchClientPurchases } from "@/api/orders/routes";

export default function PedidosActivos() {
  //falta hacer el estado del select y toda la logica correspondiente para mostrar lo que esté seleccionado.
  const [searchCategory, setSearchCategory] = useState("Todos los pedidos");
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

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
      const productsHistory = await fetchClientPurchases(user.id);

      setPurchaseHistory(productsHistory.data);
    } catch (error) {
      console.error("Error fetching product history:", error);
    }
  };

  useEffect(() => {
    if (searchCategory !== "Todos los pedidos") {
      setDisplayedProducts(
        purchaseHistory.filter((producto) => producto.pendingDelivery)
      );
    } else {
      setDisplayedProducts(purchaseHistory);
    }
  }, [searchCategory, purchaseHistory]);

  useEffect(() => {
    if (user && user.id) getProductHistory();
  }, [user]);

  const handleProductDelivered = (deliveredPurchaseId, deliveredProductId) => {
    setPurchaseHistory((prevProducts) =>
      prevProducts.filter(
        (product) =>
          !(
            product.purchaseId === deliveredPurchaseId &&
            product.productId._id === deliveredProductId
          )
      )
    );
  };

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
            <select
              id="changeDisplayedProducts"
              value={searchCategory} // Asegúrate de que 'quantity' sea un valor primitivo
              onChange={(e) => {
                setSearchCategory(e.target.value); // Pasar el valor como string
              }}
              className={`h-8 text-lg w-56 pl-1  bg-raw-sienna-200 text-raw-sienna-900 `}
            >
              {user.role === "cliente" &&
                optionsCliente.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              {user.role === "marca" &&
                optionsCliente.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
            <p className="pb-8 ">
              Consulta la página de detalle del pedido para contactar a la marca
              y ponerse de acuerdo para la entrega. Una vez recibido el
              producto, da click en el botón Recibido.
            </p>
            <hr className="h-0.5 bg-raw-sienna-400" />
            <div>
              {displayedProducts.map((item) => {
                console.log(item._id);
                return (
                  <PedidoGrupo
                    key={item._id}
                    producto={item}
                    onProductDelivered={handleProductDelivered}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
