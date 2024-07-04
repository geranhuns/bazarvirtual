export default function MarcaSmallView({ className, brand }) {
  return (
    <a
      href="marcas/vistaMarca"
      className={`flex gap-2 items-center ${className}`}
    >
      <img
        className="rounded-full"
        src="https://picsum.photos/100/100"
        width="50px"
        heigth="50px"
        alt="logo"
      />
      <div className="text-center text-xs w-24">
        <h3>{brand}</h3>
      </div>
    </a>
  );
}
