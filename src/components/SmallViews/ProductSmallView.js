import Button from "../Button/Button";
export default function ProductSmallView() {
  return (
    <div className="flex flex-col items-center">
      <img
        className="rounded-lg"
        src="https://picsum.photos/200/200"
        width="100px"
        heigth="100px"
        alt="logo"
      />
      <h3>Título detallado del producto</h3>
      <h3> $550.00</h3>
      <Button text="Agregar al carrito" variant="yellow" href="/product1" />
    </div>
  );
}
