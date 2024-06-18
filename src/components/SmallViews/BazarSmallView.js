export default function BazarSmallView({ className }) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <img
        className="rounded-full"
        src="https://picsum.photos/100/100"
        width="100px"
        heigth="100px"
        alt="logo"
      />
      <div className="text-center text-xs w-24">
        <h3>10 - Jun</h3>
        <h3> 8:00 - 18:00</h3>
      </div>
    </div>
  );
}
