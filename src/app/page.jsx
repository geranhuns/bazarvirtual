
import Section1Landing from "@/components/landing/Section1Land";
import Section2Landing from "@/components/landing/Section2Landing";
import Section3Landing from "@/components/landing/Section3Landing";
import Section4Landing from "@/components/landing/Section4Landing";
import Section5Landing from "@/components/landing/Section5Landing";
import Section6Landing from "@/components/landing/Section6Landing";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Section1Landing id="section1" />
      <Section2Landing id="section2" />
      <Section3Landing id="section3" />
      <Section4Landing id="section4" />
      <Section5Landing id="section5" />
      <Section6Landing id="section6" />
    </div>
  );
}
