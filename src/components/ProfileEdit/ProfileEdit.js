import Button from "../Button/Button";
import { React, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { updateProfileUser } from "@/api/users/routes";

export default function ProfileEdit({ userData, setIsSubmit, isSubmit }) {
  const params = useParams(); // id sale de los params(URl)
  const _id = params.id;

  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSetValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetValue = (imageDataUrl) => {
    setValue("profilePicture", imageDataUrl); // Aquí asumimos que profilePicture es la URL de la imagen
  };

  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    let password;
    data.password && data.passwordCheck != data.password
      ? (password = "")
      : (password = data.password);

    const dataAdjust = {
      profilePicture: data.profilePicture,
      password: password,
    };

    if (dataAdjust.profilePicture || dataAdjust.password) {
      const updatedUSer = await updateProfileUser(dataAdjust, _id);
    } else {
      console.log("data adjust esta vacio");
    }

    reset();
    setIsSubmit(!isSubmit); //cambia estado en componente padre para monitorear cuando se haga un onSubmit y traer de nuevo los datos del user
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-3 w-96 mb-3">
          <div className=" w-full h-2/6   p-15 flex items-center max-sm:rounded-lg">
            <div className=" w-2/3 h-2/3 mx-auto rounded-full relative  ">
              <img
                className="w-full h-full rounded-full object-cover object-center"
                src={userData.profilePicture}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <label
                  className="text-white text-lg cursor-pointer"
                  onClick={handleButtonClick}
                >
                  Cambiar perfil
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImagen}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Nombre de usuario</label>
            <input
              disabled
              className="w-full border rounded-lg p-3"
              type="text"
              placeholder={userData.username}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Correo</label>
            <input
              disabled
              className="w-full border rounded-lg p-4"
              type="text"
              placeholder={userData.email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Contraseña</label>
            <input
              className="w-full border rounded-lg p-4"
              type="password"
              placeholder=""
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Confirmar Contraseña</label>
            <input
              className="w-full border rounded-lg p-4"
              type="password"
              placeholder=""
              {...register("passwordCheck", {
                required: passwordValue
                  ? "Confirmar contraseña es obligatorio cuando se proporciona una contraseña"
                  : false,
                minLength: {
                  value: 8,
                  message:
                    "La confirmación de contraseña debe tener al menos 8 caracteres",
                },
                validate: (value) =>
                  passwordValue && value !== passwordValue
                    ? "Las contraseñas no coinciden"
                    : true,
              })}
            />
            {errors.passwordCheck && (
              <p className="text-red-500">{errors.passwordCheck.message}</p>
            )}
          </div>
          <button
            type="Submit"
            className="flex items-center justify-center p-1 rounded-lg text-lg font-medium h-9 bg-raw-sienna-500 text-raw-sienna-50"
          >
            Guardar cambios
          </button>
          {/* <Button text="Guardar cambios" href="/" variant="raw-sienna-500" /> */}
        </div>
      </form>
    </>
  );
}
