import Feature from "@/components/Feature";
import Hero from "@/pages/Hero";
import Navbar from "@/pages/Navbar";

export default function Home() {
  return (
    <div className={`bg-backgroundLight dark:bg-bgDark transition-all duration-300`}>
      <Navbar/>
      <Hero/>
      <Feature/>
    </div>
  );
}
