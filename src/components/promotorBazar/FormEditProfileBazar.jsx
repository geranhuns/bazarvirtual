import { useEffect, useState } from "react";
import React  from "react";
import { useForm } from "react-hook-form";
import { dataUserBazarFetch } from "@/api/bazar/routes";
import { updateProfileBazar } from "@/api/bazar/routes";




function FormEditProfileBazar({active, setActive, _idUser}){

  const[dataUser, setDataUser] = useState({})
  const [isLoading, setIsLoading] = useState(true);
 
  const redesSociales = dataUser.socialNetworks || [];
  console.log(redesSociales)
  const facebookObject = redesSociales.find(network => network.platform === 'facebook') || { platform: 'facebook', url: '' };
  const instagramObject = redesSociales.find(network => network.platform === 'instagram') || { platform: 'instagram', url: '' };
  const tiktokObject = redesSociales.find(network => network.platform === 'tiktok') || { platform: 'tiktok', url: '' };
  // const facebookObject = redesSociales?.find(network => network.platform === 'facebook');
  // const instagramObject = redesSociales?.find(network => network.platform === 'instagram');
  // const tiktokObject = redesSociales?.find(network => network.platform === 'tiktok');


  useEffect(() => {

    const fetchData = async () => {
      try {
        const userData = await dataUserBazarFetch();
        setDataUser(userData.data);
        console.log(userData);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
   
}, []);



    
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const onSubmit = async  (data) =>{

    const socialNetworks = [
      { platform: 'facebook', url: data.facebook },
      { platform: 'instagram', url: data.instagram },
      { platform: 'tiktok', url: data.tiktok }
    ];
    const dataAdjust = {
      username: data.username,
      wepPage: data.wepPage,
      socialNetworks,
      _id:_idUser //este se pasara al fetch para hacer la update
    };
    console.log(dataAdjust);
  //  aqui el fect para mandarData
   try {
    const updatedUser = await updateProfileBazar(dataAdjust, dataUser._id);
    console.log('Usuario actualizado con éxito:', updatedUser);
    // Aquí puedes manejar la respuesta, como mostrar un mensaje al usuario
    setDataUser(updatedUser); 
  } catch (error) {
    console.error('Error al actualizar el usuario:', error.message);
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  }

  console.log(dataUser)

   //
    reset();
  }

  if (isLoading) {
    return <div>Loading...</div>;
    //colocar alert
  }

  
 

return(
    <>
    <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh lg:max-w-screen-xl overflow-auto mx-auto backdrop-blur-md mt-14 px-1 ">    
    <button className="bg-raw-sienna-500 w-10 h-10 flex justify-center items-center rounded-2xl " onClick={() => setActive(!active)} >Cerrar</button>
    
       <form onSubmit={handleSubmit(onSubmit)} className=" bg-customBlue w-7/12 h-5/6 rounded-xl   mx-auto px-4 flex flex-col items-center max-md:w-10/12 max-sm:w-full"  >
            <div className=" w-11/12 h-full flex flex-col justify-start items-center max-sm:w-full">
                <div className=" bg-red-500 w-2/6 h-2/6 rounded-full p-15 max-sm:h-1/6 max-sm:w-2/6 max-sm:rounded-lg">
                    profile
                </div>
                <button className="bg-green-300 rounded-lg my-1">cambiar perfil</button>
                <div className="  w-10/12 h-4/6 flex flex-col items-center p-3 max-sm:w-full">
                    <div className=" w-full h-2/6  flex justify-around items-center max-sm:flex-col">
                        <div className="  flex flex-col items-center w-1/2 max-sm:w-10/12">
                            <label className="text-lg text-white " htmlFor="">Bazar name</label>
                            <input className="w-11/12 p-1 rounded-xl max-sm:w-full" type="text" defaultValue={dataUser.username}
                              {...register("username" , { required:"Este campo es requerido"})} />
                        </div>
                        <div className="  flex flex-col items-center w-1/2 max-sm:w-10/12 ">
                            <label className="text-lg text-white " htmlFor="">wep page</label>
                            <input className="w-11/12 p-1 rounded-xl max-sm:w-full" type="text" defaultValue={dataUser.wepPage}
                              {...register("wepPage" )}/>
                        </div>
                    </div>
                    
                    <div className="  w-full h-5/6 flex flex-col items-center ">
                       <h3 className="text-xl text-white font-semibold ">Redes sociales</h3>
                       <div className=" flex flex-col gap-y-1 w-full px-2 max-sm:items-center">
                            
                            <div className="  flex flex-col items-center w-full max-sm:w-10/12 ">
                                <label id="facebook"  name="facebook" className="text-lg text-white " htmlFor="facebook">Facebook</label>
                                <input className="w-11/12 p-1 rounded-xl" type="text" defaultValue={facebookObject.url}
                                 {...register("facebook")} />
                                
                            </div>
                            <div className="  flex flex-col items-center w-full max-sm:w-10/12 ">
                                <label  className="text-lg text-white " htmlFor="">Instagram</label>
                                <input className="w-11/12 p-1 rounded-xl" type="text" defaultValue={instagramObject.url}
                                 {...register("instagram" )} />
                            </div>
                            
                            <div className="  flex flex-col items-center w-full max-sm:w-10/12">
                                <label  className="text-lg text-white" htmlFor="">TikTok</label> 
                                <input className="w-11/12 p-1 rounded-xl" type="text"  defaultValue={tiktokObject.url}
                                 {...register("tiktok" )}
                                 />
                            </div>
                       </div>
                    </div>
                    <button className="bg-raw-sienna-500 w-2/12" type="submit">Guardar</button>
                </div>
            </div>
       </form>
    </div>
    </>
)
}

export default FormEditProfileBazar;