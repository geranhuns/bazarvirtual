"use client";
import BazarSmallView from "../SmallViews/BazarSmallView";
import Button from "../Button/Button";

export default function ProximosBazares({ className }) {
  return (
    <div className={className}>
      <div className="flex flex-col   top-0 left-0  w-full px-8 py-1 items-center rounded-xl  bg-patina-900 mt-2 text-raw-sienna-50">
        <h3 className="text-center pr-6  text-lg">Próximos Bazares</h3>
        <div className="flex items-center ">
          <ul className=" flex w-full py-4 gap-8 ">
            <li>
              <BazarSmallView />
            </li>
            <li>
              <BazarSmallView />
            </li>
            <li>
              <BazarSmallView />
            </li>
          </ul>
          <Button
            text={"Ver todos"}
            href={"/bazares"}
            variant={"patina-500"}
            className={"ml-8 w-1/4"}
          />
        </div>
        {/* <div className="bg-yellow-bazar py-2 px-4 mt-10">
          <p>
            ¡<a href="/register">Registra</a> tu bazar e invítanos a comprar con
            tus marcas invitadas!
          </p>
        </div> */}
      </div>
    </div>
  );
}
