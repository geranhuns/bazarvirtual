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
                    iconCard={<BsShop className="w-2/12 h-5/6 text-Eggshell " />}
                    title="¿Impulsas marcas mexicanas con tu bazar?"
                    description1="Maximiza tu Alcance"
                    description2="Tus bazares siempre en el radar de los compradores locales."
                    textButton="Regístrate como bazar"
                    bgButton="bg-raw-sienna-500"
                    hoverButton="hover:bg-transparent hover:border-4 hover:border-raw-sienna-500  transition duration-500"
                />

                <CardSection4
                    bgClass="bg-raw-sienna-500"
                    iconCard={<TbWorldSearch className="w-2/12 h-5/6 text-Eggshell" />}
                    title="¿Buscas aumentar tu visibilidad online?"
                    description1="Crea gratis tu catálogo digital"
                    description2="Apoyamos a marcas locales a crear su tienda en línea y participar en los mejores bazares mexicanos."
                    textButton="Regístrate como marca"
                    bgButton="bg-KombuGreen "
                    hoverButton="hover:bg-transparent hover:border-4 hover:border-KombuGreen  transition duration-500"
                />

            </section>
        </>
    )
}

export default Section4Landing;