"use client";
import BazarSmallView from "../SmallViews/BazarSmallView";
import Button from "../Button/Button";

export default function ProximosBazares({ className }) {
  return (
    <div className={className}>
      <div className="flex flex-col   top-0 left-0  w-full px-8 items-center rounded-xl  bg-orange-200 mt-2 ">
        <div className="flex items-center ">
          <h3 className="">Próximos Bazares</h3>
          <ul className=" flex w-full py-4 gap-10 ">
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
            variant={"yellow"}
            className={" w-1/4"}
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
