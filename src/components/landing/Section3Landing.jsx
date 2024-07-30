'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSection3 from "./CardSection3";

function Section3Landing() {
        const settings = {
                dots: false, //Puntos de debajo del carrucel off(false)
                arrows: false,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesPerRow: 1,
                slidesToScroll: 0,
                // nextArrow: <SampleNextArrow />,
                // prevArrow: <SamplePrevArrow />,
                autoplay: true,
                // speed: 1000,
                autoplaySpeed: 8000,
                cssEase: "linear",
                rows: 1,
                responsive: [
                        {
                                breakpoint: 1024,
                                settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1,
                                        infinite: true,
                                        dots: false,
                                        arrows: true
                                }

                        },

                        {
                                breakpoint: 768,
                                settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        infinite: true,
                                        dots: false,

                                }

                        },
                ]


        };
        return (

                <section className="lg:max-w-screen-xl mx-auto w-full mb-20  flex flex-col justify-center items-center max-sm:justify-center md:mt-14  h-full">


                        <Slider {...settings} className="Slider flex justify-between items-center   w-11/12 ">
                                <CardSection3
                                        bgClass="bg-KombuGreen"
                                        bgImageClass="bg-ecoShopping"
                                        title="Apoyamos la economía local"
                                        src="/img/EcoShopping.png"
                                        description="Cada compra fortalece nuestra economía local, creando empleos y apoyando a los pequeños empresarios"
                                />

                                <CardSection3
                                        bgClass="bg-raw-sienna-500"
                                        bgImageClass="bg-panaBeer"
                                        title="Con productos de calidad únicos"
                                        src="/img/BeerPana.png"
                                        description="Descubre productos artesanales y de alta calidad que no encontrarás en las grandes cadenas"
                                />

                                <CardSection3
                                        bgClass="bg-customGreen"
                                        bgImageClass="bg-teamPana"
                                        title="Y conectamos con la Comunidad"
                                        src="/img/TeamPana.png"
                                        description="Forma parte de una red de personas comprometidas con el crecimiento y la prosperidad de nuestra comunidad"
                                />

                        </Slider>




                        {/* <CardSection3
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
                                /> */}


                </section>

        )
}

export default Section3Landing;