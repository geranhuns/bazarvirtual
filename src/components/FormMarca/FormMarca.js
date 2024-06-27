"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function FormMarca() {

    const [previewImagen, setPreviewImagen] = useState(null)

    const handleImagen = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImagen(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <form className="w-[50%] mx-auto mt-10">
            <div className="flex flex-col gap-4">
                <label htmlFor="logoMarca" className=' text-lg font-semibold text-raw-sienna-900'>Logo de la Marca</label>
                <input type="file" id="logoMarca" className="border border-gray-300 p-2" onChange={handleImagen} />
                <div className="flex justify-center">
                    {previewImagen &&
                        // <img src={previewImagen} alt="Logo de la Marca" className="w-20 h-20 object-cover" />
                        <Image src={previewImagen} alt="Logo de la Marca" width={300} height={300} className="object-cover overflow-hidden border border-gray-300 rounded-custom1" />
                    }
                </div>
            </div>
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
                <label htmlFor="redesSociales">Redes Sociales</label>
                <input type="text" id="redesSociales" className="border border-gray-300 p-2" />
            </div>
            <button className="bg-raw-sienna-500 text-white p-2 rounded-md">Guardar</button>
        </form>
    )
}

export default FormMarca