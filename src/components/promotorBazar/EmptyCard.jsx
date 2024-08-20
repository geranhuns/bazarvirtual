import React from "react";

function EmptyCard({ idDate }) {

    return (
        <>
            <div className=" bg-patina-100 rounded-2xl w-72 h-72  flex flex-col items-center justify-center my-4 mx-auto px-1 ">
                <img className="w-1/2 h-1/2 rounded-3xl bg-patina-100" src="https://cdn.leonardo.ai/users/be6f4fcf-f918-450f-a54b-b46b96cd9cd4/generations/f2f52cd2-48ad-4340-b687-5488a05ef3c5/Graphic_Design_expected_icon_0.jpg" alt="" />
                <h3 className="text-xl font-medium text-patina-900 px-4">
                    {idDate ? "Aún no hay marcas registradas en esta fecha" : "Marcas registradas aquí"}
                </h3>
            </div>
        </>
    )
}

export default EmptyCard;