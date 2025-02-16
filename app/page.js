import Feature from "@/app/_components/Feature";
import Hero from "@/app/_components/Hero";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <div className={`bg-backgroundLight dark:bg-bgDark transition-all  duration-300`}>
      <Navbar/>
      <Hero/>
      <Feature/>
      <Footer/>
    </div>
  );
}
