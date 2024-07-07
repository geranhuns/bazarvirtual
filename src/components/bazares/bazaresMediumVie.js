import { usePathname } from "next/navigation";

export default function BazarMediumView({ className, item }) {
  const pathname = usePathname();
  const { image, time, date, username } = item;
  return (
    <a
      href="promotorBazarView"
      className={`flex flex-col bg-raw-sienna-200 py-4 rounded-lg gap-2 items-center cursor-pointer w-36 md:w-40 lg:w-48  ${className}`}
    >
      <img
        className="rounded-full"
        src={image}
        width="100px"
        heigth="100px"
        alt={username}
      />
      <div className="text-center text-md w-24">
        <h3>{username}</h3>
        {pathname === "/proximosBazares" && (
          <>
            <h3>{date}</h3>
            <h3> {time}</h3>
          </>
        )}
      </div>
    </a>
  );
}
