"use client";
import { useSearchParams } from "next/navigation";
import Button from "../Button/Button";
export default function ProductSmallView({ item }) {
  // const [carrito, setCarrito] = useState([]);
  const { image, title, price, _id } = item;

  return (
    <div className="flex flex-col items-center bg-raw-sienna-50 py-5 px-2 rounded-md w-44">
      <a
        className="flex flex-col items-center cursor-pointer"
        href={`products/${_id}`}
      >
        <img
          className="rounded-lg"
          src={image}
          width="100px"
          height="100px"
          alt={title}
        />
        <h3 className="pt-4  text-sm line-clamp -1 ">{title}</h3>
        <h3 className="pt-1">{price}</h3>
      </a>
      <Button
        text="Agregar al carrito"
        variant="yellow"
        href=""
        className={"text-sm h-7 mt-auto"}
        onClick={() => {
          // setCarrito(carrito.push("nuevoProductoId"));
        }}
      />
    </div>
  );
}
