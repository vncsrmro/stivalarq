import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Services from "@/components/Services";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Expertise />
        <Services />
        <About />
        <Clients />
        <Portfolio />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Index;
