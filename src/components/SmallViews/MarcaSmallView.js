"use client";

import { useRouter } from "next/navigation";
export default function MarcaSmallView({ className, brand, id, createdBy }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/marcas/${createdBy._id}`);
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
      <div className="text-center text-lg w-24">
        {id && <h3>{id}</h3>}
        {createdBy && <h3>{createdBy.username}</h3>}
      </div>
    </div>
  );
}
