import Feature from "@/components/Feature";
import Hero from "@/pages/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={`bg-backgroundLight dark:bg-bgDark transition-all duration-300`}>
      <Navbar/>
      <Hero/>
      <Feature/>
      <Footer/>
    </div>
  );
}
