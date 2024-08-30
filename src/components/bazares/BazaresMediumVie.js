"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BazarMediumView({ className, item, createdBy }) {
  console.log(item);
  const pathname = usePathname();
  const { profilePicture, time, date, username, _id } = item;

  const [redirect, setRedirect] = useState();
  const obtenerFechaFormateada = (fechaCompleta) => {
    if (!fechaCompleta) return "";

    // Crea un nuevo objeto Date en UTC
    const fecha = new Date(fechaCompleta);

    // Obtén el año, mes y día en UTC
    const dia = fecha.getUTCDate();
    const mes = fecha.toLocaleString("es-ES", {
      month: "short",
      timeZone: "UTC",
    });

    return `${dia}-${mes}`;
  };

  const sendTo = () => {
    if (createdBy) {
      setRedirect(createdBy._id);
    } else {
      setRedirect(_id);
    }
  };
  useEffect(() => {
    sendTo();
  }, []);
  return (
    <a
      href={`bazares/${redirect}?date=${item._id}`}
      className={`flex flex-col bg-raw-sienna-200  px-16 rounded-lg gap-2 items-center cursor-pointer   ${className} text-raw-sienna-900  pt-8 `}
    >
      <div className="w-36 h-36">
        <img
          className="object-cover h-full w-full rounded-full"
          src={createdBy?.profilePicture || item.profilePicture}
          alt={username}
        />
      </div>
      <div className="text-center text-2xl py-6">
        <h3>{createdBy?.username}</h3>
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
