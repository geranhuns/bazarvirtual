import Button from "../Button/Button";
export default function ProductSmallView() {
  return (
    <div className="flex flex-col items-center bg-raw-sienna-50 py-5 px-4 rounded-md">
      <img
        className="rounded-lg"
        src="https://picsum.photos/200/200"
        width="100px"
        heigth="100px"
        alt="producto"
      />
      <h3 className="text-center text-sm">Título detallado del producto</h3>
      <h3 className="text-xs"> $550.00</h3>
      <Button text="Agregar al carrito" variant="yellow" href="/product1" />
    </div>
  );
}
