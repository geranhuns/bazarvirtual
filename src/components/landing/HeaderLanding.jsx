"use client"
import React from "react"

function HeaderLanding() {

    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header className="bg-raw-sienna-500 w-full h-16 flex justify-end ">
                <div className="flex items-center cursor-pointer">
                    <ul className="flex flex-row items-center mr-10 gap-4 text-base text-color-text" >
                        <li className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete " onClick={() => handleScroll('section3')}>Acerca de</li>
                        <li className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete " onClick={() => handleScroll('section4')}>Marcas</li>
                        <li className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete " onClick={() => handleScroll('section2')}> Bazares</li>
                        <li className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete ">Login</li>
                        <li className="bg-raw-sienna-200 h-11 w-28 flex items-center justify-center  rounded-xl p-4  text-color-btnUnete hover:bg-white">
                            ¡Únete!
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}
export default HeaderLanding;