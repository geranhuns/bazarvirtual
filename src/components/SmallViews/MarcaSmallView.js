"use client";

import { useRouter } from "next/navigation";
export default function MarcaSmallView({ className, brand, id }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/marcas/${id}`);
      }}
      className={`flex gap-2 items-center ${className}`}
    >
      <img
        className="rounded-full"
        src="https://picsum.photos/100/100"
        width="50px"
        heigth="50px"
        alt="logo"
      />
      <div className="text-center text-xs w-24">
        {id && <h3>{id}</h3>}
        {brand && <h3>{brand}</h3>}
      </div>
    </div>
  );
}
