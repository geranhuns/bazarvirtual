import classNames from "classnames";
import Link from "next/link";
export default function Button({ text, href, variant, className }) {
  const buttonClassNames = classNames(
    " p-1 rounded-lg text-lg text-gray-800 font-medium h-9",
    {
      "bg-yellow-bazar": variant === "yellow",
      "bg-orange-bazar": variant === "orange",
      "bg-green-bazar": variant === "green",
      "bg-beige-bazar": variant === "beige",
      "bg-raw-sienna-500 text-raw-sienna-50": variant === "raw-sienna-500",
      "bg-raw-sienna-900 text-raw-sienna-50": variant === "raw-sienna-900",
      "bg-patina-500 text-raw-sienna-50": variant === "patina-500",
      "bg-beige-bazar": variant === "beige",
      "bg-transparent text-white": variant === "transparent",
    },
    className
  );
  return (
    <button className={buttonClassNames}>
      <Link href={href}>{text}</Link>
    </button>
  );
}
