import Link from "next/link";

export default function LogoTag({ width, className }) {
  return (
    <Link href="/home">
      <img
        src="/logoabstract.png"
        width={width}
        alt="logo"
        className={className}
      />
    </Link>
  );
}
