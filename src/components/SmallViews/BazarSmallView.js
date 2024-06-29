export default function BazarSmallView({ className }) {
  return (
    <a
      href="promotorBazarView"
      className={`flex flex-col lg:flex-row  gap-2 items-center ${className}`}
    >
      <img
        className="rounded-full h-20 w-20 lg:w-auto"
        src="https://picsum.photos/100/100"
        width="100px"
        heigth="100px"
        alt="logo"
      />
      <div className=" text-center text-xs w-24">
        <h3 className="hidden md:block">10 - Jun</h3>
        <h3 className="hidden lg:block"> 8:00 - 18:00</h3>
      </div>
    </a>
  );
}
