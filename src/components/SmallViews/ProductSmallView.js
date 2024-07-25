import { useRouter } from "next/navigation";
import Button from "../Button/Button";
export default function ProductSmallView({ item }) {
  const router = useRouter();
  // const [carrito, setCarrito] = useState([]);
  const { productImage, title, price, _id } = item;
  const redirectProductView = () => router.push(`/productos/${_id}`);

  return (
    <div
      onClick={() => {
        redirectProductView();
      }}
      className="flex flex-col items-center bg-raw-sienna-50 py-5 px-2 rounded-md w-44"
    >
      <div
        className="flex flex-col items-center cursor-pointer"
        // href={`products/${_id}`}
      >
        <div className="w-24 h-24 overflow-hidden rounded-lg">
          <img
            className=" object-contain "
            src={productImage}
            width="100px"
            height="100px"
            alt={title}
          />
        </div>
        <h3 className="pt-4  text-sm line-clamp -1 ">{title}</h3>
        <h3 className="pt-1">${price}</h3>
      </div>
      <Button
        text="Agregar al carrito"
        variant="yellow"
        type="button"
        className={"text-sm h-7 mt-auto"}
        onClick={() => {
          // setCarrito(carrito.push("nuevoProductoId"));
        }}
      />
    </div>
  );
}
