import React from "react";
import CardSection3 from "./CardSection3";

function Section3Landing(){
    return(
        <>
        <section className=" w-full h-85vh  flex justify-around items-center ">
        <CardSection3
                bgClass="bg-KombuGreen"
                bgImageClass="bg-ecoShopping"
                title="Apoyamos la economía local"
                description="Cada compra fortalece nuestra economía local, creando empleos y apoyando a los pequeños empresarios"
        />
        <CardSection3
                bgClass="bg-raw-sienna-500"
                bgImageClass="bg-panaBeer"
                title="Con productos de calidad únicos"
                description="Descubre productos artesanales y de alta calidad que no encontrarás en las grandes cadenas"
        />

        <CardSection3
                bgClass="bg-customGreen"
                bgImageClass="bg-teamPana"
                title="Y conectamos con la Comunidad"
                description="Forma parte de una red de personas comprometidas con el crecimiento y la prosperidad de nuestra comunidad"
        />
        
      </section>
        </>
    )
}

export default Section3Landing;