export default function PedidoCliente() {
  return (
    <>
      <div className="flex flex-row items-center bg-raw-sienna-50 py-5 px-4 rounded-md">
        <img
          className="rounded-sm"
          src="https://picsum.photos/200/200"
          width="100px"
          heigth="100px"
          alt="producto"
        />
        <div className="flex w-full flex-col md:flex-row space-y-3">
          <div className="pl-10 flex flex-col w-full ">
            <h3 className="  text-lg mb-3 ">Nombre del Cliente</h3>
            <h3 className="  text-base ">Título detallado del producto</h3>

            <div className="flex flex-col md:flex-row pt-2">
              <div className="flex items-center gap-4">
                <h4>Cantidad </h4>
                <h4 className="bg-raw-sienna-400 w-9 text-center text-raw-sienna-50 rounded-sm py-1">
                  1
                </h4>
              </div>
            </div>
          </div>

          <div className="flex flex-col pl-10">
            <h4>Código del pedido</h4>
            <input disabled className="border w-36" />
          </div>
        </div>
      </div>
      <h3 className="bg-raw-sienna-50 text-xl w-full text-right pr-4">
        {" "}
        $550.00
      </h3>
      <hr className="h-0.5 bg-raw-sienna-800" />
    </>
  );
}
