import React from "react";

function EmptyCard({ idDate }) {

    return (
        <>
            <div className=" bg-patina-100 rounded-2xl w-72   flex flex-col items-center  mx-auto p-4 h-[60vh] md:h-[42vh] ">
                <img className="  rounded-2xl bg-patina-100" src="https://cdn.leonardo.ai/users/be6f4fcf-f918-450f-a54b-b46b96cd9cd4/generations/f2f52cd2-48ad-4340-b687-5488a05ef3c5/Graphic_Design_expected_icon_0.jpg" alt="" />
                <h3 className="text-xl font-medium text-patina-900 pt-4">
                    {idDate ? "Aún no hay marcas registradas en esta fecha" : "Aquí podrás ver las marcas registradas en cada fecha"}
                </h3>
            </div>
        </>
    )
}

export default EmptyCard;