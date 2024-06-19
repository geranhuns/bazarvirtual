import Button from "@/components/Button/Button";

export default function LoginForm() {
  return (
    <>
      <form action="">
        <div className="flex flex-col w-96 mb-3 gap-1">
          <div className=" ">
            <label htmlFor="username" className="text-lg mb-1">
              Correo:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full border rounded-lg p-4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full border rounded-lg p-4"
            />
          </div>
          <Button text="Iniciar sesión" href="/" variant="raw-sienna-500" />
        </div>
      </form>
    </>
  );
}
