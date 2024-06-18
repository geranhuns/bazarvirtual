import LoginForm from "@/components/LoginForm/LoginForm";
export default function Login() {
  return (
    <main className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-6">Iniciar sesión</h2>
        <LoginForm />
        <p className="mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500">
            Regístrate aquí
          </a>
        </p>
      </div>
    </main>
  );
}
