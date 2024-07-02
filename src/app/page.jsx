
import Section1Landing from "@/components/landing/Section1Land";
import Section2Landing from "@/components/landing/Section2Landing";
import Section3Landing from "@/components/landing/Section3Landing";
import Section4Landing from "@/components/landing/Section4Landing";
import Section5Landing from "@/components/landing/Section5Landing";
import Section6Landing from "@/components/landing/Section6Landing";

export default function Home() {
  return (
    <div className=" flex flex-col ">
      {/* Primera Seccion */}
      <Section1Landing id="section1" />
      {/* Segunda Seccion*/}
      <div id="section2"><Section2Landing /></div>
      {/* Tercera Seccion*/}
      <div id="section3"><Section3Landing /></div>
      {/* Cuarta Seccion*/}
      <div id="section4"><Section4Landing /></div>
      {/* Quinta Seccion*/}
      <Section5Landing id="section5" />
      {/* Sexta Seccion*/}
      <Section6Landing id="section6" />






    </div>

  );
}
