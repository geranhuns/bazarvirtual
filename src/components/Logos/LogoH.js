import Link from "next/link";
export default function LogoH({ className }) {
  return (
    <Link href="/">
      <img src="/horizontalLogo.png" width="150" alt="logo" />
    </Link>
  );
}
