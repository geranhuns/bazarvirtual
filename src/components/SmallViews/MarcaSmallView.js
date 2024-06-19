export default function MarcaSmallView(className) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <img
        className="rounded-full"
        src="https://picsum.photos/100/100"
        width="50px"
        heigth="50px"
        alt="logo"
      />
      <div className="text-center text-xs w-24">
        <h3>NombreDeMarca</h3>
      </div>
    </div>
  );
}
