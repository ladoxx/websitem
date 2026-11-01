import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import Services from '@/components/Services';
import FeaturedProducts from '@/components/FeaturedProducts';
import Comparison from '@/components/Comparison';
import Projects from '@/components/Projects';
import About from '@/components/About';
import HowItWorks from '@/components/HowItWorks';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechMarquee />
        <FeaturedProducts />
        <Services />
        <Comparison />
        <Projects />
        <About />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
