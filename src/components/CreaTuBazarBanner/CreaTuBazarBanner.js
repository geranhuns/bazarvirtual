import Button from "../Button/Button";
export default function CreaTuBazarBanner() {
  return (
    <>
      <div className="bg-patina-900 flex flex-col gap-10  text-raw-sienna-50 items-center rounded-md  p-8  w-full my-10 drop-shadow-lg">
        <h3 className=" text-center text-2xl sm:text-3xl">
          ¿Quieres invitarnos a tu bazar?
        </h3>
        <Button
          text="Crea tu bazar"
          href="/register"
          variant="raw-sienna-500"
          className={"text-xl px-4"}
        />
      </div>
    </>
  );
}
