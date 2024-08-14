"use client";
import { useState, React, useEffect, useContext, useCallback } from "react";
import { useParams } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoTiktok } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import Carrucel from "@/components/promotorBazar/Carrucel";
import FormNewDate from "@/components/promotorBazar/FormNewDate";
import CardEventDetail from "@/components/promotorBazar/CardEventDetail";
import FormEditProfileBazar from "@/components/promotorBazar/FormEditProfileBazar";
import CardEvent from "@/components/promotorBazar/CardEvent";
import { dataUserBazarFetch, datesBazarFetch } from "@/api/bazar/routes";
import { HeaderContext } from "@/components/HContext/HeaderContext";
import { useUserContext } from "@/components/UserContext/UserContext";

function PromotorVistaId() {
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState({}); //contiene los datos de peril del user
  const [datesBazar, setDatesBazar] = useState([]); //contiene las fechas del bazarUser
  const [dataDate, setDataDate] = useState({}); //contiene un obj con los eventos especiales, lugar, fecha y marcasCurso de la fecha que se selecciona
  const [idDate, setIdDate] = useState(""); //state que almacena el id de la date seleccionada, es para pasarselo a los events
  const [openEdDate, setOpenEdDate] = useState(false); //monitorea estado para abrir editarDate
  const { active, setActive } = useContext(HeaderContext); //monitorea estado para brir form edit profile
  const [editButtonsActive, setEditButtonsActive] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);

  const redesSociales = dataUser.socialNetworks;
  const params = useParams();
  const id = params.id;

  const { user } = useUserContext();
  const loggedUserId = user.id;

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
      //ordenar de mas proxima a las vieja
      const orderDates = bazarDates.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setDatesBazar(orderDates);
    } catch (error) {
      console.error("Error al obtener las fechas del bazar:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
    fetchDataDates();

    if (id === loggedUserId) {
      setEditButtonsActive(true);
    }
  }, []);

  useEffect(() => {
    if (datesBazar.length > 0) {
      const { _id, events, place, time, marcasCurso } = datesBazar[0];
      setDataDate({ _id, events, place, time, marcasCurso });
      setIdDate(datesBazar[0]._id);
    }
  }, [datesBazar]);

  useEffect(() => {
    const nameMarca = localStorage.getItem("brandUsername");
    if (Array.isArray(dataDate.marcasCurso)) {
      const exists = dataDate.marcasCurso.some(
        (obj) => obj.nameMarca === nameMarca
      );
      setIsParticipant(exists);
    }
  }, [dataDate]);

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

      <div className="bg-raw-sienna-500  w-10/12 flex  items-center justify-around  p-10 mx-auto max-md:flex-col max-sm:w-11/12 my-10 rounded-xl">
        <div className=" w-72 rounded-full mb-1 h-72 flex justify-center    ">
          <img
            className=" object-cover w-full rounded-full"
            src={dataUser.profilePicture}
            alt=""
          />
        </div>

        <div className=" text-Eggshell w-7/12 h-5/6  flex flex-col justify-between gap-y-1 items-center max-md:w-11/12 max-sm:w-full">
          <div className="bg-patina-900 rounded-xl w-9/12 h-4/6 flex flex-col justify-center items-center  mb-10 max-md:w-11/12 max-sm:w-full">
            <h2 className=" text-xl md:text-4xl p-1 font-medium  text-center ">
              {dataUser.username}
            </h2>
            <div className=" text-sm font-medium flex flex-col p-1 justify-center items-center ">
              <span>{dataUser.webPage}</span>
              {/* meter en un <a> */}
            </div>
            <div className=" flex justify-center items-center gap-x-4 mb-5 mt-2">
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
            <div className="bg-patina-900 rounded-md w-full flex flex-col text-center items-center text-black gap-2 p-3">
              {id === user.id && datesBazar.length === 0 && (
                <h3 className="text-white">
                  ¡Dale click al + para agregar tu siguiente fecha!{" "}
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
                    className="bg-patina-500  h-9 rounded-lg  text-base font-medium "
                    onClick={() => setOpen(!open)}
                  >
                    <CiSquarePlus className="text-white w-full h-full" />
                  </button>
                )}
              </div>
              {datesBazar.length > 0 && (
                <div className="flex flex-col text-patina-100 w-full text-xl ">
                  <h3>Lugar: {dataDate.place}</h3>
                  <h3>Hora: {dataDate.time} hrs</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(id === user.id || idDate) && (
        <Carrucel
          idDate={idDate}
          marcasCurso={dataDate.marcasCurso}
          fetchDataDates={fetchDataDates}
          isParticipant={isParticipant}
          showMessage={id === user.id}
        />
      )}
      {(id === user.id || dataDate.events?.length > 0) && (
        <div className="flex w-11/12   py-8 lg:max-w-screen-xl overflow-auto mx-auto  ">
          <div className="bg-patina-900 gap-2 rounded-md py-10 mx-auto  w-10/12 h-5/6 flex flex-col  items-center justify-around  max-md:w-11/12 max-md:flex-col max-sm:w-11/12 mt-14 md:mt-10">
            <h3 className="text-3xl text-patina-50">Eventos especiales</h3>
            {/* //poner un state con el lugar para precentarlo aqui */}
            {!idDate && (
              <h3 className="text-white flex justify-center text-center ">
                Aquí puedes ver los eventos especiales de tu bazar.
              </h3>
            )}
            <div className="grid grid-cols-1 w-full items-center justify-center px-8 pt-8">
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
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PromotorVistaId;
