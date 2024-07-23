import { usePathname } from "next/navigation";

export default function BazarMediumView({ className, item }) {
  const pathname = usePathname();
  const { createdBy, time, date, username } = item;

  const obtenerFechaFormateada = (fechaCompleta) => {
    // Extrae la parte de la fecha 'yyyy-MM-dd' de la cadena 'yyyy-MM-ddTHH:mm:ss.sssZ'
    if (!fechaCompleta) return "";

    const fecha = new Date(fechaCompleta);
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString("es-ES", { month: "short" });

    return `${dia}-${mes}`;
  };
  return (
    <a
      href="promotorBazarView"
      className={`flex flex-col bg-raw-sienna-200 py-4 rounded-lg gap-2 items-center cursor-pointer w-36 md:w-40 lg:w-48  ${className}`}
    >
      <img
        className="rounded-full"
        src={createdBy.profilePicture}
        width="100px"
        heigth="100px"
        alt={username}
      />
      <div className="text-center text-md w-24">
        <h3>{username}</h3>
        {pathname === "/proximosBazares" && (
          <>
            <h3 className="font-bold">{obtenerFechaFormateada(date)}</h3>
            <h3 className="font-bold"> {time}</h3>
          </>
        )}
      </div>
    </a>
  );
}
