'use client'
import { useState } from "react";

function FormProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target; // toma el name y el value del input de los campos del formulario
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(product);
    };

    return (
        <form className="w-1/2 mx-auto mt-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 pb-4">
                <label htmlFor="name" className="font-semibold text-raw-sienna-900">Nombre del producto</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="border border-gray-300 p-2"
                />
                <label htmlFor="price" className="font-semibold text-raw-sienna-900">Precio</label>
                <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="border border-gray-300 p-2"
                />
                <label htmlFor="description" className="font-semibold text-raw-sienna-900">Descripción</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full h-32 resize-none overflow-y-auto hover"
                />
                <button className="bg-raw-sienna-500 text-white p-2 rounded-md w-full self-center" type="submit">Enviar</button>
            </div>
        </form>
    );
}

export default FormProduct;