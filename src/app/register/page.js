import RegisterForm from "@/components/RegisterForm/RegisterForm";

export default function page() {
  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center bg-gray-100 ">
        <h1 className="text-4xl text-black mb-6 font-bold">Crea tu cuenta</h1>
        <h2 className="text-xl text-gray-500 mb-6">
          Crea una cuenta para hacer tus compras y apoyar a los emprendedores
          locales
        </h2>
        <RegisterForm />
      </div>
    </>
  );
}
