export default function BazarSmallView({ className, item }) {
  const { image, date, time } = item;
  return (
    <a
      href="promotorBazarView"
      className={`flex flex-col lg:flex-row  gap-2 items-center ${className}`}
    >
      <img
        className="rounded-full h-20 w-20 lg:w-auto"
        src={image}
        width="100px"
        heigth="100px"
        alt="logo"
      />
      <div className=" text-center text-xs w-24">
        <h3 className="font-bold">{date}</h3>
        <h3 className="font-bold"> {time}</h3>
      </div>
    </a>
  );
}
