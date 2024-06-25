import Button from "../Button/Button";
export default function CreaTuBazarBanner() {
  return (
    <>
      <div className="bg-patina-900 flex flex-col gap-10  text-raw-sienna-50 items-center rounded-md  py-8 w-72 md:w-80 lg:w-96 my-10">
        <h3 className="px-2 text-center">¿Quieres invitarnos a tu bazar?</h3>
        <Button
          text="Crea tu bazar"
          href="/register"
          variant="raw-sienna-500"
        />
      </div>
    </>
  );
}
