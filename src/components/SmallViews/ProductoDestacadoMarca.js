import Button from "../Button/Button";
import MarcaSmallView from "./MarcaSmallView";
import Link from "next/link";
export default function ProductoDestacadoMarca() {
  return (
    <div className="flex flex-col items-center justify-center bg-raw-sienna-50 py-5 rounded-md w-11/12">
      <Link
        className="flex flex-col gap-4 items-center cursor-pointer w-full"
        href="/vistaDetalladaProducto"
      >
        <MarcaSmallView className={" flex-col"} />
        <div className="grid grid-cols-2 md:w-full ">
          <img
            className=" "
            src="https://picsum.photos/200/200"
            width="200px"
            heigth="200px"
            alt="producto"
          />

          <img
            className=" "
            src="https://picsum.photos/200/200"
            width="200px"
            heigth="200px"
            alt="producto"
          />

          <img
            className=" "
            src="https://picsum.photos/200/200"
            width="200px"
            heigth="200px"
            alt="producto"
          />

          <img
            className=" "
            src="https://picsum.photos/200/200"
            width="200px"
            heigth="200px"
            alt="producto"
          />
        </div>
        <Button
          text={"Ver más"}
          href={"marcas/vistaMarca"}
          variant={"yellow"}
        />
      </Link>
    </div>
  );
}
