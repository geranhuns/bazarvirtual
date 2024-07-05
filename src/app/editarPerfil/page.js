"use client";

import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";

export default function editarPerfil() {
  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center lg:max-w-screen-xl mx-auto ">
        <div className="bg-white p-10 rounded-md flex flex-col items-center shadow-md">
          <img
            src="https://picsum.photos/300/300"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex pb-4"></div>

          <ProfileEdit />
        </div>
      </div>
    </>
  );
}
