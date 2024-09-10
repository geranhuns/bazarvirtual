"use client";
require("dotenv").config();

import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import { useUserContext } from "@/components/UserContext/UserContext";
import { useEffect, useState } from "react";

export default function EditarPerfil() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUserContext(); // Asume que obtienes el id del usuario desde un contexto
  const [isSubmit, setIsSubmit] = useState(false); //estate para monitorear cuando el fom haga un onsubmit y ejecutar el fetch que trae los datos del usuario

  useEffect(() => {
    if (user.id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.id}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          const data = await response.json();
          setUserData(data.data);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [user.id, isSubmit]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center lg:max-w-screen-xl mx-auto ">
        <div className="bg-white w-11/12 p-10 md:p-16 rounded-md flex flex-col items-center shadow-md">
          <ProfileEdit
            userData={userData}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
          />
        </div>
      </div>
    </>
  );
}
