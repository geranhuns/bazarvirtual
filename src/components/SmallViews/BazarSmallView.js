export default function BazarSmallView({ className, item }) {
  const { date, time, createdBy } = item;
 
  const obtenerFechaFormateada = (fechaCompleta) => {
   
    if (!fechaCompleta) return "";

        const fecha = new Date(fechaCompleta);
        const dia = fecha.getUTCDate(); // Obtener el día en UTC
        const mes = fecha.toLocaleString("es-ES", { month: "short", timeZone: "UTC" }); // Obtener el mes en UTC

        return `${dia}-${mes}`;
  };

  return (
    <a
      href={`bazares/${createdBy._id}?date=${item._id}`}
      className={`flex flex-col lg:flex-row  gap-2 items-center ${className}`}
    >
      <div className=" h-20 w-20  rounded-full">
        <img
          className="rounded-full h-full  object-cover"
          src={createdBy.profilePicture}
          width="100px"
          heigth="100px"
          alt="logo"
        />
      </div>
      <div className=" text-center w-24">
        <h3 className="font-bold">{obtenerFechaFormateada(date)}</h3>
        <h3 className="font-bold"> {time}</h3>
      </div>
    </a>
  );
}
