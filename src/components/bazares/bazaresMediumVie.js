import Button from "../Button/Button";
export default function BazarMediumView({ className }) {
  return (
    <a
      href="/vistaBazar"
      className={`flex flex-col bg-raw-sienna-200 py-4 rounded-lg gap-2 items-center cursor-pointer ${className}`}
    >
      <img
        className="rounded-full"
        src="https://picsum.photos/100/100"
        width="100px"
        heigth="100px"
        alt="logo"
      />
      <div className="text-center text-md w-24">
        <h3>10 - Jun</h3>
        <h3> 8:00 - 18:00</h3>
      </div>
    </a>
  );
}
