import React from "react";
import CardSection4 from "./CardSection4";
import { BsShop } from "react-icons/bs";
import { TbWorldSearch } from "react-icons/tb";

function Section4Landing({ id }) {
    return (
        <>
            <section id={id} className="w-full h-full flex flex-col lg:flex-row  max-sm:flex-col max-sm:h-85vh  ">
                <CardSection4
                    bgClass="bg-KombuGreen"
                    iconCard={<BsShop className="lg:w-2/12 lg:h-5/6 w-4/12 h-full text-raw-sienna-50 " />}
                    title="¿Impulsas marcas mexicanas con tu bazar?"
                    description1="¡Maximiza tu Alcance!"
                    description2="Tus bazares siempre en el radar de los compradores locales."
                    textButton="Regístrate como bazar"
                    bgButton="bg-raw-sienna-500"
                    hoverButton="hover:bg-raw-sienna-200 hover:text-raw-sienna-900  transition duration-300"
                />

                <CardSection4
                    bgClass="bg-raw-sienna-500"
                    iconCard={<TbWorldSearch className="lg:w-2/12 lg:h-5/6 w-4/12 h-full text-raw-sienna-50" />}
                    title="¿Buscas aumentar tu visibilidad online?"
                    description1="¡Crea gratis tu catálogo digital!"
                    description2="Apoyamos a marcas locales a crear su tienda en línea y participar en los mejores bazares mexicanos."
                    textButton="Regístrate como marca"
                    bgButton="bg-KombuGreen "
                    hoverButton="hover:bg-[#D4DBBB] hover:text-KombuGreen  transition duration-300"
                />

            </section>
        </>
    )
}

export default Section4Landing;