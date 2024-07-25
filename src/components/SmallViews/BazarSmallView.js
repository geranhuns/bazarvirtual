export default function BazarSmallView({ className, item }) {
  const { date, time, createdBy, _id } = item;

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
      href={`bazares/${_id}`}
      className={`flex flex-col lg:flex-row  gap-2 items-center ${className}`}
    >
      <img
        className="rounded-full h-20 w-20 lg:w-auto"
        src={createdBy.profilePicture}
        width="100px"
        heigth="100px"
        alt="logo"
      />
      <div className=" text-center text-xs w-24">
        <h3 className="font-bold">{obtenerFechaFormateada(date)}</h3>
        <h3 className="font-bold"> {time}</h3>
      </div>
    </a>
  );
}
