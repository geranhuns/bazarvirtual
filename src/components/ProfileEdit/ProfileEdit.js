import Button from "../Button/Button";
export default function ProfileEdit() {
  return (
    <>
      <form action="">
        <div className=" flex flex-col gap-3 w-96 mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-lg">Nombre de usuario</label>
            <input
              disabled
              className="w-full border rounded-lg p-3"
              type="text"
              placeholder="nombreDelUsuario"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Correo</label>
            <input
              disabled
              className="w-full border rounded-lg p-4"
              type="text"
              placeholder="correoDelUsuario@mail.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Contraseña</label>
            <input
              className="w-full border rounded-lg p-4"
              type="text"
              placeholder=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Confirmar Contraseña</label>
            <input
              className="w-full border rounded-lg p-4"
              type="password"
              placeholder=""
            />
          </div>
          <Button text="Guardar cambios" href="/" variant="raw-sienna-500" />
        </div>
      </form>
    </>
  );
}
