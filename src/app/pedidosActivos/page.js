import Pedido from "@/components/pedidosActivos/Pedido";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function PedidosActivos() {
  const options = [
    "Pedidos Activos",
    "Pago Pendiente",
    "Pedidos Completados",
    "Todos los pedidos",
  ];
  return (
    <div className="flex flex-col  items-center lg:max-w-screen-xl mx-auto overflow-auto ">
      <div className=" flex flex-col pt-4 md:pt-10 pb-8 w-10/12">
        <Dropdown options={options} className={"text-lg w-56"} />
        <p className="pb-8 ">
          Consulta la página de detalle del pedido para contactar al cliente y
          ponerse de acuerdo para la entrega. Una vez entregado el producto,
          ingresa el código del pedido otorgado por el cliente.
        </p>

        <hr className="h-0.5 bg-raw-sienna-800" />
        <Pedido />
        <Pedido />
        <Pedido />
        <Pedido />
      </div>
    </div>
  );
}
