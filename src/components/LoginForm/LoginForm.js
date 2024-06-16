import Button from "@/components/Button/Button";

export default function LoginForm() {
  return (
    <>
      <form action="">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Nombre de usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <Button text="Iniciar sesión" href="/" variant="raw-sienna-500" />
      </form>
    </>
  );
}
