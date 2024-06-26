import Button from "../Button/Button";
import MarcaSmallView from "./MarcaSmallView";
import Link from "next/link";
export default function ProductoDestacadoMarca() {
  return (
    <div className="flex flex-col items-center bg-raw-sienna-50 py-5 px-4 rounded-md ">
      <Link
        className="flex flex-col gap-4 items-center cursor-pointer"
        href="/vistaDetalladaProducto"
      >
        <MarcaSmallView className={" flex-col "} />

        <h3 className="text-base">Producto Destacado</h3>
        <img
          className="rounded-lg "
          src="https://picsum.photos/200/200"
          width="100px"
          heigth="100px"
          alt="producto"
        />
        <Button
          text={"Ver más"}
          href={"marcas/vistaMarca"}
          variant={"yellow"}
        />
      </Link>
    </div>
  );
}
