export default function Pedido() {
  return (
    <>
      <div className="flex flex-col md:flex-row  bg-raw-sienna-50 py-5 px-4 rounded-md">
        <img
          className="rounded-md self-center"
          src="https://picsum.photos/200/200"
          width="100px"
          heigth="100px"
          alt="producto"
        />
        <div className="flex w-full flex-col md:flex-row  mt-6 md:mt-0 ">
          <div className="pl-10 flex flex-col md:flex-row md:justify-between w-full gap-4">
            <div>
              <h3 className="  text-base italic  ">Nombre del Cliente</h3>
              <h3 className="  text-lg  ">Nombre del Cliente</h3>
            </div>

            <div>
              <h3 className="  text-base italic">Producto</h3>
              <h3 className="  text-lg  ">Título del producto</h3>
            </div>

            <div className="flex  items-center gap-4">
              <h4 className="  text-base italic">Cantidad </h4>
              <h4 className="bg-raw-sienna-400 w-9 text-center text-raw-sienna-50 rounded-sm py-1">
                1
              </h4>
            </div>
            <div className="flex flex-col md:w-auto w-80 md:items-end">
              <h4 className="  text-base italic md:self-start">Estado:</h4>
              <h3 className="  text-lg  ">Pedido Activo</h3>
            </div>
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
