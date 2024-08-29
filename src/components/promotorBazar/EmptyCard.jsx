import { LuAlarmClock } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import Swal from "sweetalert2";

import React from "react";

function EmptyCard({ idDate, userRole }) {

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
                {/* <img className="  rounded-2xl bg-patina-100" src="https://cdn.leonardo.ai/users/be6f4fcf-f918-450f-a54b-b46b96cd9cd4/generations/f2f52cd2-48ad-4340-b687-5488a05ef3c5/Graphic_Design_expected_icon_0.jpg" alt="" /> */}
                <LuAlarmClock className="text-9xl text-patina-900" />
                <h3 className="text-xl font-medium text-patina-900 pt-4">
                    {!idDate ? "Aquí podrás ver las marcas registradas en cada fecha" : "Comparte este link para que tus marcas invitadas se registren"}
                    {userRole === "marca" && "Tu marca puede ser la primera en registrarse en esta fecha"}
                </h3>
                {idDate &&
                    <button className="p-2 bg-patina-500 rounded-md mt-5" onClick={handleCopyUrl}>
                        <IoMdShare className="text-2xl text-patina-50 " />
                    </button>
                }

            </div>
        </>
    )
}

export default EmptyCard;