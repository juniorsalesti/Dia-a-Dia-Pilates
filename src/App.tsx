import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  X, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Award, 
  Users, 
  Check, 
  Heart, 
  Sparkles, 
  ChevronLeft,
  ChevronRight, 
  ArrowRight, 
  Quote, 
  Instagram, 
  ShieldCheck, 
  Activity,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- ANIMATION WRAPPERS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function App() {
  // Navigation States
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // WhatsApp & Modal States
  const [whatsappFloatOpen, setWhatsappFloatOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [selectedUnitForModal, setSelectedUnitForModal] = useState<"unidade1" | "unidade2" | null>(null);

  // Parallax Hero state
  const [scrollY, setScrollY] = useState(0);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryImages = [
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHyihwrBkZ7QWWa_wBY0OLBuxNn_fpia-b_VjyMC7SxIlGb70M4xiBcjhvtwChxTdO1nfFmAHnpAcibq_dbq183xShQGnQc1FqJssEzrc1K3CalZlFo5a4dTVoJppJ0wZhK027FrgzM9szu=s680-w680-h510-rw",
      tag: "Estrutura Premium",
      title: "Aparelhos de Pilates Modernos",
      desc: "Unidades equipadas com o que há de melhor no mercado para seu conforto, segurança e evolução postural."
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEKboOOH7xGRuLMMsRC-bDwmkR1zBD1pFJAnF4D1ulR7jkz-K06Obnnd4WN_AteYWBoZrP4HtHXIS-PCfnmQBfyUBJZ4pHJTnwQpU9AwkFykQGRQ7s-og1kcs1P9iyWXm7ECtPb67DD65IH=s680-w680-h510-rw",
      tag: "Atendimento Clínico",
      title: "Pilates Clínico e Reabilitação",
      desc: "Aulas conduzidas por fisioterapeutas com olhar focado na sua saúde postural e alívio definitivo de dores."
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHPuzr9miWoLgl2IoqSh2JdYNnViol5uXIpmFo7Lbz90rDMWhh9yvPK7fooPVVMI4DNI01B2gXkXcvTsu3KPHuLhSGGPj2wQdOo2iG3kmgxzT96LUPLudsH_uXaXDjsvyk906USJPsZqY0=s680-w680-h510-rw",
      tag: "Exclusivo para Mulheres",
      title: "Espaço Confortável e Acolhedor",
      desc: "Ambiente reservado, leve e climatizado, ideal para você se desconectar da rotina diária e focar em si mesma."
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFx5Evd330rpx_sL9khTWuvFbcnBfk1eAn2HrIkD7XxDUiGo-JaLrvLKMDMaalraKnEZn7N4gc746aMfciipVvl7B3QjLsSUsBHltWKjX59WvpuPTymsn57hQMv21RblVOsBGGHM5Epbyhy=s680-w680-h510-rw",
      tag: "Saúde Integral",
      title: "Equilíbrio, Força e Flexibilidade",
      desc: "Aulas personalizadas e adaptadas para todas as idades, promovendo bem-estar físico e mental duradouro."
    },
    {
      src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHgShuTtXTSyjty1XG_wbkmgSIwk1W1iiHJ-NO6RW4NSzQ3yPfXyFz7WQv0GiOYzApATDu9N0ZtALQZltQQCs5chH_RXt9AARx_-mPxbu5pn7NXVvIkYu8CSUEF5LL3OHWc1Zwq0yjTHMTF=s680-w680-h510-rw",
      tag: "Terapias Manuais",
      title: "Atendimento Individualizado",
      desc: "Integração de terapias manuais especializadas e ventosaterapia para acelerar sua recuperação física."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Mobile swipe gesture support for the carousel
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Counters state (animated on viewport entry)
  const [counters, setCounters] = useState({
    years: 0,
    reviews: 0,
    rating: 0
  });
  const countersRef = useRef<HTMLDivElement>(null);
  const countersStarted = useRef(false);

  // Smooth scroll helper
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 80; // height of the sticky navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Listen to scroll events
  useEffect(() => {
    document.title = "Dia a Dia Pilates | Estúdio de Pilates Feminino em Campinas";
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counter animation logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !countersStarted.current) {
          countersStarted.current = true;
          
          // Animate Years (0 to 15)
          let yearsProgress = 0;
          const yearsInterval = setInterval(() => {
            yearsProgress += 1;
            if (yearsProgress >= 15) {
              yearsProgress = 15;
              clearInterval(yearsInterval);
            }
            setCounters(prev => ({ ...prev, years: yearsProgress }));
          }, 60);

          // Animate Reviews (0 to 32)
          let reviewsProgress = 0;
          const reviewsInterval = setInterval(() => {
            reviewsProgress += 1;
            if (reviewsProgress >= 32) {
              reviewsProgress = 32;
              clearInterval(reviewsInterval);
            }
            setCounters(prev => ({ ...prev, reviews: reviewsProgress }));
          }, 30);

          // Animate Rating (0 to 5)
          let ratingProgress = 0.0;
          const ratingInterval = setInterval(() => {
            ratingProgress += 0.2;
            if (ratingProgress >= 5.0) {
              ratingProgress = 5.0;
              clearInterval(ratingInterval);
            }
            setCounters(prev => ({ ...prev, rating: parseFloat(ratingProgress.toFixed(1)) }));
          }, 40);


        }
      },
      { threshold: 0.1 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle CTA Unit Selection
  const openScheduleModal = (unit: "unidade1" | "unidade2" | null = null) => {
    setSelectedUnitForModal(unit);
    setIsUnitModalOpen(true);
  };

  const getWhatsAppLink = (unit: "unidade1" | "unidade2") => {
    const baseUrl = "https://wa.me/5519982632658";
    if (unit === "unidade1") {
      return `${baseUrl}?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20na%20Unidade%20I%20(Jardim%20Campos%20El%C3%ADseos).`;
    } else {
      return `${baseUrl}?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20na%20Unidade%20II%20(Jardim%20Aur%C3%A9lia).`;
    }
  };

  return (
    <div className="min-h-screen bg-[#D7FAE5] text-[#2E3A28] font-sans selection:bg-[#8FA382] selection:text-white overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "nav-glass py-3 shadow-xs" : "nav-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="flex items-center select-none group py-1">
            <img 
              src="https://i.ibb.co/pGNB96R/dia-a-dia-1.png" 
              alt="Dia a Dia Pilates" 
              className="h-14 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#sobre" onClick={(e) => scrollToSection(e, "sobre")} className="text-[#4A5D43] hover:text-[#8FA382] text-sm font-medium tracking-wide transition-colors duration-300">Sobre</a>
            <a href="#servicos" onClick={(e) => scrollToSection(e, "servicos")} className="text-[#4A5D43] hover:text-[#8FA382] text-sm font-medium tracking-wide transition-colors duration-300">Serviços</a>
            <a href="#galeria" onClick={(e) => scrollToSection(e, "galeria")} className="text-[#4A5D43] hover:text-[#8FA382] text-sm font-medium tracking-wide transition-colors duration-300">Galeria</a>
            <a href="#depoimentos" onClick={(e) => scrollToSection(e, "depoimentos")} className="text-[#4A5D43] hover:text-[#8FA382] text-sm font-medium tracking-wide transition-colors duration-300">Depoimentos</a>
            <a href="#unidades" onClick={(e) => scrollToSection(e, "unidades")} className="text-[#4A5D43] hover:text-[#8FA382] text-sm font-medium tracking-wide transition-colors duration-300">Unidades</a>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button 
              id="nav-cta-btn"
              onClick={() => openScheduleModal(null)}
              className="bg-[#4A5D43] hover:bg-[#8FA382] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-102 shadow-xs active:scale-98 flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar size={14} className="text-[#C9B896]" />
              AGENDAR AULA EXPERIMENTAL
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#4A5D43] hover:text-[#8FA382] focus:outline-none p-3 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#8FA382]/10 transition-colors"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#D7FAE5] border-b border-[#8FA382]/15 px-6 pt-2 pb-8 space-y-4 shadow-md"
            >
              <div className="flex flex-col pt-2">
                <a 
                  href="#sobre" 
                  onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "sobre"); }}
                  className="text-[#4A5D43] hover:text-[#8FA382] text-base font-medium py-3.5 block w-full text-left border-b border-[#8FA382]/10 transition-colors"
                >
                  Sobre o Estúdio
                </a>
                <a 
                  href="#servicos" 
                  onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "servicos"); }}
                  className="text-[#4A5D43] hover:text-[#8FA382] text-base font-medium py-3.5 block w-full text-left border-b border-[#8FA382]/10 transition-colors"
                >
                  Serviços
                </a>
                <a 
                  href="#galeria" 
                  onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "galeria"); }}
                  className="text-[#4A5D43] hover:text-[#8FA382] text-base font-medium py-3.5 block w-full text-left border-b border-[#8FA382]/10 transition-colors"
                >
                  Galeria de Fotos
                </a>
                <a 
                  href="#depoimentos" 
                  onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "depoimentos"); }}
                  className="text-[#4A5D43] hover:text-[#8FA382] text-base font-medium py-3.5 block w-full text-left border-b border-[#8FA382]/10 transition-colors"
                >
                  Depoimentos Reais
                </a>
                <a 
                  href="#unidades" 
                  onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "unidades"); }}
                  className="text-[#4A5D43] hover:text-[#8FA382] text-base font-medium py-3.5 block w-full text-left border-b border-[#8FA382]/10 transition-colors"
                >
                  Nossas Duas Unidades
                </a>
              </div>
              
              <button 
                id="mobile-nav-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openScheduleModal(null);
                }}
                className="w-full bg-[#4A5D43] hover:bg-[#8FA382] text-white py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2 mt-4 whitespace-nowrap"
              >
                <Calendar size={14} className="text-[#C9B896]" />
                AGENDAR AULA EXPERIMENTAL
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section 
        id="hero" 
        className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden"
      >
        {/* Parallax Background Image with Sage Overlay */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1920" 
            alt="Mulher praticando Pilates com leveza" 
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle warm, calm mint green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D7FAE5]/95 via-[#D7FAE5]/85 to-[#D7FAE5]/40 md:from-[#D7FAE5]/98 md:via-[#D7FAE5]/80 md:to-[#D7FAE5]/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
          <div className="max-w-2xl text-left">
            {/* Google Stars Rating Indicator */}


            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#2E3A28] leading-[1.15] sm:leading-[1.1] mb-6"
            >
              Mais que Pilates:<br />
              <span className="font-semibold text-[#4A5D43]">um ritual de força</span><br />
              e autoestima feminina.
            </motion.h1>

            {/* Subheadline detailing major value propositions */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-[#2E3A28]/85 font-light leading-relaxed mb-8 max-w-xl"
            >
              Espaço acolhedor e seguro pensado <strong className="font-semibold text-[#4A5D43]">exclusivamente para o público feminino</strong>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              <button 
                id="hero-primary-cta"
                onClick={() => openScheduleModal(null)}
                className="bg-[#4A5D43] hover:bg-[#8FA382] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-102 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                AGENDAR AULA EXPERIMENTAL
              </button>
              
              <a 
                href="#unidades"
                onClick={(e) => scrollToSection(e, "unidades")}
                className="inline-flex items-center justify-center gap-2 border border-[#4A5D43]/30 hover:border-[#4A5D43] text-[#4A5D43] hover:bg-[#4A5D43]/5 px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300"
              >
                Ver Unidades em Campinas
              </a>
            </motion.div>

            {/* Symmetrical highlight of both Campinas units in Hero */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-[#8FA382]/20 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5D43] font-medium">
                <MapPin size={16} className="text-[#C9B896] shrink-0" />
                <span>Unidade I · Campos Elíseos</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5D43] font-medium">
                <MapPin size={16} className="text-[#C9B896] shrink-0" />
                <span>Unidade II · Vila Proost de Souza</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SOBRE O ESTÚDIO --- */}
      <section id="sobre" className="py-20 md:py-28 bg-[#FFFFFF] relative overflow-hidden">
        {/* Decorative subtle shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D7FAE5]/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-lg group">
                <img 
                  src="https://i.ibb.co/3qL6LDZ/imagem-2026-06-24-162317220.png" 
                  alt="Estúdio de Pilates Dia a Dia" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#4A5D43]/10 mix-blend-multiply"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-[#FFFFFF]/90 backdrop-blur-xs p-5 rounded-xl border border-[#8FA382]/15">
                  <span className="font-serif text-lg font-medium text-[#4A5D43] block">Atendimento Clínico</span>
                  <span className="text-xs text-[#2E3A28]/80 leading-relaxed block mt-1">Nossas instrutoras possuem pós-graduação em fisioterapia ortopédica e postural.</span>
                </div>
              </div>
            </div>

            {/* Text & Stats Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9B896] block">
                  Quem Somos · Dia a Dia Pilates
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A5D43] leading-tight">
                  Um refúgio de bem-estar e reabilitação exclusivo para mulheres.
                </h2>
                <div className="h-1 w-20 bg-[#C9B896] rounded-full"></div>
              </div>

              <div className="space-y-4 text-base text-[#2E3A28]/85 font-light leading-relaxed">
                <p>
                  No <strong className="font-semibold text-[#4A5D43]">Dia a Dia Pilates</strong>, acreditamos que o movimento cura. Nosso espaço foi minuciosamente desenhado para oferecer acolhimento, privacidade e conforto absolutos para o público feminino.
                </p>
                <p>
                  Diferente de academias convencionais ou estúdios generalistas, todas as nossas instrutoras possuem <strong className="font-semibold text-[#4A5D43]">formação completa em Fisioterapia</strong>. Isso significa que suas aulas são tratadas com olhar clínico-terapêutico especializado, seja para ganho de força, correção postural, preparação para o parto ou reabilitação de dores crônicas.
                </p>
                <p>
                  Atendemos com o mesmo carinho e cuidado especializado todas as fases da vida da mulher: de adolescentes e jovens adultas a gestantes, mães no pós-parto e mulheres na melhor idade (60+).
                </p>
              </div>

              {/* 4 Pillars Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3">
                  <div className="bg-[#D7FAE5] text-[#4A5D43] p-2 rounded-full self-start">
                    <Heart size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#4A5D43] uppercase tracking-wider">100% Exclusivo</h4>
                    <p className="text-xs text-[#2E3A28]/80">Ambiente acolhedor focado apenas em mulheres.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-[#D7FAE5] text-[#4A5D43] p-2 rounded-full self-start">
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#4A5D43] uppercase tracking-wider">Fisioterapeutas</h4>
                    <p className="text-xs text-[#2E3A28]/80">Cuidado clínico e reabilitação postural.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-[#D7FAE5] text-[#4A5D43] p-2 rounded-full self-start">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#4A5D43] uppercase tracking-wider">+15 Anos</h4>
                    <p className="text-xs text-[#2E3A28]/80">Tradição e centenas de vidas transformadas.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-[#D7FAE5] text-[#4A5D43] p-2 rounded-full self-start">
                    <Users size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#4A5D43] uppercase tracking-wider">2 Unidades</h4>
                    <p className="text-xs text-[#2E3A28]/80">Campos Elíseos e Aurélia de fácil acesso.</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Animated Stats Bar */}
              <div 
                ref={countersRef}
                className="flex justify-center p-4 sm:p-6 bg-[#D7FAE5]/50 rounded-2xl border border-[#8FA382]/10 mt-8"
              >
                <div className="text-center">
                  <span className="block font-serif text-2xl sm:text-4xl font-bold text-[#4A5D43]">
                    +{counters.years}
                  </span>
                  <span className="text-[9px] sm:text-xs font-semibold tracking-wider text-[#2E3A28]/80 uppercase block">
                    Anos de História
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* --- SERVIÇOS / TERAPIAS --- */}
      <section id="servicos" className="py-20 md:py-28 bg-[#D7FAE5]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9B896] block">
              Tratamentos & Bem-Estar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A5D43]">
              Nossas Especialidades de Atendimento
            </h2>
            <div className="h-1 w-16 bg-[#C9B896] mx-auto rounded-full"></div>
            <p className="text-base text-[#2E3A28]/80 font-light leading-relaxed">
              Aliamos técnicas tradicionais de Pilates clínico com fisioterapia manual integrativa para promover alívio de tensões corporais, fortalecimento global e reabilitação ativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#8FA382]/10 shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D7FAE5]/30 rounded-bl-full -tr-4 -mr-4 transition-all duration-500 group-hover:bg-[#8FA382]/10"></div>
              <div className="bg-[#D7FAE5] text-[#4A5D43] w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#4A5D43] group-hover:text-white">
                <Activity size={24} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#4A5D43] mb-3 group-hover:text-[#8FA382] transition-colors duration-300">
                Pilates Solo & Aparelhos
              </h3>
              <p className="text-sm text-[#2E3A28]/80 font-light leading-relaxed mb-6">
                Aulas personalizadas em aparelhos tradicionais (Cadillac, Reformer, Wunda Chair) e acessórios de solo. Foco em fortalecimento global, correção postural e flexibilidade.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#4A5D43] uppercase tracking-wider gap-1 group-hover:gap-2 transition-all duration-300">
                <span>Atendimento Personalizado</span>
                <ChevronRight size={14} className="text-[#C9B896]" />
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#8FA382]/10 shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D7FAE5]/30 rounded-bl-full -tr-4 -mr-4 transition-all duration-500 group-hover:bg-[#8FA382]/10"></div>
              <div className="bg-[#D7FAE5] text-[#4A5D43] w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#4A5D43] group-hover:text-white">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#4A5D43] mb-3 group-hover:text-[#8FA382] transition-colors duration-300">
                Pilates para Gestantes
              </h3>
              <p className="text-sm text-[#2E3A28]/80 font-light leading-relaxed mb-6">
                Atendimento seguro para futuras mamães. Auxilia na melhora de dores lombares, fortalecimento do assoalho pélvico (assoalho uroginecológico) e preparo fisiológico para o parto.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#4A5D43] uppercase tracking-wider gap-1 group-hover:gap-2 transition-all duration-300">
                <span>Segurança & Carinho</span>
                <ChevronRight size={14} className="text-[#C9B896]" />
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#8FA382]/10 shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D7FAE5]/30 rounded-bl-full -tr-4 -mr-4 transition-all duration-500 group-hover:bg-[#8FA382]/10"></div>
              <div className="bg-[#D7FAE5] text-[#4A5D43] w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#4A5D43] group-hover:text-white">
                <Star size={24} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#4A5D43] mb-3 group-hover:text-[#8FA382] transition-colors duration-300">
                Melhor Idade (60+)
              </h3>
              <p className="text-sm text-[#2E3A28]/80 font-light leading-relaxed mb-6">
                Pilates focado na melhoria do equilíbrio, flexibilidade, prevenção de quedas, controle de artroses e resgate da autonomia para o dia a dia, com respeito aos limites individuais.
              </p>
              <div className="flex items-center text-xs font-semibold text-[#4A5D43] uppercase tracking-wider gap-1 group-hover:gap-2 transition-all duration-300">
                <span>Longevidade Ativa</span>
                <ChevronRight size={14} className="text-[#C9B896]" />
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button 
              id="services-cta-btn"
              onClick={() => openScheduleModal(null)}
              className="inline-flex items-center gap-2 bg-[#4A5D43] hover:bg-[#8FA382] text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm hover:scale-102 whitespace-nowrap"
            >
              AGENDAR AULA EXPERIMENTAL
            </button>
          </div>

        </div>
      </section>

      {/* --- GALERIA --- */}
      <section id="galeria" className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9B896] block">
              Nosso Espaço Acolhedor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A5D43]">
              Estrutura Premium<br />Dia a Dia
            </h2>
            <div className="h-1 w-16 bg-[#C9B896] mx-auto rounded-full"></div>
            <p className="text-base text-[#2E3A28]/80 font-light leading-relaxed">
              Estúdios equipados com as melhores tecnologias de Pilates do mercado, iluminados, amplos e extremamente organizados para garantir a melhor prática possível.
            </p>
          </div>

          {/* Custom Interactive Carousel */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Stage Panel */}
            <div className="bg-[#D7FAE5]/40 rounded-3xl p-5 sm:p-8 border border-[#8FA382]/15 shadow-xs overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Image Container with Arrow Controls */}
                <div 
                  className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs group cursor-grab active:cursor-grabbing"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={galleryImages[currentSlide].src}
                      alt={galleryImages[currentSlide].title}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Symmetrical arrows layered on the image */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button
                      onClick={prevSlide}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-[#4A5D43] hover:text-[#8FA382] hover:bg-white flex items-center justify-center shadow-md pointer-events-auto transition-all active:scale-95"
                      aria-label="Imagem Anterior"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-[#4A5D43] hover:text-[#8FA382] hover:bg-white flex items-center justify-center shadow-md pointer-events-auto transition-all active:scale-95"
                      aria-label="Próxima Imagem"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Text Content Column */}
                <div className="lg:col-span-5 space-y-4 text-center lg:text-left flex flex-col justify-between h-full min-h-[220px]">
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9B896] block">
                      {galleryImages[currentSlide].tag}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A5D43] leading-tight">
                      {galleryImages[currentSlide].title}
                    </h3>
                    <div className="h-0.5 w-12 bg-[#C9B896] mx-auto lg:mx-0 rounded-full"></div>
                    <p className="text-sm sm:text-base text-[#2E3A28]/85 font-light leading-relaxed">
                      {galleryImages[currentSlide].desc}
                    </p>
                  </div>

                  {/* Dots Indicator & Mini Nav bar */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#8FA382]/10 mt-auto">
                    {/* Dots */}
                    <div className="flex gap-2.5">
                      {galleryImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            idx === currentSlide 
                              ? "bg-[#4A5D43] w-6" 
                              : "bg-[#8FA382]/35 hover:bg-[#8FA382]/65"
                          }`}
                          aria-label={`Ir para imagem ${idx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Numeric tracking */}
                    <span className="text-xs font-mono text-[#2E3A28]/70 tracking-wider">
                      0{currentSlide + 1} / 0{galleryImages.length}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Thumbnail Row Below Carousel (Desktop/Tablet helper) */}
            <div className="hidden sm:flex justify-center gap-4 mt-8">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] w-24 border-2 transition-all duration-300 ${
                    idx === currentSlide 
                      ? "border-[#4A5D43] scale-105 shadow-md" 
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <span className="text-xs text-[#2E3A28]/70 italic">
              *Visite qualquer uma de nossas unidades para conhecer pessoalmente nossas salas climatizadas e preparadas.
            </span>
          </div>

        </div>
      </section>

      {/* --- DEPOIMENTOS DE CLIENTES --- */}
      <section id="depoimentos" className="py-20 md:py-28 bg-[#D7FAE5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9B896] block">
              Histórias de Transformação
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A5D43]">
              O que dizem as nossas alunas
            </h2>
            <div className="h-1 w-16 bg-[#C9B896] mx-auto rounded-full"></div>
            <p className="text-base text-[#2E3A28]/80 font-light">
              Veja depoimentos reais e sinceros de mulheres que recuperaram sua mobilidade, saúde e autoestima no Dia a Dia Pilates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Depoimento 1 */}
            <div className="bg-white p-8 rounded-2xl border border-[#8FA382]/10 shadow-xs flex flex-col justify-between relative">
              <div className="absolute top-6 right-8 text-[#D7FAE5] pointer-events-none">
                <Quote size={48} className="opacity-60" />
              </div>
              <div className="space-y-4">
                <div className="flex text-[#C9B896] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C9B896" className="stroke-none" />
                  ))}
                </div>
                <p className="text-base text-[#2E3A28]/90 font-light leading-relaxed italic">
                  "Com profissionais extremamente competentes, atenciosas e acolhedoras! É o meu momento favorito do dia."
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#8FA382]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D7FAE5] text-[#4A5D43] flex items-center justify-center font-bold text-sm">
                  LL
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#4A5D43]">Luana Luca</h4>
                  <span className="text-xs text-[#2E3A28]/70">Aluna · Google Reviews</span>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white p-8 rounded-2xl border border-[#8FA382]/10 shadow-xs flex flex-col justify-between relative">
              <div className="absolute top-6 right-8 text-[#D7FAE5] pointer-events-none">
                <Quote size={48} className="opacity-60" />
              </div>
              <div className="space-y-4">
                <div className="flex text-[#C9B896] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C9B896" className="stroke-none" />
                  ))}
                </div>
                <p className="text-base text-[#2E3A28]/90 font-light leading-relaxed italic">
                  "Sou cliente há mais de 10 anos no estúdio. A estrutura evoluiu muito, mas o carinho, a atenção das fisioterapeutas e a dedicação continuam impecáveis."
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#8FA382]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D7FAE5] text-[#4A5D43] flex items-center justify-center font-bold text-sm">
                  MB
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#4A5D43]">Maria Barbosa Reis</h4>
                  <span className="text-xs text-[#2E3A28]/70">Aluna desde 2016 · Fidelidade</span>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white p-8 rounded-2xl border border-[#8FA382]/10 shadow-xs flex flex-col justify-between relative">
              <div className="absolute top-6 right-8 text-[#D7FAE5] pointer-events-none">
                <Quote size={48} className="opacity-60" />
              </div>
              <div className="space-y-4">
                <div className="flex text-[#C9B896] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C9B896" className="stroke-none" />
                  ))}
                </div>
                <p className="text-base text-[#2E3A28]/90 font-light leading-relaxed italic">
                  "Equipe simplesmente sensacional!! O ambiente é leve, focado somente em nós mulheres e as fisioterapeutas são extremamente cuidadosas."
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#8FA382]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D7FAE5] text-[#4A5D43] flex items-center justify-center font-bold text-sm">
                  LC
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#4A5D43]">Lari Cairo</h4>
                  <span className="text-xs text-[#2E3A28]/70">Aluna · Google Reviews</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 bg-white/50 border border-[#8FA382]/20 rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-sm text-[#4A5D43] font-medium">
              Quer fazer parte das centenas de mulheres satisfeitas?
            </span>
            <button 
              id="testimonial-cta-btn"
              onClick={() => openScheduleModal(null)}
              className="bg-[#4A5D43] hover:bg-[#8FA382] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
            >
              AGENDAR AULA EXPERIMENTAL
            </button>
          </div>

        </div>
      </section>

      {/* --- NOSSAS UNIDADES / MAPA --- */}
      <section id="unidades" className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9B896] block">
              Duas Regiões Próximas de Você
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A5D43]">
              Nossas Duas Unidades em Campinas
            </h2>
            <div className="h-1 w-16 bg-[#C9B896] mx-auto rounded-full"></div>
            <p className="text-base text-[#2E3A28]/80 font-light leading-relaxed">
              Estruturas com pesos equivalentes e alto padrão de atendimento para você praticar na que for mais conveniente no seu dia a dia.
            </p>
          </div>

          {/* Symmetrical Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* UNIDADE I: Campos Elíseos */}
            <div className="flex flex-col justify-between bg-[#D7FAE5]/25 rounded-2xl p-5 sm:p-8 border border-[#8FA382]/15 shadow-xs hover:shadow-md transition-all duration-300 relative">
              
              <div className="space-y-6">
                <div>
                  <span className="inline-block bg-[#8FA382]/20 text-[#4A5D43] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#8FA382]/10 mb-3">
                    UNIDADE I
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#4A5D43]">Jardim Campos Elíseos</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#C9B896] mt-1.5">
                    <div className="flex text-[#C9B896]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#C9B896" className="stroke-none" />
                      ))}
                    </div>
                    <span className="font-medium text-[#4A5D43]/80">5,0 · 32 avaliações no Google</span>
                  </div>
                </div>

                {/* Contact and address block */}
                <div className="space-y-4 text-sm text-[#2E3A28]/95">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#8FA382] mt-0.5 shrink-0" size={18} />
                    <span>Rua Conselheiro Antônio Carlos, 1169 — Jardim Campos Elíseos, Campinas - SP, CEP 13060-024</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#8FA382] shrink-0" size={18} />
                    <span>Seg a Sáb · 07h às 20h <span className="text-xs text-[#2E3A28]/70">(Necessário agendar)</span></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="text-[#8FA382] shrink-0" size={18} />
                    <span>WhatsApp: <strong>(19) 98263-2658</strong></span>
                  </div>
                </div>

                {/* Map integration using responsive styled frame */}
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#8FA382]/20 shadow-xs relative bg-[#D7FAE5]/50">
                  <iframe 
                    title="Mapa Jardim Campos Elíseos - Dia a Dia Pilates"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.074360305886!2d-47.09139882468897!3d-22.910626379250552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c7bb5e2f75ef%3A0x8f7d98305c4c207b!2sR.%20Conselheiro%20Ant%C3%B4nio%20Carlos%2C%201169%20-%20Jardim%20Campos%20El%C3%ADseos%2C%20Campinas%20-%20SP%2C%2013060-024!5e0!3m2!1spt-BR!2sbr!4v1719260000000!5m2!1spt-BR!2sbr"
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Action Button for Unit I */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a 
                  id="unidade1-whatsapp"
                  href={getWhatsAppLink("unidade1")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#4A5D43] hover:bg-[#8FA382] text-white py-3.5 px-6 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-xs text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} className="text-[#C9B896]" />
                  Falar no WhatsApp
                </a>
                <button 
                  onClick={() => openScheduleModal("unidade1")}
                  className="bg-[#FFFFFF] hover:bg-[#D7FAE5] border border-[#4A5D43]/20 text-[#4A5D43] py-3.5 px-6 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-center whitespace-nowrap"
                >
                  AGENDAR AULA EXPERIMENTAL
                </button>
              </div>
            </div>

            {/* UNIDADE II: Vila Proost de Souza */}
            <div className="flex flex-col justify-between bg-[#D7FAE5]/25 rounded-2xl p-5 sm:p-8 border border-[#8FA382]/15 shadow-xs hover:shadow-md transition-all duration-300 relative">
              
              <div className="space-y-6">
                <div>
                  <span className="inline-block bg-[#8FA382]/20 text-[#4A5D43] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-[#8FA382]/10 mb-3">
                    UNIDADE II
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#4A5D43]">Vila Proost de Souza</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#C9B896] mt-1.5">
                    <div className="flex text-[#C9B896]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#C9B896" className="stroke-none" />
                      ))}
                    </div>
                    <span className="font-medium text-[#4A5D43]/80">5,0 · 18 avaliações no Google</span>
                  </div>
                </div>

                {/* Contact and address block */}
                <div className="space-y-4 text-sm text-[#2E3A28]/95">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#8FA382] mt-0.5 shrink-0" size={18} />
                    <span>Av. José Pancetti, 515 - Piso Superior — Vila Proost de Souza, Campinas - SP, CEP 13033-740</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#8FA382] shrink-0" size={18} />
                    <span>Seg a Sáb · 07h às 20h <span className="text-xs text-[#2E3A28]/70">(Necessário agendar)</span></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="text-[#8FA382] shrink-0" size={18} />
                    <span>WhatsApp: <strong>(19) 98263-2658</strong></span>
                  </div>
                </div>

                {/* Map integration using responsive styled frame */}
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#8FA382]/20 shadow-xs relative bg-[#D7FAE5]/50">
                  <iframe 
                    title="Mapa Vila Proost de Souza - Dia a Dia Pilates"
                    src="https://maps.google.com/maps?q=Av.%20Jos%C3%A9%20Pancetti%2C%20515%20-%20Vila%20Proost%20de%20Souza%2C%20Campinas%20-%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Action Button for Unit II */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a 
                  id="unidade2-whatsapp"
                  href={getWhatsAppLink("unidade2")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#4A5D43] hover:bg-[#8FA382] text-white py-3.5 px-6 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-xs text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} className="text-[#C9B896]" />
                  Falar no WhatsApp
                </a>
                <button 
                  onClick={() => openScheduleModal("unidade2")}
                  className="bg-[#FFFFFF] hover:bg-[#D7FAE5] border border-[#4A5D43]/20 text-[#4A5D43] py-3.5 px-6 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-center whitespace-nowrap"
                >
                  AGENDAR AULA EXPERIMENTAL
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="footer" className="bg-[#4A5D43] text-[#EAEFE6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#8FA382]/20">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <img 
                src="https://i.ibb.co/pGNB96R/dia-a-dia-1.png" 
                alt="Dia a Dia Pilates" 
                className="h-16 sm:h-24 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C9B896] mt-2">
                Exclusivo para Mulheres
              </p>
              <p className="text-sm text-[#EAEFE6]/80 font-light leading-relaxed max-w-sm">
                Há mais de 15 anos oferecendo cuidado clínico e fisioterapêutico especializado para o corpo feminino em Campinas - SP.
              </p>
              <div className="flex gap-4 pt-2">
                <a 
                  id="instagram-link"
                  href="https://instagram.com/diaadiapilates" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#8FA382]/30 flex items-center justify-center text-white hover:bg-[#C9B896] hover:text-[#4A5D43] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif text-lg font-semibold text-white">Navegação</h4>
              <ul className="space-y-2 text-sm text-[#EAEFE6]/80 font-light">
                <li><a href="#sobre" onClick={(e) => scrollToSection(e, "sobre")} className="hover:text-white transition-colors">Sobre o Estúdio</a></li>
                <li><a href="#servicos" onClick={(e) => scrollToSection(e, "servicos")} className="hover:text-white transition-colors">Tratamentos</a></li>
                <li><a href="#galeria" onClick={(e) => scrollToSection(e, "galeria")} className="hover:text-white transition-colors">Galeria</a></li>
                <li><a href="#depoimentos" onClick={(e) => scrollToSection(e, "depoimentos")} className="hover:text-white transition-colors">Depoimentos</a></li>
                <li><a href="#unidades" onClick={(e) => scrollToSection(e, "unidades")} className="hover:text-white transition-colors">Nossas Unidades</a></li>
              </ul>
            </div>

            {/* Units Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif text-lg font-semibold text-white">Unidades Campinas</h4>
              <ul className="space-y-4 text-xs text-[#EAEFE6]/80 font-light">
                <li className="space-y-1">
                  <strong className="block text-white text-sm">Unidade I · Campos Elíseos</strong>
                  <span>Rua Conselheiro Antônio Carlos, 1169</span>
                  <span className="block opacity-85">Campos Elíseos, Campinas - SP</span>
                </li>
                <li className="space-y-1">
                  <strong className="block text-white text-sm">Unidade II · Vila Proost de Souza</strong>
                  <span>Av. José Pancetti, 515 - Piso Superior</span>
                  <span className="block opacity-85">Vila Proost de Souza, Campinas - SP</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EAEFE6]/65 font-light">
            <span>
              &copy; {new Date().getFullYear()} Dia a Dia Pilates. Todos os direitos reservados.
            </span>
            <span className="mt-2 sm:mt-0">
              Desenvolvido com carinho para o bem-estar feminino.
            </span>
          </div>

        </div>
      </footer>

      {/* --- FLOATING WHATSAPP INTERACTIVE BUTTON --- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {whatsappFloatOpen && (
            <motion.div 
              id="whatsapp-popover"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl p-5 border border-[#8FA382]/20 mb-3 w-72 text-left"
            >
              <h4 className="font-serif text-base font-semibold text-[#4A5D43] mb-1">Qual unidade prefere falar?</h4>
              <p className="text-xs text-[#2E3A28]/70 mb-4 font-light">Selecione uma das unidades para agendar no WhatsApp:</p>
              
              <div className="space-y-3">
                <a 
                  id="float-unidade1-link"
                  href={getWhatsAppLink("unidade1")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsappFloatOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#D7FAE5]/25 hover:bg-[#D7FAE5] border border-[#8FA382]/10 hover:border-[#8FA382]/30 transition-all group"
                >
                  <div>
                    <span className="text-xs font-semibold block text-[#4A5D43]">Unidade I</span>
                    <span className="text-[10px] text-[#2E3A28]/75 block">Campos Elíseos</span>
                  </div>
                  <ChevronRight size={16} className="text-[#8FA382] group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a 
                  id="float-unidade2-link"
                  href={getWhatsAppLink("unidade2")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsappFloatOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#D7FAE5]/25 hover:bg-[#D7FAE5] border border-[#8FA382]/10 hover:border-[#8FA382]/30 transition-all group"
                >
                  <div>
                    <span className="text-xs font-semibold block text-[#4A5D43]">Unidade II</span>
                    <span className="text-[10px] text-[#2E3A28]/75 block">Vila Proost de Souza</span>
                  </div>
                  <ChevronRight size={16} className="text-[#8FA382] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          id="whatsapp-floating-btn"
          onClick={() => setWhatsappFloatOpen(!whatsappFloatOpen)}
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center relative group"
          aria-label="Fale Conosco no WhatsApp"
        >
          {/* Pulsing indicator */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:animate-none"></span>
          <MessageCircle size={26} className="relative z-10 fill-white stroke-none" />
        </button>
      </div>

      {/* --- UNIT SELECTION MODAL --- */}
      <AnimatePresence>
        {isUnitModalOpen && (
          <div 
            id="schedule-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto"
            onClick={() => setIsUnitModalOpen(false)}
          >
            <motion.div 
              id="schedule-modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                id="close-modal-btn"
                onClick={() => setIsUnitModalOpen(false)}
                className="absolute top-4 right-4 text-[#2E3A28]/50 hover:text-[#2E3A28] p-1.5 rounded-full hover:bg-[#D7FAE5]"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9B896] block mb-1">Agende sua Aula Experimental</span>
                <h3 className="font-serif text-2xl font-semibold text-[#4A5D43]">Escolha a unidade de sua preferência</h3>
                <p className="text-sm text-[#2E3A28]/70 mt-1.5 max-w-md mx-auto">Temos duas localizações excelentes em Campinas com a mesma qualidade premium de atendimento clínico.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Unit 1 Options */}
                <div className="bg-[#D7FAE5]/25 rounded-2xl p-5 border border-[#8FA382]/15 text-left flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#8FA382] tracking-wider uppercase block mb-1">Unidade I</span>
                    <h4 className="font-serif text-lg font-semibold text-[#4A5D43] mb-1">Campos Elíseos</h4>
                    <p className="text-xs text-[#2E3A28]/85 mb-3">Rua Conselheiro Antônio Carlos, 1169 · Jardim Campos Elíseos, Campinas</p>
                    <div className="text-[11px] text-[#2E3A28]/70 flex items-center gap-1">
                      <Clock size={12} className="text-[#8FA382]" />
                      <span>Seg a Sáb · 07h às 20h</span>
                    </div>
                  </div>
                  
                  <a 
                    id="modal-unidade1-whatsapp"
                    href={getWhatsAppLink("unidade1")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsUnitModalOpen(false)}
                    className="w-full bg-[#4A5D43] hover:bg-[#8FA382] text-white py-2.5 px-4 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-center block mt-4"
                  >
                    Falar com Unidade I
                  </a>
                </div>

                {/* Unit 2 Options */}
                <div className="bg-[#D7FAE5]/25 rounded-2xl p-5 border border-[#8FA382]/15 text-left flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#8FA382] tracking-wider uppercase block mb-1">Unidade II</span>
                    <h4 className="font-serif text-lg font-semibold text-[#4A5D43] mb-1">Vila Proost de Souza</h4>
                    <p className="text-xs text-[#2E3A28]/85 mb-3">Av. José Pancetti, 515 - Piso Superior · Vila Proost de Souza, Campinas</p>
                    <div className="text-[11px] text-[#2E3A28]/70 flex items-center gap-1">
                      <Clock size={12} className="text-[#8FA382]" />
                      <span>Seg a Sáb · 07h às 20h</span>
                    </div>
                  </div>
                  
                  <a 
                    id="modal-unidade2-whatsapp"
                    href={getWhatsAppLink("unidade2")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsUnitModalOpen(false)}
                    className="w-full bg-[#4A5D43] hover:bg-[#8FA382] text-white py-2.5 px-4 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-center block mt-4"
                  >
                    Falar com Unidade II
                  </a>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-[#8FA382]/15">
                <span className="text-xs text-[#2E3A28]/60 block leading-relaxed">
                  Ao clicar, você será direcionada para o WhatsApp do nosso atendimento centralizado que irá agendar seu melhor horário.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
