import Button from "../Button/Button";
export default function CreaTuBazarBanner() {
  return (
    <>
      <div className="bg-patina-900 flex flex-col gap-4  text-raw-sienna-50 items-center rounded-md w-48 h-48 justify-center self-center mb-11">
        <h3 className="px-11 text-center">¿Quieres invitarnos a tu bazar?</h3>
        <Button
          text="Crea tu bazar"
          href="/register"
          variant="raw-sienna-500"
        />
      </div>
    </>
  );
}
