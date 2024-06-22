import FormMarca from "@/components/FormMarca/FormMarca";
import Image from "next/image";

export default function EditarMarcaPage() {
    return (
        <div className="flex flex-col items-center ">
            <h1 className="text-3xl font-semibold text-center text-raw-sienna-500 p-5 ">Editar Marca</h1>
            <img src="https://picsum.photos/500/500" alt="brand" width={300} height={300} className="rounded-full" />
            <FormMarca />
        </div>
    );
}