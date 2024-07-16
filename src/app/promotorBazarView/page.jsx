'use client';
import { useState, React, useEffect, useContext  } from "react";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import Carrucel from "@/components/promotorBazar/Carrucel";
import FormNewDate from "@/components/promotorBazar/FormNewDate";
import CardEventDetail from "@/components/promotorBazar/CardEventDetail";
import FormEditProfileBazar from "@/components/promotorBazar/FormEditProfileBazar";
import CardEvent from "@/components/promotorBazar/CardEvent";
import { useRouter } from 'next/navigation'
import { dataUserBazarFetch } from "@/api/bazar/routes";
import { datesBazarFetch } from "@/api/bazar/routes";
import { HeaderContext } from "@/components/HContext/HeaderContext";




function PromotorVista() {
const router = useRouter()
const[open, setOpen] = useState(false)
const[dataUser, setDataUser] = useState({})
const[datesBazar, setDatesBazar] = useState([])
const[dataDate, setDataDate] = useState([])

const { active, setActive } = useContext(HeaderContext);

const redesSociales = dataUser.socialNetworks

const fetchData = async () => {
    try {
      const userData = await dataUserBazarFetch();
      setDataUser(userData.data);
    //   console.log(userData.data);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const fetchDataDates = async () => {
    try {
      const bazarDates = await datesBazarFetch();
      console.log(bazarDates.data)
      setDatesBazar(bazarDates.data);
    
    } catch (error) {
      console.error('Error al obtener las fechas del bazar:', error);
    }
  };

useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      router.push('/login');
    
    }else{
        fetchData();
        fetchDataDates()
     
        
    }
}, []);

useEffect(()=>{
    fetchDataDates()
},[open])

useEffect(() => {
    fetchData();
    console.log("ejecutando por cierre")
}, [active]);
    
useEffect(()=>{
    console.log(dataDate)
},[dataDate])
   

   
  




    return (
        <section className="relative w-full bg-raw-sienna-200  min-h-screen lg:max-w-screen-xl flex flex-col  overflow-auto mx-auto ">
              {open && <FormNewDate fetchDataDates={fetchDataDates} _idUser={dataUser._id} open={open} setOpen={setOpen} />}
              {active && <FormEditProfileBazar dataUserP={dataUser}  _idUser={dataUser._id} active={active} setActive={setActive} />}

             <div className="bg-raw-sienna-500  w-10/12 flex  items-center justify-around  p-10 mx-auto max-md:flex-col max-sm:w-11/12 ">
                
                <div className=" w-4/12 mb-1 h-full flex justify-center   max-md:w-5/12 max-sm:w-6/12 ">
                    <img className=" rounded-custom2 w-full h-full" src={dataUser.profilePicture} alt="" />
                </div>

                    <div className=" text-Eggshell w-7/12 h-5/6  flex flex-col justify-between gap-y-1 items-center max-md:w-11/12 max-sm:w-full">

                        <div className="bg-patina-900 rounded-xl w-9/12 h-4/6 flex flex-col justify-center items-center  mb-10 max-md:w-11/12 max-sm:w-full">
                            <h2 className=" text-xl md:text-4xl p-1 font-medium  text-center ">{dataUser.username}</h2>
                            <div className=" text-sm font-medium flex flex-col p-1 justify-center items-center ">
                                <span>{dataUser.wepPage}</span> 
                                {/* meter en un <a> */}
                               
                            </div>
                            <div className=" flex justify-center gap-x-4 mb-5">
                            {redesSociales && redesSociales.map(red => {
                                    if(red.platform === "facebook" && red.url != ''){
                                        return (
                                            <a key={red._id} href={red.url} >
                                                <FaFacebook className="w-10 h-11 rounded-custom2 text-facebook bg-white max-sm:w-auto" />
                                            </a>
                                        );
                                    }
                                    if(red.platform === "instagram" && red.url != ''){
                                        return (
                                            <a key={red._id} href={red.url} >
                                                <FaInstagramSquare className="w-10 h-11 rounded-custom2  bg-instagram-gradient  max-sm:w-auto" />
                                            </a>
                                        );
                                    }
                                    if(red.platform === "tiktok" && red.url != ''){
                                        return (
                                            <a key={red._id} href={red.url} >
                                                <AiFillTikTok className="w-10 h-11 rounded-custom2 text-black bg-tiktok-gradient max-sm:w-auto " />
                                            </a>
                                        );
                                    }
                                })}
                               

                            </div>
                        </div>

                        <div className="bg-avocado-500 rounded-md w-full flex text-center items-center text-black gap-2  p-3">
                            {datesBazar.map(date =>{
                              return  <CardEventDetail setDataDate={setDataDate} events={date.events} date={date.date} key={date._id}  />
                            })}
                            
                            
                            <button className="bg-raw-sienna-500 w-1/12 h-3/6 rounded-lg  text-base font-medium " onClick={() => setOpen(!open)} ><CiSquarePlus className="text-white w-full h-full" /></button>
                        </div>
                    </div>
             </div> 

             <Carrucel/>

             <div className="flex w-11/12 my-auto  py-8 lg:max-w-screen-xl overflow-auto mx-auto  ">
                <div className="bg-patina-900 gap-2 rounded-md py-10 mx-auto  w-10/12 h-5/6 flex  items-center justify-around  max-md:w-11/12 max-md:flex-col max-sm:w-11/12">
                   {dataDate && dataDate.map(date=>{
                         return <CardEvent key={date._id} eventName={date.eventName} description={date.description} timeEvent={date.timeEvent}/>
                   })}
                    {/* <CardEvent/>
                    <CardEvent/> */}
                </div>
             </div>

                
           
        </section>

        
        

    
    )
}

export default PromotorVista;