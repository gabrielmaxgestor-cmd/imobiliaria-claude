import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Compass, 
  Info, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Heart,
  Phone,
  Bed,
  Bath,
  Maximize
} from "lucide-react";
import { CONFIG } from "./config";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [showIntro, setShowIntro] = useState(true);
  const [selectedImovel, setSelectedImovel] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterLocal, setFilterLocal] = useState("all");
  const [filterPreco, setFilterPreco] = useState("all");
  const [currentDepoimento, setCurrentDepoimento] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Temporizador para a frase de abertura poética do Hero
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Injetar variáveis CSS personalizadas do CONFIG dinamicamente no :root
  useEffect(() => {
    const root = document.documentElement;
    const { cores } = CONFIG;
    root.style.setProperty("--cor-fundo", cores.corFundo);
    root.style.setProperty("--cor-fundo-alt", cores.corFundoAlt);
    root.style.setProperty("--cor-escura", cores.corEscura);
    root.style.setProperty("--cor-escura-2", cores.corEscura2);
    root.style.setProperty("--cor-acento", cores.corAcento);
    root.style.setProperty("--cor-acento-escuro", cores.corAcentoEscuro);
    root.style.setProperty("--cor-dourado", cores.corDourado);
    root.style.setProperty("--cor-texto", cores.corTexto);
    root.style.setProperty("--cor-texto-suave", cores.corTextoSuave);
    root.style.setProperty("--cor-branco", cores.corBranco);
  }, []);

  // Monitorar rolagem para alterar design do Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carrossel de Depoimentos - rotação automática a cada 6 segundos
  useEffect(() => {
    if (!CONFIG.depoimentos || CONFIG.depoimentos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentDepoimento((prev) => (prev + 1) % CONFIG.depoimentos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentDepoimento]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de agendar um atendimento exclusivo com a curadoria da ${CONFIG.infoGerais.nome}.`
    );
    window.open(`https://wa.me/${CONFIG.infoGerais.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-fundo text-texto flex flex-col selection:bg-acento/20 selection:text-acento-escuro">
      
      {/* 1. HEADER FIXO */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-fundo/90 backdrop-blur-md py-4 border-b border-texto/5 shadow-[0_4px_30px_rgba(30,43,32,0.03)]"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO EDITORIAL */}
          <a 
            href="#inicio" 
            className="group flex flex-col tracking-widest text-left"
            onClick={() => setActiveSection("inicio")}
          >
            <span className="font-serif text-2xl md:text-3xl font-medium text-escura tracking-wider leading-none transition-colors duration-300 group-hover:text-acento">
              {CONFIG.infoGerais.logoText}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase font-sans font-semibold tracking-[0.25em] text-texto-suave mt-1.5 leading-none">
              {CONFIG.infoGerais.subtituloLogo}
            </span>
          </a>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden lg:flex items-center space-x-10">
            {CONFIG.menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 relative py-1 hover:text-acento after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-acento after:transition-all after:duration-300 ${
                  activeSection === link.href.substring(1)
                    ? "text-acento after:w-full"
                    : "text-texto-suave/80 after:w-0 hover:after:w-full"
                }`}
                onClick={() => setActiveSection(link.href.substring(1))}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* BOTÃO CTA WHATSAPP (DESKTOP) */}
          <div className="hidden lg:block">
            <button
              onClick={handleWhatsAppClick}
              className="group relative inline-flex items-center justify-center px-6 py-3 border border-escura text-escura text-xs uppercase font-semibold tracking-widest overflow-hidden transition-all duration-500 hover:text-branco rounded-none cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-escura transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></span>
              <span className="relative z-10 flex items-center gap-2">
                Atendimento Privado
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
          </div>

          {/* BOTÃO MENU MOBILE (HAMBÚRGUER) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-escura hover:text-acento transition-colors duration-300"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* NAVEGAÇÃO MOBILE */}
        <div
          className={`fixed inset-x-0 top-full bg-fundo border-b border-texto/5 shadow-lg transition-all duration-500 ease-in-out lg:hidden overflow-hidden ${
            isMobileMenuOpen ? "max-h-[85vh] opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-6 flex flex-col space-y-5">
            {CONFIG.menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-xs uppercase font-semibold tracking-widest py-2 border-b border-texto/5 transition-colors ${
                  activeSection === link.href.substring(1) ? "text-acento" : "text-texto-suave"
                }`}
                onClick={() => {
                  setActiveSection(link.href.substring(1));
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleWhatsAppClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-escura text-branco text-xs uppercase font-semibold tracking-widest transition-colors hover:bg-acento"
            >
              Atendimento Privado <Phone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO EM VÍDEO (ABERTURA EMOCIONAL) */}
      <section
        id="inicio"
        className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-escura-2"
        style={{
          backgroundImage: `url(${CONFIG.hero.heroImagemFallback})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* VÍDEO DE FUNDO */}
        {/* SUBSTITUIR PELA URL DO VÍDEO FINAL */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          poster={CONFIG.hero.heroImagemFallback}
        >
          {CONFIG.hero.heroVideoUrl && <source src={CONFIG.hero.heroVideoUrl} type="video/mp4" />}
        </video>

        {/* OVERLAY DE VERDE PROFUNDO */}
        <div className="absolute inset-0 bg-gradient-to-t from-escura-2/95 via-escura/70 to-escura-2/40 z-10"></div>

        {/* SEQUÊNCIA DE TEXTO COM ANIMAÇÃO DE ENTRADA SUAVE */}
        <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center justify-center h-full text-center">
          <AnimatePresence mode="wait">
            {showIntro ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                <span className="font-serif text-2xl md:text-4xl italic text-branco/90 tracking-wide font-light leading-relaxed">
                  {CONFIG.hero.heroFraseAbertura}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.25,
                      delayChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center max-w-4xl"
              >
                {/* Linha divisora elegante */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scaleX: 0 },
                    visible: { opacity: 1, scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="w-[60px] h-[1px] bg-dourado mb-8"
                ></motion.div>

                {/* Sub-label */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-acento font-bold mb-6"
                >
                  {CONFIG.hero.heroEyebrow}
                </motion.span>

                {/* Título Principal */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-branco tracking-tight leading-[1.1] mb-6 max-w-3xl"
                >
                  {(() => {
                    const texto = CONFIG.hero.heroTitulo;
                    const highlight = "onde sua história continua";
                    if (texto.includes(highlight)) {
                      const parts = texto.split(highlight);
                      return (
                        <>
                          {parts[0]}
                          <span className="italic text-dourado font-medium block md:inline">
                            {highlight}
                          </span>
                          {parts[1]}
                        </>
                      );
                    }
                    return texto;
                  })()}
                </motion.h1>

                {/* Subtítulo */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="font-sans text-sm md:text-base text-branco/80 max-w-2xl font-light leading-relaxed mb-10"
                >
                  {CONFIG.hero.heroSubtitulo}
                </motion.p>

                {/* Botões Lado a Lado */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex flex-col sm:flex-row items-center gap-6"
                >
                  {/* Botão Primário */}
                  <a
                    href="#manifesto"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-acento hover:bg-acento-escuro text-branco text-xs uppercase font-semibold tracking-widest transition-all duration-300 rounded-none text-center shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    {CONFIG.hero.heroBotaoPrimario}
                  </a>

                  {/* Link Secundário */}
                  <a
                    href="#imoveis"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex items-center gap-2 text-branco/80 hover:text-branco text-xs uppercase font-semibold tracking-widest border-b border-branco/20 hover:border-branco/60 pb-1.5 transition-all duration-300 cursor-pointer"
                  >
                    <span>{CONFIG.hero.heroBotaoSecundario}</span>
                  </a >
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INDICADOR DE SCROLL */}
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-branco/50 font-sans font-medium">
              {CONFIG.hero.heroScrollText}
            </span>
            <div className="w-[1.2px] h-10 bg-branco/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-dourado animate-scroll-line origin-top"></div>
            </div>
          </motion.div>
        )}
      </section>

      {/* 3. MANIFESTO (SEÇÃO DE CRENÇA/PROPÓSITO, SÓ TEXTO) */}
      <section
        id="manifesto"
        className="relative bg-escura text-branco py-32 md:py-48 px-6 md:px-12 scroll-mt-20 z-10 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Linha Fina Dourada Curta Decorativa */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[40px] h-[1px] bg-dourado mb-16"
          ></motion.div>

          <div className="space-y-16 md:space-y-24">
            
            {/* Bloco 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-branco tracking-tight leading-tight md:leading-snug max-w-3xl mx-auto">
                {CONFIG.manifesto.manifestoBloco1}
              </h2>
            </motion.div>

            {/* Bloco 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-branco/80"
            >
              <div className="font-sans text-lg md:text-2xl font-light leading-relaxed max-w-3xl mx-auto whitespace-pre-line tracking-wide">
                {CONFIG.manifesto.manifestoBloco2}
              </div>
            </motion.div>

            {/* Bloco 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif text-2xl md:text-4xl italic text-dourado font-medium max-w-3xl mx-auto leading-relaxed">
                “{CONFIG.manifesto.manifestoBloco3}”
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. DIFERENCIAIS (O COMO) */}
      <section
        id="diferenciais"
        className="relative bg-escura text-branco py-24 md:py-36 px-6 md:px-12 scroll-mt-20 z-10 overflow-hidden border-t border-branco/5"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Cabeçalho de Diferenciais */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-dourado font-bold mb-4 block"
            >
              {CONFIG.diferenciaisSeção.eyebrow}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl md:text-5xl font-light tracking-tight text-branco leading-tight"
            >
              {CONFIG.diferenciaisSeção.titulo}
            </motion.h2>
          </div>

          {/* Grade de Diferenciais (4 Colunas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-12">
            {CONFIG.diferenciais.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-branco/10 pt-6 flex flex-col group hover:border-dourado/40 transition-colors duration-500"
              >
                <span className="font-serif text-3xl md:text-4xl text-dourado font-light mb-4 block leading-none">
                  {`0${index + 1}`}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-medium text-branco mb-3 tracking-wide">
                  {item.titulo}
                </h3>
                <p className="font-sans text-xs md:text-sm text-branco/70 font-light leading-relaxed">
                  {item.descricao}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Link Discreto no Rodapé da Seção */}
          <div className="mt-20 md:mt-24 flex justify-center">
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              href="#sobre"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 text-branco/50 hover:text-dourado text-xs uppercase font-semibold tracking-[0.2em] border-b border-branco/10 hover:border-dourado/30 pb-1.5 transition-all duration-300 cursor-pointer"
            >
              <span>{CONFIG.diferenciaisSeção.linkTexto}</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </motion.a>
          </div>

        </div>
      </section>

      {/* 5. IMÓVEL EM DESTAQUE (JOIA DA CURADORIA) */}
      {(() => {
        const destaque = CONFIG.imoveis[0] || CONFIG.imovelDestaque;
        return (
          <section
            id="imovel-destaque"
            className="relative w-full h-[85vh] md:h-[90vh] flex items-end justify-start overflow-hidden bg-escura-2"
            style={{
              backgroundImage: `url(${destaque.imagemUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            {/* Dark gradient overlay to preserve readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-escura-2/95 via-escura-2/50 to-transparent z-10"></div>
            
            {/* Content container in bottom-left */}
            <div className="container mx-auto px-6 md:px-12 pb-16 md:pb-24 relative z-20 max-w-7xl w-full text-left">
              <div className="max-w-2xl space-y-6">
                
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-dourado font-bold block"
                >
                  {CONFIG.destaqueSeção.eyebrow}
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl md:text-6xl font-light text-branco tracking-tight leading-tight"
                >
                  {CONFIG.destaqueSeção.titulo}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-sm md:text-base text-branco/80 font-light leading-relaxed max-w-xl"
                >
                  {CONFIG.destaqueSeção.descricaoTemplate} {destaque.titulo}.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4"
                >
                  {/* Botão Primário */}
                  <button
                    onClick={() => setSelectedImovel(destaque)}
                    className="w-full sm:w-auto px-8 py-4 bg-acento hover:bg-acento-escuro text-branco text-xs uppercase font-semibold tracking-widest transition-all duration-300 rounded-none text-center shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    {CONFIG.destaqueSeção.botaoVerDestaque}
                  </button>

                  {/* Link Secundário */}
                  <a
                    href="#imoveis"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex items-center gap-2 text-branco/80 hover:text-branco text-xs uppercase font-semibold tracking-widest border-b border-branco/20 hover:border-branco/60 pb-1.5 transition-all duration-300 cursor-pointer"
                  >
                    <span>{CONFIG.destaqueSeção.botaoVerOutros}</span>
                    <span className="text-xs transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                  </a>
                </motion.div>

              </div>
            </div>
          </section>
        );
      })()}

      {/* 6. GRID DE IMÓVEIS (SELEÇÃO ATUAL) */}
      <section
        id="imoveis"
        className="w-full bg-fundo text-escura py-20 px-6 md:px-12 scroll-mt-24 border-t border-texto/5"
      >
        <div className="container mx-auto max-w-7xl">
          
          {/* Header da Seção */}
          <div className="text-center md:text-left mb-12 md:mb-16 max-w-3xl">
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-acento font-bold block mb-3">
              {CONFIG.colecaoSeção.eyebrow}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-escura tracking-tight leading-tight mb-4">
              {CONFIG.colecaoSeção.titulo}
            </h2>
            <p className="font-sans text-sm md:text-base text-texto-suave font-light leading-relaxed">
              {CONFIG.colecaoSeção.subtitulo}
            </p>
          </div>

          {/* Filtros */}
          {(() => {
            // Extrair opções dinamicamente a partir de CONFIG.imoveis
            const tiposUnicos = Array.from(new Set(CONFIG.imoveis.map(im => im.tipo)));
            const locaisUnicos = Array.from(new Set(CONFIG.imoveis.map(im => im.local)));
            
            // Gerar faixas de preço dinâmicas baseadas nos valores reais do estoque
            const precosNum = CONFIG.imoveis.map(im => {
              const num = parseInt(im.preco.replace(/\D/g, ''), 10);
              return isNaN(num) ? 0 : num;
            }).filter(p => p > 0);
            
            const maxPreco = precosNum.length > 0 ? Math.max(...precosNum) : 0;
            const step1 = Math.round((maxPreco * 0.4) / 1000000) * 1000000;
            const step2 = Math.round((maxPreco * 0.7) / 1000000) * 1000000;

            const formatMillions = (num: number) => {
              return `R$ ${(num / 1000000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi`;
            };

            return (
              <div className="bg-fundo-alt/40 border border-texto/5 p-6 mb-12 flex flex-col md:flex-row gap-4 md:items-end rounded-none">
                {/* Tipo Selector */}
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-texto-suave font-bold font-sans">
                    {CONFIG.filtros.tipoLabel}
                  </label>
                  <select
                    value={filterTipo}
                    onChange={(e) => setFilterTipo(e.target.value)}
                    className="w-full bg-branco text-escura border border-texto/10 p-3.5 text-xs tracking-wider rounded-none focus:outline-none focus:border-acento transition-colors cursor-pointer font-sans"
                  >
                    <option value="all">{CONFIG.filtros.tipoTodos}</option>
                    {tiposUnicos.map((tipo, idx) => (
                      <option key={idx} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                {/* Local Selector */}
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-texto-suave font-bold font-sans">
                    {CONFIG.filtros.localLabel}
                  </label>
                  <select
                    value={filterLocal}
                    onChange={(e) => setFilterLocal(e.target.value)}
                    className="w-full bg-branco text-escura border border-texto/10 p-3.5 text-xs tracking-wider rounded-none focus:outline-none focus:border-acento transition-colors cursor-pointer font-sans"
                  >
                    <option value="all">{CONFIG.filtros.localTodos}</option>
                    {locaisUnicos.map((local, idx) => (
                      <option key={idx} value={local}>{local}</option>
                    ))}
                  </select>
                </div>

                {/* Preço Selector */}
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-texto-suave font-bold font-sans">
                    {CONFIG.filtros.precoLabel}
                  </label>
                  <select
                    value={filterPreco}
                    onChange={(e) => setFilterPreco(e.target.value)}
                    className="w-full bg-branco text-escura border border-texto/10 p-3.5 text-xs tracking-wider rounded-none focus:outline-none focus:border-acento transition-colors cursor-pointer font-sans"
                  >
                    <option value="all">{CONFIG.filtros.precoQualquer}</option>
                    {step1 > 0 && <option value={step1}>Até {formatMillions(step1)}</option>}
                    {step2 > 0 && <option value={step2}>Até {formatMillions(step2)}</option>}
                    {maxPreco > 0 && <option value={maxPreco}>Até {formatMillions(maxPreco)}</option>}
                  </select>
                </div>

                {/* Limpar Filtros Button */}
                {(filterTipo !== "all" || filterLocal !== "all" || filterPreco !== "all") && (
                  <button
                    onClick={() => {
                      setFilterTipo("all");
                      setFilterLocal("all");
                      setFilterPreco("all");
                    }}
                    className="px-6 py-4 border border-acento/20 hover:border-acento text-acento text-xs font-sans uppercase tracking-widest transition-colors duration-300 rounded-none bg-transparent cursor-pointer"
                  >
                    {CONFIG.filtros.limparFiltros}
                  </button>
                )}
              </div>
            );
          })()}

          {/* Grid de Cards de Imóveis */}
          {(() => {
            const filtered = CONFIG.imoveis.filter(im => {
              const matchTipo = filterTipo === "all" || im.tipo === filterTipo;
              const matchLocal = filterLocal === "all" || im.local === filterLocal;
              
              let matchPreco = true;
              if (filterPreco !== "all") {
                const imPriceNum = parseInt(im.preco.replace(/\D/g, ''), 10) || 0;
                const limit = parseInt(filterPreco, 10);
                matchPreco = imPriceNum <= limit;
              }
              
              return matchTipo && matchLocal && matchPreco;
            });

            if (filtered.length === 0) {
              return (
                <div className="text-center py-16 border border-dashed border-texto/10">
                  <p className="font-serif text-lg text-texto-suave italic mb-4">{CONFIG.filtros.semResultados}</p>
                  <button
                    onClick={() => {
                      setFilterTipo("all");
                      setFilterLocal("all");
                      setFilterPreco("all");
                    }}
                    className="px-6 py-3 bg-acento text-branco text-xs uppercase font-sans tracking-widest hover:bg-acento-escuro transition-colors cursor-pointer"
                  >
                    {CONFIG.filtros.verTodos}
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((im, index) => {
                  return (
                    <motion.div
                      key={im.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="group bg-branco border border-texto/5 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-500"
                    >
                      {/* Image Container with overlays */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-escura">
                        <img
                          src={im.imagemPrincipal}
                          alt={im.titulo}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-escura-2/50 to-transparent"></div>
                        
                        {/* Dynamic Label/Tag */}
                        {im.tag && (
                          <span className="absolute top-4 left-4 px-2.5 py-1 bg-acento text-branco text-[9px] font-sans font-bold uppercase tracking-widest">
                            {im.tag}
                          </span>
                        )}

                        {/* Price Overlay */}
                        <div className="absolute bottom-4 left-4 bg-escura-2/80 backdrop-blur-sm border border-branco/10 px-3 py-1.5 text-branco font-serif text-sm tracking-wide">
                          {im.preco}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          {/* Location */}
                          <div className="flex items-center gap-1.5 text-texto-suave text-xs font-sans tracking-wide">
                            <svg className="w-3.5 h-3.5 text-acento" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <span>{im.local}</span>
                          </div>

                          {/* Title */}
                          <h3 className="font-serif text-xl font-light text-escura leading-tight group-hover:text-acento transition-colors duration-300">
                            {im.titulo}
                          </h3>

                          {/* Clima Phrase (Earthy/Poetic tone) */}
                          <p className="font-serif text-xs text-acento/90 italic font-medium tracking-wide">
                            "{im.fraseClima}"
                          </p>

                          {/* Description snippet */}
                          <p className="font-sans text-xs text-texto-suave line-clamp-2 leading-relaxed font-light">
                            {im.descricao}
                          </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-texto/5">
                          {/* Dynamic Specs with simple SVGs */}
                          <div className="grid grid-cols-3 gap-2 text-center text-texto font-sans text-xs">
                            {/* Quartos */}
                            <div className="flex flex-col items-center gap-1 bg-fundo-alt/20 py-2">
                              {/* Inline SVG for Bed */}
                              <svg className="w-4 h-4 text-acento/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12V18a2 2 0 002 2h10a2 2 0 002-2v-6" />
                              </svg>
                              <span className="text-[10px] font-medium">{im.quartos} qtos</span>
                            </div>

                            {/* Banheiros */}
                            <div className="flex flex-col items-center gap-1 bg-fundo-alt/20 py-2">
                              {/* Inline SVG for Bath */}
                              <svg className="w-4 h-4 text-acento/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545" />
                              </svg>
                              <span className="text-[10px] font-medium">{im.banheiros} banhs</span>
                            </div>

                            {/* Area */}
                            <div className="flex flex-col items-center gap-1 bg-fundo-alt/20 py-2">
                              {/* Inline SVG for Maximize */}
                              <svg className="w-4 h-4 text-acento/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                              </svg>
                              <span className="text-[10px] font-medium">{im.area} m²</span>
                            </div>
                          </div>

                          {/* Button "Ver detalhes" */}
                          <button
                            onClick={() => {
                              setSelectedImovel(im);
                              setActiveImageIndex(0);
                            }}
                            className="w-full py-3 border border-acento text-acento hover:bg-acento hover:text-branco text-xs uppercase font-semibold tracking-widest transition-all duration-300 rounded-none text-center cursor-pointer bg-transparent"
                          >
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })()}

          {/* CTA para Contato */}
          <div className="flex flex-col items-center justify-center mt-16 pt-8 border-t border-texto/5">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                const contatoEl = document.getElementById("contato");
                if (contatoEl) {
                  contatoEl.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-acento hover:bg-acento-escuro text-branco text-xs uppercase font-semibold tracking-widest transition-all duration-300 rounded-none text-center shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{CONFIG.colecaoSeção.botaoVerMais}</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* 7. SOBRE (QUEM SOMOS & CREDIBILIDADE) */}
      <section
        id="sobre"
        className="w-full bg-fundo-alt text-escura py-20 px-6 md:px-12 scroll-mt-24 border-t border-texto/5"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Coluna Esquerda - Imagem com Selo */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[4/5] overflow-hidden bg-escura shadow-xl">
                <img
                  src={CONFIG.sobre.imagemUrl}
                  alt={CONFIG.sobre.nomeGestor}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-escura/40 via-transparent to-transparent"></div>
              </div>

              {/* Selo Circular Sobreposto */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                className="absolute -bottom-6 -right-6 md:-right-8 w-44 h-44 bg-escura text-branco rounded-full flex flex-col items-center justify-center p-6 text-center shadow-2xl border border-dourado/40 z-20"
              >
                <span className="font-serif text-4xl font-light text-dourado tracking-tight mb-1">
                  {CONFIG.estatisticas.find(e => e.legenda.includes("anos"))?.valor || "12"}
                </span>
                <span className="font-sans text-[10px] leading-tight uppercase tracking-wider text-branco/80">
                  {CONFIG.sobre.badgeTextoAnos}
                </span>
              </motion.div>
            </div>

            {/* Coluna Direita - Conteúdo Textual */}
            <div className="lg:col-span-7 space-y-8 lg:pl-6">
              <div className="space-y-4">
                <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-acento font-bold block">
                  {CONFIG.sobre.eyebrow}
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-escura tracking-tight leading-tight">
                  {CONFIG.sobre.titulo}
                </h2>
              </div>

              <div className="space-y-5 font-sans text-sm md:text-base text-texto-suave font-light leading-relaxed">
                {CONFIG.sobre.textoParagrafos.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Informações da Fundadora / Corretora */}
              <div className="border-t border-texto/10 pt-6 flex items-center gap-4">
                <div className="space-y-0.5">
                  <span className="font-serif text-lg font-light text-escura block">{CONFIG.sobre.nomeGestor}</span>
                  <span className="font-sans text-xs text-acento uppercase tracking-wider">{CONFIG.sobre.cargoGestor}</span>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-texto/10">
                {CONFIG.estatisticas.map((stat, idx) => (
                  <div key={idx} className="space-y-1 text-left">
                    <span className="font-serif text-3xl md:text-4xl font-light text-acento tracking-tight block">
                      {stat.valor}
                    </span>
                    <span className="font-sans text-[10px] md:text-xs text-texto-suave uppercase tracking-wider block leading-tight">
                      {stat.legenda}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. DEPOIMENTOS (HISTÓRIAS QUE COMEÇARAM AQUI) */}
      <section
        id="depoimentos"
        className="w-full bg-escura text-branco py-24 px-6 md:px-12 scroll-mt-24 border-t border-texto/5"
      >
        <div className="container mx-auto max-w-5xl text-center">
          
          {/* Header da Seção */}
          <div className="max-w-xl mx-auto mb-16">
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-dourado font-bold block mb-3">
              {CONFIG.depoimentosSeção.eyebrow}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-branco tracking-tight leading-tight">
              {CONFIG.depoimentosSeção.titulo}
            </h2>
          </div>

          {/* Carrossel de Depoimentos */}
          {CONFIG.depoimentos && CONFIG.depoimentos.length > 0 && (
            <div className="space-y-10">
              {/* Slide ativo com transição suave */}
              <div className="relative min-h-[220px] md:min-h-[180px] flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDepoimento}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <p className="font-serif italic text-lg md:text-2xl lg:text-3xl text-branco/90 max-w-3xl mx-auto leading-relaxed">
                      "{CONFIG.depoimentos[currentDepoimento].texto}"
                    </p>
                    
                    <div className="space-y-1">
                      <span className="text-dourado font-sans text-sm md:text-base font-semibold tracking-widest uppercase block">
                        {CONFIG.depoimentos[currentDepoimento].nome}
                      </span>
                      <span className="text-branco/50 font-sans text-xs block">
                        {CONFIG.depoimentos[currentDepoimento].cargo}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Indicadores (Bolinhas) de Navegação */}
              <div className="flex items-center justify-center gap-3 pt-4">
                {CONFIG.depoimentos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentDepoimento(idx)}
                    className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                      currentDepoimento === idx ? "w-8 bg-dourado" : "w-2 bg-branco/20 hover:bg-branco/40"
                    }`}
                    aria-label={`Ir para depoimento ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 9. CTA FINAL (VAMOS CONVERSAR) */}
      <section
        id="contato"
        className="relative w-full py-28 px-6 md:px-12 scroll-mt-24 bg-escura overflow-hidden"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Ambiente Residencial Acolhedor"
            className="w-full h-full object-cover opacity-20 grayscale-[20%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-escura/95 via-escura/80 to-escura-2"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center space-y-12">
          
          {/* Header */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-dourado font-bold block">
              {CONFIG.ctaFinal.eyebrow}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-branco tracking-tight leading-tight">
              {CONFIG.ctaFinal.titulo}
            </h2>
            <p className="font-sans text-sm md:text-base text-branco/70 font-light leading-relaxed">
              {CONFIG.ctaFinal.subtitulo}
            </p>
          </div>

          {/* WhatsApp Button */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <a
              href={`https://wa.me/${CONFIG.infoGerais.whatsapp}?text=${encodeURIComponent(CONFIG.infoGerais.mensagemWhatsappPadrao)}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-branco font-sans text-xs uppercase font-bold tracking-widest transition-all duration-300 rounded-none shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{CONFIG.ctaFinal.botaoText}</span>
            </a>
            <span className="text-[10px] uppercase tracking-wider text-branco/40 font-sans">
              {CONFIG.ctaFinal.disclaimer}
            </span>
          </div>

          {/* Divider line */}
          <div className="flex items-center justify-center gap-4 text-branco/20">
            <div className="w-16 h-[1px] bg-branco/10"></div>
            <span className="font-serif italic text-xs">{CONFIG.ctaFinal.divisorText}</span>
            <div className="w-16 h-[1px] bg-branco/10"></div>
          </div>

          {/* Mini-Formulário Alternativo */}
          <div className="w-full max-w-lg mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="bg-branco/5 backdrop-blur-sm border border-branco/10 p-6 md:p-8 space-y-4 text-left relative overflow-hidden"
            >
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dourado/10 text-dourado mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-serif text-sm text-branco">
                    {CONFIG.ctaFinal.formulario.mensagemSucesso}
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-branco/50 font-bold font-sans">
                        {CONFIG.ctaFinal.formulario.nomeLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={CONFIG.ctaFinal.formulario.nomePlaceholder}
                        className="w-full bg-branco/10 text-branco border border-branco/10 p-3 text-xs tracking-wider rounded-none focus:outline-none focus:border-dourado transition-colors font-sans placeholder-branco/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-branco/50 font-bold font-sans">
                        {CONFIG.ctaFinal.formulario.whatsappLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={CONFIG.ctaFinal.formulario.whatsappPlaceholder}
                        className="w-full bg-branco/10 text-branco border border-branco/10 p-3 text-xs tracking-wider rounded-none focus:outline-none focus:border-dourado transition-colors font-sans placeholder-branco/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-branco/50 font-bold font-sans">
                      {CONFIG.ctaFinal.formulario.procuraLabel}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={CONFIG.ctaFinal.formulario.procuraPlaceholder}
                      className="w-full bg-branco/10 text-branco border border-branco/10 p-3 text-xs tracking-wider rounded-none focus:outline-none focus:border-dourado transition-colors font-sans placeholder-branco/30 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-branco text-escura hover:bg-dourado hover:text-branco text-xs uppercase font-bold tracking-widest transition-all duration-300 rounded-none cursor-pointer font-sans"
                  >
                    {CONFIG.ctaFinal.formulario.botaoEnviar}
                  </button>
                </>
              )}
            </form>
          </div>

        </div>
      </section>

      {/* 10. RODAPÉ COMPLETO */}
      <footer className="w-full bg-escura-2 text-branco/80 pt-16 pb-8 px-6 md:px-12 border-t border-branco/5">
        <div className="container mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            
            {/* Coluna 1: Logo e Descrição */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <span className="font-serif text-2xl font-light text-branco tracking-widest block">
                  {CONFIG.infoGerais.logoText}
                </span>
                <span className="font-sans text-[9px] text-dourado uppercase tracking-[0.3em] font-semibold block">
                  {CONFIG.infoGerais.subtituloLogo}
                </span>
              </div>
              
              <p className="font-sans text-xs text-branco/60 leading-relaxed font-light max-w-sm">
                {CONFIG.rodapeDescricao}
              </p>

              {/* Redes Sociais */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-branco/5 hover:bg-dourado text-branco/70 hover:text-branco transition-all duration-300 rounded-none"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-branco/5 hover:bg-dourado text-branco/70 hover:text-branco transition-all duration-300 rounded-none"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href={`https://wa.me/${CONFIG.infoGerais.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-branco/5 hover:bg-dourado text-branco/70 hover:text-branco transition-all duration-300 rounded-none"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-sm text-branco font-medium tracking-wide">Navegação</h4>
              <ul className="space-y-2.5 font-sans text-xs text-branco/60 font-light">
                <li>
                  <a href="#imoveis" className="hover:text-dourado transition-colors">Imóveis</a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-dourado transition-colors">Sobre Nós</a>
                </li>
                <li>
                  <a href="#depoimentos" className="hover:text-dourado transition-colors">Depoimentos</a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-dourado transition-colors">Contato</a>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Categorias */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-sm text-branco font-medium tracking-wide">Categorias</h4>
              <ul className="space-y-2.5 font-sans text-xs text-branco/60 font-light font-sans">
                <li>
                  <button onClick={() => {
                    setFilterTipo("Apartamento");
                    const el = document.getElementById("imoveis");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-dourado transition-colors text-left bg-transparent cursor-pointer font-sans text-xs font-light">Apartamentos</button>
                </li>
                <li>
                  <button onClick={() => {
                    setFilterTipo("Casa");
                    const el = document.getElementById("imoveis");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-dourado transition-colors text-left bg-transparent cursor-pointer font-sans text-xs font-light">Casas</button>
                </li>
                <li>
                  <button onClick={() => {
                    setFilterTipo("Cobertura");
                    const el = document.getElementById("imoveis");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-dourado transition-colors text-left bg-transparent cursor-pointer font-sans text-xs font-light">Coberturas</button>
                </li>
                <li>
                  <button onClick={() => {
                    setFilterTipo("all");
                    const el = document.getElementById("imoveis");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-dourado transition-colors text-left bg-transparent cursor-pointer font-sans text-xs font-light">Ver Todos</button>
                </li>
              </ul>
            </div>

            {/* Coluna 4: Contato */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-serif text-sm text-branco font-medium tracking-wide">Contato</h4>
              <ul className="space-y-3 font-sans text-xs text-branco/60 font-light">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-dourado flex-shrink-0 mt-0.5" />
                  <span>{CONFIG.infoGerais.endereco}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-dourado flex-shrink-0" />
                  <span>{CONFIG.infoGerais.telefone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-dourado flex-shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>{CONFIG.infoGerais.email}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Linha Divisora */}
          <div className="w-full h-[1px] bg-branco/10 mb-8"></div>

          {/* Linha Final */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-[10px] text-branco/40 uppercase tracking-wider">
            <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <span>{CONFIG.rodape.textoCredito}</span>
              <span className="hidden sm:inline text-branco/20">|</span>
              <span>{CONFIG.infoGerais.creci}</span>
            </div>
            <div className="text-right text-branco/30 font-light lowercase">
              {CONFIG.infoGerais.desenvolvidoPor}
            </div>
          </div>

        </div>
      </footer>

      {/* ÁREA PRINCIPAL COM PREVIEW INSTRUCIONAL / BOAS-VINDAS */}
      {false && (<>
      <main className="flex-grow pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto w-full flex flex-col justify-center">
        
        {/* CABEÇALHO DO ESTÚDIO DE CRIAÇÃO (DIRETRIZES EDITORIAIS) */}
        <div id="curadoria" className="text-left mt-6 mb-12 scroll-mt-24">
          {/* Linha Divisora (do tema de design) */}
          <div className="w-[60px] h-[1px] bg-dourado mb-6"></div>
          
          {/* Label Elegante (do tema de design) */}
          <span className="text-[11px] uppercase tracking-[0.3em] text-acento font-bold mb-6 block">
            Curadoria Imobiliária Exclusiva
          </span>
          
          <h1 className="font-serif text-4xl md:text-7xl font-light text-escura leading-[1.1] tracking-tight mb-8">
            Onde a vida <span className="font-medium italic text-acento">ganha poesia</span>.
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-texto-suave max-w-3xl leading-relaxed font-light">
            Sua história merece um cenário à altura. Desenvolvemos o projeto editorial da <strong className="font-medium text-escura">{CONFIG.infoGerais.nome}</strong> baseado no <strong>Círculo Dourado</strong> de Simon Sinek. Todo o conteúdo é alimentado dinamicamente pelo objeto <code className="bg-fundo-alt px-1.5 py-0.5 rounded font-mono text-sm text-acento font-semibold">CONFIG</code>.
          </p>
        </div>

        {/* PAINEL DE CONTROLE / INFORMAÇÕES DO ATUAL CONFIG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          
          {/* Card 1: Identidade e Customização */}
          <div className="bg-fundo-alt/60 border border-texto/5 p-8 relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-acento/5 rounded-full -mr-8 -mt-8"></div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-escura/5 text-escura rounded-none mt-1">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-medium text-escura">Identidade Ativa</h3>
                <p className="text-sm text-texto-suave leading-relaxed">
                  As informações do header e a paleta de cores foram extraídas diretamente do <code className="text-xs bg-fundo/80 p-1 font-mono">CONFIG</code>. 
                  Experimente mudar as variáveis de cores para ver o site se transformar instantaneamente!
                </p>
                <div className="pt-3 space-y-1.5">
                  <div className="text-xs font-mono text-texto-suave flex justify-between border-b border-texto/10 pb-1">
                    <span>Nome da Imobiliária:</span>
                    <span className="font-bold text-escura">{CONFIG.infoGerais.nome}</span>
                  </div>
                  <div className="text-xs font-mono text-texto-suave flex justify-between border-b border-texto/10 pb-1">
                    <span>WhatsApp Cadastrado:</span>
                    <span className="font-bold text-escura">{CONFIG.infoGerais.whatsappFormatado}</span>
                  </div>
                  <div className="text-xs font-mono text-texto-suave flex justify-between">
                    <span>Email Comercial:</span>
                    <span className="font-bold text-escura">{CONFIG.infoGerais.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Visualizador da Paleta de Cores Ativa */}
          <div className="bg-fundo-alt/60 border border-texto/5 p-8 relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-acento/5 text-acento rounded-none mt-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-3 w-full">
                <h3 className="font-serif text-xl font-medium text-escura">Paleta de Cores Dinâmica</h3>
                <p className="text-sm text-texto-suave leading-relaxed">
                  Cores aplicadas dinamicamente via variáveis CSS injetadas no elemento <code className="text-xs bg-fundo/80 p-1 font-mono">html</code>.
                </p>
                
                {/* Grade de Amostras de Cores */}
                <div className="grid grid-cols-5 gap-2 pt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square border border-texto/10" style={{ backgroundColor: CONFIG.cores.corFundo }}></div>
                    <span className="text-[9px] font-mono mt-1 text-texto-suave">Fundo</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square border border-texto/10" style={{ backgroundColor: CONFIG.cores.corEscura }}></div>
                    <span className="text-[9px] font-mono mt-1 text-texto-suave">Escura</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square border border-texto/10" style={{ backgroundColor: CONFIG.cores.corAcento }}></div>
                    <span className="text-[9px] font-mono mt-1 text-texto-suave">Acento</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square border border-texto/10" style={{ backgroundColor: CONFIG.cores.corDourado }}></div>
                    <span className="text-[9px] font-mono mt-1 text-texto-suave">Dourado</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square border border-texto/10" style={{ backgroundColor: CONFIG.cores.corBranco }}></div>
                    <span className="text-[9px] font-mono mt-1 text-texto-suave">Branco</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* MAPA DAS PRÓXIMAS ETAPAS (CRONOGRAMA DO PROJETO) */}
        <div id="cronograma" className="mt-16 space-y-6 scroll-mt-24">
          <h3 className="font-serif text-2xl font-light text-escura text-center md:text-left">
            Mapa de Expansão (O Círculo Dourado)
          </h3>
          
          <div className="relative border-l border-texto/10 pl-6 ml-4 space-y-8">
            
            {/* Seção 1: Header (Pronta) */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-acento border-2 border-fundo rounded-full"></div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-acento/10 text-acento-escuro px-2 py-0.5 font-bold">Ativa</span>
                  <h4 className="font-serif text-lg font-medium text-escura">1. Header Fixo & Identidade Visual</h4>
                </div>
                <p className="text-sm text-texto-suave leading-relaxed">
                  Estrutura base com logo, menu adaptativo e comportamento de fade/blur ao rolar a página. Experimente fazer scroll!
                </p>
              </div>
            </div>

            {/* Seções 2 a 4: O Porquê */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-texto-suave/30 border-2 border-fundo rounded-full"></div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-texto-suave/10 text-texto-suave px-2 py-0.5">A Seguir</span>
                  <h4 className="font-serif text-lg font-medium text-escura">2. O PORQUÊ (Hero Emocional & Manifesto)</h4>
                </div>
                <p className="text-sm text-texto-suave leading-relaxed">
                  Introdução com vídeo imersivo ou imagem dramática e o Manifesto de Crença, construindo a conexão humana antes do produto.
                </p>
              </div>
            </div>

            {/* Seções 5 a 6: O Como */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-texto-suave/30 border-2 border-fundo rounded-full"></div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-texto-suave/10 text-texto-suave px-2 py-0.5">Planejado</span>
                  <h4 className="font-serif text-lg font-medium text-escura">3. O COMO (Diferenciais & Imóvel Secreto)</h4>
                </div>
                <p className="text-sm text-texto-suave leading-relaxed">
                  Diferenciais exclusivos de curadoria e a apresentação conceitual de uma joia arquitetônica em destaque.
                </p>
              </div>
            </div>

            {/* Seções 7 a 10: O Quê */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-texto-suave/30 border-2 border-fundo rounded-full"></div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-texto-suave/10 text-texto-suave px-2 py-0.5">Planejado</span>
                  <h4 className="font-serif text-lg font-medium text-escura">4. O QUÊ (Grid Filtrável, Depoimentos & Rodapé)</h4>
                </div>
                <p className="text-sm text-texto-suave leading-relaxed">
                  Catálogo completo de imóveis elegantes com filtros de categoria, depoimentos reais e chamada para ação integrada.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* BOTÃO PARA TESTAR SCROLL */}
        <div className="flex justify-center mt-12">
          <a
            href="#cronograma"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}
            className="text-xs uppercase font-semibold text-acento hover:text-acento-escuro tracking-widest flex items-center gap-1 transition-colors duration-300"
          >
            Ver Detalhes do Escopo <ChevronRight className="w-4 h-4 rotate-90" />
          </a>
        </div>

      </main>

      {/* SUPORTE DO WORKSPACE */}
      <footer className="border-t border-texto/5 py-6 bg-fundo-alt/20 text-center text-[10px] text-texto-suave font-sans uppercase tracking-wider">
        Espaço de Criação e Diretrizes Editoriais — Aura Imóveis d'Alma
      </footer>
      </>)}

      {/* DETALHES DO IMÓVEL (MODAL EXCLUSIVO COM GALERIA) */}
      <AnimatePresence>
        {selectedImovel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-escura-2/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedImovel(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
              className="relative w-full max-w-5xl bg-fundo text-escura shadow-2xl rounded-none overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImovel(null)}
                className="absolute top-4 right-4 z-50 p-2.5 bg-fundo/90 hover:bg-escura hover:text-branco text-escura transition-all duration-300 rounded-none cursor-pointer border border-texto/5 shadow-md"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Visual Cover Column with Gallery */}
                <div className="p-6 md:p-8 bg-escura flex flex-col justify-center">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-escura-2">
                    <img
                      src={
                        selectedImovel.galeria && selectedImovel.galeria[activeImageIndex]
                          ? selectedImovel.galeria[activeImageIndex]
                          : (selectedImovel.imagemPrincipal || selectedImovel.imagemUrl)
                      }
                      alt={selectedImovel.titulo}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-escura/40 via-transparent to-transparent"></div>
                    
                    {/* Category/Tag Label */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-acento text-branco text-[10px] font-sans font-bold uppercase tracking-widest">
                      {selectedImovel.tag || selectedImovel.categoria || selectedImovel.tipo}
                    </span>
                  </div>

                  {/* Thumbnails list if we have a gallery */}
                  {selectedImovel.galeria && selectedImovel.galeria.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
                      {selectedImovel.galeria.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-20 h-14 flex-shrink-0 overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                            activeImageIndex === idx ? "border-acento scale-95" : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info Column */}
                <div className="p-8 md:p-12 flex flex-col justify-between space-y-8 bg-fundo max-h-[85vh] overflow-y-auto">
                  <div className="space-y-6">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-texto-suave text-xs font-sans tracking-wider">
                      <MapPin className="w-4 h-4 text-acento" />
                      <span>{selectedImovel.local || selectedImovel.localizacao}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-3xl md:text-4xl font-light text-escura tracking-tight leading-tight">
                      {selectedImovel.titulo}
                    </h3>

                    {/* Clima phrase for extra emotion */}
                    {selectedImovel.fraseClima && (
                      <p className="font-serif text-sm text-acento italic font-medium">
                        "{selectedImovel.fraseClima}"
                      </p>
                    )}

                    {/* Description */}
                    <p className="font-sans text-sm text-texto-suave leading-relaxed font-light">
                      {selectedImovel.descricao}
                    </p>

                    {/* Metrics/Specifications Grid */}
                    <div className="grid grid-cols-3 gap-4 border-y border-texto/5 py-5 text-center font-sans">
                      <div className="flex flex-col items-center gap-1.5">
                        <Bed className="w-4 h-4 text-acento" />
                        <span className="text-xs font-medium text-escura">{selectedImovel.quartos} {CONFIG.detalhesModal.quartosLabel}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <Bath className="w-4 h-4 text-acento" />
                        <span className="text-xs font-medium text-escura">{selectedImovel.banheiros} {CONFIG.detalhesModal.banheirosLabel}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <Maximize className="w-4 h-4 text-acento" />
                        <span className="text-xs font-medium text-escura">{selectedImovel.area} {CONFIG.detalhesModal.areaLabel}</span>
                      </div>
                    </div>

                    {/* Features/Characteristics */}
                    {(selectedImovel.caracteristicas || (selectedImovel.tipo && [selectedImovel.tipo])) && (
                      <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-acento font-bold">{CONFIG.detalhesModal.diferenciaisTitulo}</h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedImovel.caracteristicas || ["Design Exclusivo", "Localização Premium"]).map((char: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-fundo-alt text-texto text-xs font-sans font-light rounded-none border border-texto/5"
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions & Price */}
                  <div className="border-t border-texto/5 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-sans uppercase tracking-widest text-texto-suave">{CONFIG.detalhesModal.precoLabel}</span>
                      <span className="font-serif text-2xl text-acento font-semibold lowercase tracking-wide">{selectedImovel.preco}</span>
                    </div>

                    <a
                      href={`https://wa.me/${CONFIG.infoGerais.whatsapp}?text=${encodeURIComponent(
                        `Olá! Gostaria de receber mais informações e agendar um atendimento exclusivo para o imóvel: "${selectedImovel.titulo}" localizado em ${selectedImovel.local || selectedImovel.localizacao}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-4 bg-acento hover:bg-acento-escuro text-branco text-xs uppercase font-semibold tracking-widest transition-all duration-300 rounded-none text-center shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{CONFIG.detalhesModal.botaoWhatsapp}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÃO FLUTUANTE DE WHATSAPP */}
      <a
        href={`https://wa.me/${CONFIG.infoGerais.whatsapp}?text=${encodeURIComponent(CONFIG.infoGerais.mensagemWhatsappPadrao)}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[99] w-14 h-14 bg-[#25D366] text-branco rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group cursor-pointer"
        aria-label="Fale Conosco"
      >
        {/* Pulsing rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping z-0"></span>
        <span className="absolute inset-1 rounded-full bg-[#25D366]/20 animate-pulse z-0"></span>
        
        {/* Inline SVG of WhatsApp */}
        <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
