"use client";
import { useState, React, useEffect, useContext, useCallback } from "react";
import { useParams } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoTiktok } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Carrucel from "@/components/promotorBazar/Carrucel";
import FormNewDate from "@/components/promotorBazar/FormNewDate";
import CardEventDetail from "@/components/promotorBazar/CardEventDetail";
import FormEditProfileBazar from "@/components/promotorBazar/FormEditProfileBazar";
import CardEvent from "@/components/promotorBazar/CardEvent";
import AddEspecialEvents from "@/components/promotorBazar/AddEspecialEvents";
import {
  dataUserBazarFetch,
  datesBazarFetch,
  deletePastDates,
} from "@/api/bazar/routes";
import { HeaderContext } from "@/components/HContext/HeaderContext";
import { useUserContext } from "@/components/UserContext/UserContext";
import Swal from "sweetalert2";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function PromotorVistaId() {
  const [open, setOpen] = useState(false);//monitorea si el form para agregar fecha esta abierto o cerrado
  const [dataUser, setDataUser] = useState({}); //contiene los datos de peril del user
  const [datesBazar, setDatesBazar] = useState([]); //contiene las fechas del bazarUser
  const [dataDate, setDataDate] = useState({}); //contiene un obj con los eventos especiales, lugar, fecha y marcasCurso de la fecha que se selecciona
  const [idDate, setIdDate] = useState(""); //state que almacena el id de la date seleccionada, es para pasarselo a los events
  const [openEdDate, setOpenEdDate] = useState(false); //monitorea estado para abrir editarDate
  const [openAddEspEvent, setOpenAddEspEvent]= useState(false) //monitorea estado de abierto o cerrado de form de especialEvents
  const { active, setActive } = useContext(HeaderContext); //monitorea estado para brir form edit profile
  const [editButtonsActive, setEditButtonsActive] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const [currentDate, setCurrentDate] = useState(""); //almacena la fecha del dia


  const pathname = usePathname();

  const redesSociales = dataUser.socialNetworks;
  const params = useParams();
  const id = params.id;

  const { user } = useUserContext();
  const loggedUserId = user.id;

  const dateToday = () => {
    const today = new Date();
    const isoLocalDate = today.toLocaleDateString("sv-SE"); // Formato ISO pero en tu zona horaria local
    setCurrentDate(isoLocalDate);
  };

  const filterPastDates = (array) => {
    if (!Array.isArray(array)) {
      console.error("El valor proporcionado no es un array");
      return;
    }
    const futureDates = [];

    array.forEach((date) => {
      if (new Date(date.date) < new Date(currentDate)) {
        deletePastDates(date._id);
        fetchDataDates();
        // Aquí deberías llamar a la función para eliminar la fecha si es necesario
      } else {
        futureDates.push(date);
      }
    });
    return futureDates;
  };

  const fetchData = useCallback(async () => {
    try {
      const userData = await dataUserBazarFetch(id);
      setDataUser(userData.data);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  }, [id]);

  const fetchDataDates = useCallback(async () => {
    try {
      const bazarDates = await datesBazarFetch(id);
      //ordenar de mas proxima a las remota
      const orderDates = bazarDates.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setDatesBazar(orderDates);
    } catch (error) {
      console.error("Error al obtener las fechas del bazar:", error);
    }
  }, [id]);

  const handleNewDates = () => {
    if (datesBazar.length === 3) {
      Swal.fire({
        title: "¡Alcanzaste el número máximo de fechas!",
        text: "Espera a que culmine la fecha más próxima o elimina alguna.",
        icon: "warning",
      });
    } else {
      setOpen(!open);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataDates();
    dateToday();

    if (id === loggedUserId) {
      setEditButtonsActive(true);
    }
  }, []);

  useEffect(() => {
    const filteredDates = filterPastDates(datesBazar);
    if (JSON.stringify(filteredDates) !== JSON.stringify(datesBazar)) {
      setDatesBazar(filteredDates);
      //probar aqui borrar dataDate
    }
    const dateParam = new URLSearchParams(window.location.search).get("date");

    if (dateParam) {
      const selectedDate = datesBazar.find((date) => date._id === dateParam);
      if (selectedDate) {
        setDataDate(selectedDate);
        setIdDate(selectedDate._id);
      }
    } else if (datesBazar.length > 0) {
      const now = new Date();
      const closestDate = datesBazar.reduce((closest, current) => {
        const currentDate = new Date(current.date);
        if (
          closest === null ||
          Math.abs(currentDate - now) < Math.abs(new Date(closest.date) - now)
        ) {
          return current;
        }
        return closest;
      }, null);

      if (closestDate) {
        setDataDate(closestDate);
        setIdDate(closestDate._id);

        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set("date", closestDate._id);
        const newUrl = `${pathname}?${newSearchParams.toString()}`;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [datesBazar, pathname]);

  useEffect(() => {
    const nameMarca = localStorage.getItem("brandUsername");
    if (Array.isArray(dataDate.marcasCurso)) {
      const exists = dataDate.marcasCurso.some(
        (obj) => obj.nameMarca === nameMarca
      );
      setIsParticipant(exists);
    }
  }, [dataDate]);

  const handleropenFormAddEspEve = ()=>{
    setOpenAddEspEvent(!openAddEspEvent)
  }

  return (
    <section className="relative w-full   min-h-screen lg:max-w-screen-xl flex flex-col  overflow-auto mx-auto ">
      {(openEdDate || open) && (
        <FormNewDate
          idDate={idDate}
          datesBazar={datesBazar}
          fetchDataDates={fetchDataDates}
          _idUser={dataUser._id}
          open={open}
          setOpen={setOpen}
          openEdDate={openEdDate}
          setOpenEdDate={setOpenEdDate}
          updateSelectDate={setDataDate}
        />
      )}
      {active && (
        <FormEditProfileBazar
          active={active}
          setActive={setActive}
          setDataUserMain={setDataUser}
        />
      )}
      {openAddEspEvent &&(
        <AddEspecialEvents openAddEspEvent={openAddEspEvent} setOpenAddEspEvent={setOpenAddEspEvent} idDate={idDate} fetchDataDates={fetchDataDates}/>
      )}

      <div className="bg-patina-500  w-10/12 flex  items-center justify-around  p-10 mx-auto flex-col lg:flex-row my-10 rounded-xl drop-shadow-lg ">
        <div className=" w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden flex justify-center mb-10 lg:mb-0 drop-shadow-lg">
          <img
            className="object-cover w-full h-full"
            src={dataUser.profilePicture}
            alt=""
          />
        </div>

        <div className=" text-raw-sienna-50 lg:w-7/12 lg:h-5/6  flex flex-col justify-between  items-center w-full drop-shadow-lg">
          <div className="bg-patina-900 rounded-xl w-9/12 h-4/6 flex flex-col justify-center items-center  mb-10 max-md:w-11/12 max-sm:w-full p-4 space-y-4">
            <h2 className=" text-xl md:text-4xl  font-semibold  text-center ">
              {dataUser.username}
            </h2>
            <div className=" text-lg font-medium flex flex-col  justify-center items-center ">
              <span>{dataUser.webPage}</span>
              {/* meter en un <a> */}
            </div>
            <div className=" flex justify-center items-center gap-x-4 ">
              {id === user.id && redesSociales?.length === 0 && (
                <h3 className="text-center px-10">
                  Completa tu perfil para mostrar tus redes sociales y página
                  web
                </h3>
              )}
              {redesSociales &&
                redesSociales.map((red) => {
                  if (red.platform === "facebook" && red.url != "") {
                    return (
                      <a
                        key={red._id}
                        href={`http://${red.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookF className="w-9 h-9  max-sm:w-auto " />
                      </a>
                    );
                  }
                  if (red.platform === "instagram" && red.url != "") {
                    return (
                      <a
                        key={red._id}
                        href={`http://${red.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiFillInstagram className="w-11 h-11     max-sm:w-auto" />
                      </a>
                    );
                  }
                  if (red.platform === "tiktok" && red.url != "") {
                    return (
                      <a
                        key={red._id}
                        href={`http://${red.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoLogoTiktok className="w-10 h-10  max-sm:w-auto " />
                      </a>
                    );
                  }
                })}
            </div>
          </div>
          {(id === user.id || datesBazar.length !== 0) && (
            <div className="bg-patina-900 rounded-md w-full flex flex-col text-center items-center text-patina-900 gap-2 p-4 drop-shadow-lg  space-y-4">
              {id === user.id && datesBazar.length === 0 && (
                <h3 className="text-raw-sienna-50 text-lg">
                  ¡Haz click en el símbolo + para agregar tu siguiente fecha!
                  <br />
                  <span> Registra hasta 3 fechas próximas.</span>
                </h3>
              )}
              <div className="flex w-full justify-center gap-3 max-sm:flex-col max-sm:items-center ">
                {datesBazar.map((date) => (
                  <CardEventDetail
                    key={date._id}
                    dateID={date._id}
                    setIdDate={setIdDate}
                    setDataDate={setDataDate}
                    events={date.events}
                    fecha={date.date}
                    place={date.place}
                    time={date.time}
                    marcasCurso={date.marcasCurso}
                    openEdDate={openEdDate}
                    editButtonsActive={editButtonsActive}
                    setOpenEdDate={setOpenEdDate}
                    idDate={idDate}
                  />
                ))}
                {editButtonsActive && (
                  <button
                    className="bg-patina-500 h-full rounded-lg p-2"
                    onClick={() => handleNewDates()}
                  >
                    <FaPlus className="text-raw-sienna-50 text-2xl" />
                  </button>
                )}
              </div>
              {datesBazar.length > 0 && (
                <div className="flex flex-col text-patina-100 w-full text-xl space-y-4">
                  <h3>Lugar: {dataDate.place}</h3>
                  <h3>Hora: {dataDate.time} hrs</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(id === user.id ||
        user.role === "marca" ||
        dataDate.marcasCurso?.length > 0) && (
        <Carrucel
          idDate={idDate}
          marcasCurso={dataDate.marcasCurso}
          fetchDataDates={fetchDataDates}
          isParticipant={isParticipant}
          showMessage={id === user.id}
        />
      )}
      {(id === user.id || dataDate.events?.length > 0) && (
        <div className="flex w-11/12  pt-8 pb-16  lg:max-w-screen-xl overflow-auto mx-auto  drop-shadow-lg ">
          <div className="bg-patina-900 gap-2 rounded-md p-10 mx-auto  w-10/12 h-5/6 flex flex-col  items-center justify-around  max-md:w-11/12 max-md:flex-col max-sm:w-11/12 ">
            <h3 className="text-4xl font-semibold pt-8 text-raw-sienna-50 text-center">
              Eventos especiales
            </h3>
            <button className="bg-patina-500 h-full rounded-lg p-2 w-10" onClick={() => handleropenFormAddEspEve()}>
                <FaPlus className="text-raw-sienna-50 text-2xl" />
            </button>

            <div className="grid grid-cols-1 w-full items-center justify-center md:px-8 pt-8">
              {(!dataDate.events || dataDate.events?.length === 0) && (
                <div className="flex flex-col items-center justify-center text-center text-pretty space-y-4">
                  <p className="text-raw-sienna-300 font-semibold text-2xl">
                    ¡Crea un bazar inolvidable!
                  </p>
                  <p className="text-raw-sienna-50 md:w-10/12 ">
                    Música en vivo, talleres creativos y demostraciones
                    artísticas harán que tu bazar sea el destino favorito de los
                    amantes de lo artesanal y lo original.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 drop-shadow-lg">
                {dataDate &&
                  Array.isArray(dataDate.events) &&
                  dataDate.events.map((date) => (
                    <CardEvent
                      key={date._id}
                      setDatesBazar={setDatesBazar}
                      fetchDataDates={fetchDataDates}
                      setDataDate={setDataDate}
                      eventID={date._id}
                      idDate={idDate}
                      eventName={date.eventName}
                      description={date.description}
                      timeEvent={date.timeEvent}
                      editButtonsActive={editButtonsActive}
                      eventCount={dataDate.events}
                      showBin={id === user.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PromotorVistaId;
