'use client'

import { useState, React, useContext } from "react";

import LogoH from "../Logos/LogoH";
import LogoTag from "../Logos/LogoTag";
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation';
import { HeaderContext } from "../HContext/HeaderContext";

function HeaderBazar(props) {
    const { active, setActive } = useContext(HeaderContext);

    const router = useRouter();

    function handleLogout() {

        localStorage.removeItem('jwtToken');

        router.push('/login');
    }

    function handleProfile() {

    }
    return (
        <>
            <nav className="bg-raw-sienna-500 sticky h-16  left-0 right-0 top-0 shadow-md z-50 lg:max-w-screen-xl mx-auto ">
                <div className="h-full flex md:justify-between items-center mx-auto   lg:max-w-screen-xl  px-5  max-sm:justify-around ">
                    <LogoH className={" hidden md:block "} />
                    <LogoTag width={"50px"} className={" block md:hidden h-full py-2 "} />

                    <div className=" w-3/12 flex items-center justify-between  max-sm:w-6/12">
                        <button className="bg-transparent text-white p-1 rounded-lg text-lg font-medium h-9 mx-auto max-sm:text-sm " onClick={handleLogout}>Cerrar sesion</button>
                        <button className="rounded-full p-2 bg-gray-300  mx-auto" onClick={() => setActive(!active)}  ><CgProfile className="w-full h-full" /></button>
                    </div>
                </div>

            </nav>
        </>

    )
}

export default HeaderBazar;