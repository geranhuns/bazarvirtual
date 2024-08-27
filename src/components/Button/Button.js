import classNames from "classnames";
import Link from "next/link";
export default function Button({
  text,
  href,
  variant,
  className,
  onClick,
  type,
}) {
  const buttonClassNames = classNames(
    "flex items-center justify-center p-1 px-3 rounded-lg text-lg text-gray-800 font-medium h-9 ",
    {
      "bg-yellow-bazar": variant === "yellow",
      "bg-orange-bazar": variant === "orange",
      "bg-green-bazar": variant === "green",
      "bg-beige-bazar": variant === "beige",
      "bg-raw-sienna-50 text-raw-sienna-900 border border-raw-sienna-800":
        variant === "raw-sienna-50",
      "bg-raw-sienna-500 text-raw-sienna-50": variant === "raw-sienna-500",
      "bg-raw-sienna-900 text-raw-sienna-50": variant === "raw-sienna-900",
      "bg-patina-500 text-raw-sienna-50": variant === "patina-500",
      "bg-beige-bazar": variant === "beige",
      "bg-transparent text-white": variant === "transparent",
    },
    className
  );

  return (
    <>
      {type ? (
        <button type={type} className={buttonClassNames} onClick={onClick}>
          {text}
        </button>
      ) : (
        <button className={buttonClassNames} onClick={onClick}>
          <Link href={href}>{text}</Link>
        </button>
      )}
    </>
  );
}
