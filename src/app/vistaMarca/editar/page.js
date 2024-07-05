import FormMarca from "@/components/FormMarca/FormMarca";
import Image from "next/image";

export default function EditarMarcaPage() {
  return (
    <div className="flex flex-col items-center h-screen lg:max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-raw-sienna-500 p-5 ">
        Editar Marca
      </h1>
      <FormMarca />
    </div>
  );
}
