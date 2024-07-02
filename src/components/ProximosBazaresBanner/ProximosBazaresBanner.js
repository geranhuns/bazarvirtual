"use client";
import BazarSmallView from "../SmallViews/BazarSmallView";
import Button from "../Button/Button";

export default function ProximosBazares({ className }) {
  return (
    <section className={className}>
      <div className="flex flex-col   top-0 left-0  w-full  px-8  items-center justify-center rounded-xl  bg-patina-900 mt-2 text-raw-sienna-50 py-8">
        <h2 className="text-center text-lg pb-4">Próximos Bazares</h2>
        <div className="flex flex-col items-center justify-center ">
          <div className=" flex w-full py-4 gap-8 flex-wrap  lg:flex-nowrap justify-center ">
            <article>
              <BazarSmallView />
            </article>
            <article>
              <BazarSmallView />
            </article>
            <article>
              <BazarSmallView />
            </article>
            <article>
              <BazarSmallView />
            </article>
          </div>
          <Button
            text={"Ver todos"}
            href={"/bazares"}
            variant={"patina-500"}
            className={" w-full md:w-1/2 lg:1/3 text-lg"}
          />
        </div>
        {/* <div className="bg-yellow-bazar py-2 px-4 mt-10">
          <p>
            ¡<a href="/register">Registra</a> tu bazar e invítanos a comprar con
            tus marcas invitadas!
          </p>
        </div> */}
      </div>
    </section>
  );
}
