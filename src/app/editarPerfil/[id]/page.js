"use client";

import ProfileEdit from "@/components/ProfileEdit/ProfileEdit";
import { useUserContext } from "@/components/UserContext/UserContext";
import { useEffect, useState } from "react";

export default function editarPerfil() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useUserContext(); // Asume que obtienes el id del usuario desde un contexto

  useEffect(() => {
    if (user.id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/users/${user.id}`
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
  }, [user.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center lg:max-w-screen-xl mx-auto ">
        <div className="bg-white p-10 rounded-md flex flex-col items-center shadow-md">
          <img
            src={userData.profilePicture}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex pb-4"></div>

          <ProfileEdit userData={userData} />
        </div>
      </div>
    </>
  );
}
