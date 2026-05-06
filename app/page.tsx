import About from "@/components/About";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
