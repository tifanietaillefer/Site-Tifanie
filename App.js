import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Mail, Phone, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';

// --- ANIMATIONS & UTILS ---
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? 30 : 0, x: direction === "left" ? 30 : 0 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// --- COMPOSANTS ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-700 ${
        scrolled ? 'bg-[#FAFAF9]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${scrolled ? 'text-black' : 'text-white'}`}>
        Tifanie Taillefer
      </span>
      <div className={`flex gap-8 text-[9px] uppercase tracking-[0.2em] ${scrolled ? 'text-black/60' : 'text-white/70'}`}>
        <a href="#expertise" className="hover:text-[#9C8B7A]">Expertise</a>
        <a href="#projets" className="hover:text-[#9C8B7A]">Projets</a>
        <a href="#contact" className="hover:text-[#9C8B7A]">Contact</a>
      </div>
    </motion.nav>
  );
}

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" />
    <div className="relative z-10 text-center text-white px-6">
      <FadeIn>
        <span className="text-[10px] tracking-[0.6em] uppercase opacity-60 mb-8 block">Infographiste 3D — Freelance</span>
        <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-4">L'excellence visuelle</h1>
        <h2 className="text-4xl md:text-7xl font-light italic opacity-80 mb-12" style={{fontFamily: 'serif'}}>au service de vos projets</h2>
        <div className="w-12 h-[1px] bg-white/30 mx-auto" />
      </FadeIn>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
      <ChevronDown size={20} />
    </div>
  </section>
);

const Expertise = () => (
  <section id="expertise" className="py-32 px-6 md:px-24 bg-white">
    <div className="max-w-6xl mx-auto">
        <FadeIn>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4 block">Services</span>
            <h2 className="text-4xl font-light mb-20">Trois domaines d'excellence.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-16 text-black">
            <div className="space-y-4">
                <span className="text-[#9C8B7A] text-[10px] font-bold uppercase tracking-widest">Immobilier</span>
                <h3 className="text-xl">Architecture & Promotion</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">Rendus photoréalistes qui subliment chaque projet avant sa construction.</p>
            </div>
            <div className="space-y-4">
                <span className="text-[#9C8B7A] text-[10px] font-bold uppercase tracking-widest">Industrie</span>
                <h3 className="text-xl">Supply Chain & Logistique</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">Visualisation claire d'entrepôts et chaînes logistiques pour vos présentations.</p>
            </div>
            <div className="space-y-4">
                <span className="text-[#9C8B7A] text-[10px] font-bold uppercase tracking-widest">Luxe</span>
                <h3 className="text-xl">Produits & Packaging</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">Mises en scène sophistiquées pour l'horlogerie et la cosmétique.</p>
            </div>
        </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 bg-[#1A1A1A] text-white text-center">
    <FadeIn>
      <h2 className="text-5xl md:text-7xl font-light mb-12">Donnons vie à votre vision.</h2>
      <a href="mailto:tifanie.taillefer@gmail.com" className="text-xl border-b border-white/20 pb-2 hover:text-[#9C8B7A] transition-colors">
        tifanie.taillefer@gmail.com
      </a>
      <p className="mt-12 text-[10px] tracking-[0.3em] uppercase opacity-40">Basée en France — Disponible internationalement</p>
    </FadeIn>
  </section>
);

// --- APP PRINCIPALE ---
export default function App() {
  return (
    <div className="bg-[#FAFAF9] selection:bg-[#9C8B7A]/30 antialiased">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <Navbar />
      <Hero />
      <Expertise />
      <Contact />
      <footer className="py-10 text-center text-[9px] uppercase tracking-widest text-neutral-400 border-t border-neutral-100 bg-white">
        © 2026 Tifanie Taillefer — Tous droits réservés
      </footer>
    </div>
  );
}
