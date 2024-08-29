import { LuAlarmClock } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import Swal from "sweetalert2";

import React from "react";

function EmptyCard({ idDate, userRole, showMessage }) {

    const handleCopyUrl = () => {
        const url = window.location.href;

        navigator.clipboard.writeText(url)
            .then(() => {
                Swal.fire({
                    title: "¡Url copiada en portapapeles!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch((err) => {
                console.error('Error al copiar la URL: ', err);
            });
    };

    return (
        <>
            <div className=" bg-patina-100 rounded-2xl w-72   flex flex-col items-center justify-center mx-auto p-4 h-[34vh] md:h-[36vh] lg:h-[40vh] ">

                <LuAlarmClock className="text-9xl text-patina-900" />
                <h3 className="text-xl font-medium text-patina-900 pt-4">
                    {!showMessage ? "¡Sé la primera marca en registrarte!" : "Comparte este link para que tus marcas invitadas se registren"}
                    {userRole === "marca" && "Tu marca puede ser la primera en registrarse en esta fecha"}
                </h3>
                {showMessage &&
                    <button className="p-2 bg-patina-500 rounded-md mt-5" onClick={handleCopyUrl}>
                        <IoMdShare className="text-2xl text-patina-50 " />
                    </button>
                }

            </div>
        </>
    )
}

export default EmptyCard;