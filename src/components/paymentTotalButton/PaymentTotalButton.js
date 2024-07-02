import Button from "../Button/Button";
export default function PaymentTotalButton(className) {
  return (
    <div className={`flex self-end gap-10 text-2xl pb-8 ${className}`}>
      <Button
        text="Proceder al pago"
        href="/stripeWindow"
        className={"text-xs md:text-xl"}
        variant={"raw-sienna-900"}
      />
      <div className="flex gap-4 text-base md:text-xl items-center ">
        <h3>Total:</h3>
        <h3>$5,000.00</h3>
      </div>
    </div>
  );
}
