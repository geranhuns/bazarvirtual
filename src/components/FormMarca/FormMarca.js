import React from 'react'

function FormMarca() {
    return (
        <form className="w-[50%] mx-auto mt-10">
            <div className="flex flex-col gap-4">
                <label htmlFor="nombreMarca">Nombre de la Marca</label>
                <input type="text" id="nombreMarca" className="border border-gray-300 p-2" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="sloganMarca">Slogan de la Marca</label>
                <input type="text" id="sloganMarca" className="border border-gray-300 p-2" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="descripcionMarca">Descripción de la Marca</label>
                <textarea id="descripcionMarca" className="border border-gray-300 p-2 w-full h-32 resize-none overflow-y-auto" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="logoMarca">Logo de la Marca</label>
                <input type="file" id="logoMarca" className="border border-gray-300 p-2" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="redesSociales">Redes Sociales</label>
                <input type="text" id="redesSociales" className="border border-gray-300 p-2" />
            </div>
            <button className="bg-raw-sienna-500 text-white p-2 rounded-md">Guardar</button>
        </form>
    )
}

export default FormMarca