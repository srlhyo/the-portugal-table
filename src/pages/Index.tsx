import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import logo from "@/assets/logo.png";
import MagneticButton from "@/components/MagneticButton";
import PalcoDaMesa from "@/components/reforma/PalcoDaMesa";
import GaleriaVida from "@/components/reforma/GaleriaVida";
import CartaDaCasa from "@/components/reforma/CartaDaCasa";
import GatilhoDaCarta from "@/components/reforma/GatilhoDaCarta";
import ConhecerACasa from "@/components/reforma/ConhecerACasa";
import { INSTAGRAM_URL, hrefGuia, hrefOrcamento, useAlvoExterno } from "@/components/reforma/orcamento";
import { useEmVista } from "@/hooks/use-em-vista";

// ============================================================
// Index — a página "em renovação" do Do Luxo à Mesa.
//
// Uma só história, contada a duas colunas no computador e numa
// só no telemóvel (onde está a maior parte dos clientes):
//
//   1. O título: "Estamos a pôr a mesa." — palavra a palavra.
//   2. O palco: um arco verde com uma campânula dourada em 3D.
//      Levantá-la revela os eventos reais da Nádia — fotos e
//      vídeos — no lugar dela.
//   3. As duas ações: pedir orçamento (a venda) e fazer a
//      jornada (o guia interativo — a história da casa).
//   4. Abaixo da dobra: a carta com preços, os vídeos, o
//      desfile de fotos e o convite final.
//
// No telemóvel há uma barra fixa em baixo com o orçamento e a
// jornada — aparece quando os botões do topo saem do ecrã e
// nunca tapa o palco. Ninguém tem de voltar ao topo para agir.
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1] as const;

/** Palavra a palavra, a subir de trás de uma máscara — como quem levanta um pano. */
function TituloRevelado({ reduzido }: { reduzido: boolean }) {
  const palavras: { texto: string; enfase?: boolean }[] = [
    { texto: "Estamos" },
    { texto: "a" },
    { texto: "pôr" },
    { texto: "a mesa.", enfase: true },
  ];
  return (
    <h1 className="font-display text-[3.4rem] leading-[0.98] tracking-[-0.01em] text-[#1A1A1A] sm:text-7xl md:text-[5.2rem] lg:text-[6rem] xl:text-[6.6rem]">
      {palavras.map((p, i) => (
        <span key={p.texto} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
          <motion.span
            className={`inline-block ${p.enfase ? "italic text-[#8C6526]" : ""}`}
            initial={reduzido ? false : { y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.35 + i * 0.11, ease: EASE_LUXO }}
          >
            {p.texto}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** Um halo dourado que segue o rato — só onde há rato. */
function HaloDoCursor() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const mover = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setAtivo(true);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, [x, y]);

  if (!ativo) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, rgba(232,197,106,0.16) 0%, rgba(232,197,106,0.05) 35%, rgba(232,197,106,0) 70%)",
      }}
    />
  );
}

const Index = () => {
  const reduzido = useReducedMotion() ?? false;
  const alvo = useAlvoExterno();
  const [cartaAberta, setCartaAberta] = useState(false);
  const [jaViuCarta, setJaViuCarta] = useState(false);
  const [escolhido, setEscolhido] = useState<string | null>(null);
  const [rodapeRef, rodapeEmVista] = useEmVista<HTMLElement>("0px", 0.3);
  // A barra fixa só entra depois de os botões do topo terem
  // passado para cima do ecrã — nunca por cima do palco
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaRefDesktop = useRef<HTMLDivElement>(null);
  const [ctaPassou, setCtaPassou] = useState(false);
  useEffect(() => {
    let pedido = 0;
    const medir = () => {
      pedido = 0;
      // No computador a barra não existe (lg:hidden); medimos o
      // bloco do telemóvel, que é o que está visível abaixo de lg
      const el = ctaRef.current ?? ctaRefDesktop.current;
      if (!el) return;
      setCtaPassou(el.getBoundingClientRect().bottom < 0);
    };
    const aoScroll = () => {
      if (!pedido) pedido = window.requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", aoScroll, { passive: true });
    window.addEventListener("resize", aoScroll);
    return () => {
      window.removeEventListener("scroll", aoScroll);
      window.removeEventListener("resize", aoScroll);
      if (pedido) window.cancelAnimationFrame(pedido);
    };
  }, []);

  const abrirCarta = useCallback(() => setCartaAberta(true), []);
  const fecharCarta = useCallback(() => {
    setCartaAberta(false);
    setJaViuCarta(true);
  }, []);

  const hrefOrc = hrefOrcamento({ pacote: escolhido, origem: "hero" });
  const hrefJornada = hrefGuia({ origem: "hero" });
  // …e sai quando o rodapé (que tem os seus próprios) entra
  const barraVisivel = ctaPassou && !rodapeEmVista && !cartaAberta;

  return (
    <div className="pagina-luxo relative min-h-[100dvh] w-full overflow-x-hidden bg-[#FBF8F1] text-[#1A1A1A]">
      {/* Luz de sala: um véu quente que desce do teto sobre o marfim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[120vh]"
        style={{
          background:
            "radial-gradient(110% 70% at 50% -10%, rgba(255,246,222,0.95) 0%, rgba(251,248,241,0.35) 45%, rgba(251,248,241,0) 75%)",
        }}
      />
      <div aria-hidden="true" className="grao pointer-events-none fixed inset-0 z-0 opacity-[0.045]" />
      <HaloDoCursor />

      {/* Cabeçalho */}
      <header className="relative z-20 mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 pt-4 sm:px-8 sm:pt-5 lg:px-12">
        <motion.a
          href="/"
          aria-label="Do Luxo à Mesa — início"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_LUXO }}
          className="block"
        >
          <img
            src={logo}
            alt="Do Luxo à Mesa"
            width={666}
            height={375}
            className="h-14 w-auto sm:h-16"
            style={{ filter: "drop-shadow(0 2px 10px rgba(201,168,76,0.25))" }}
          />
        </motion.a>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="hidden font-display text-lg italic text-[#4B4B4B] md:block lg:text-xl"
        >
          A arte de receber.
        </motion.p>
        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="group inline-flex min-h-[44px] items-center gap-2 font-body text-[13px] tracking-[0.02em] text-[#1A1A1A] transition-colors hover:text-[#8C6526]"
        >
          Instagram
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </header>
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASE_LUXO }}
        className="relative z-10 mx-auto mt-3 h-px w-[calc(100%-2.5rem)] max-w-[1400px] origin-left bg-[#EADCC0] sm:mt-4 sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]"
      />

      {/* O hero: título, palco, ações */}
      <main className="relative z-10">
        <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-x-12 gap-y-8 px-5 pb-16 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-12 lg:items-center lg:gap-y-0 lg:px-12 lg:pb-24 lg:pt-10 xl:gap-x-20">
          {/* Título */}
          <div className="lg:col-span-6 lg:row-span-2 lg:self-center">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_LUXO }}
              className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.28em] text-[#6B7280] sm:text-[11px]"
            >
              <span aria-hidden="true" className="h-px w-8 bg-[#C9A84C]" />
              Um novo capítulo, em breve
            </motion.p>

            <div className="mt-6 sm:mt-8">
              <TituloRevelado reduzido={reduzido} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: EASE_LUXO }}
              className="mt-6 max-w-md font-display text-2xl leading-snug text-[#1A1A1A] sm:text-3xl lg:mt-8"
            >
              Há coisas que merecem ser preparadas com tempo.
            </motion.p>

            {/* No computador, o parágrafo e os botões seguem-se ao título */}
            <div className="hidden lg:block">
              <Paragrafo delay={1.1} />
              <div ref={ctaRefDesktop}>
                <Acoes hrefOrc={hrefOrc} hrefJornada={hrefJornada} alvo={alvo} delay={1.25} />
              </div>
            </div>
          </div>

          {/* O palco */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE_LUXO }}
            className="w-full lg:col-span-6 lg:row-span-2"
          >
            <div className="mx-auto w-full max-w-[560px] lg:max-w-[500px] xl:max-w-[540px]">
              <PalcoDaMesa />
            </div>
          </motion.div>

          {/* No telemóvel, os botões vêm logo a seguir ao palco */}
          <div className="lg:hidden">
            <div ref={ctaRef}>
              <Acoes hrefOrc={hrefOrc} hrefJornada={hrefJornada} alvo={alvo} delay={0.9} compacto />
            </div>
            <Paragrafo delay={1.05} />
          </div>
        </section>

        {/* A carta e a casa — as duas portas opcionais */}
        <section aria-label="A carta da casa e quem somos" className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center gap-2 border-y border-[#EADCC0] py-5 sm:flex-row sm:gap-8 sm:py-6">
            <GatilhoDaCarta visivel aoAbrir={abrirCarta} jaViu={jaViuCarta} escolhido={escolhido} reduzido={reduzido} />
            <span aria-hidden="true" className="hidden h-8 w-px bg-[#EADCC0] sm:block" />
            <ConhecerACasa visivel reduzido={reduzido} />
          </div>
        </section>

        {/* Os eventos reais */}
        <div className="pt-20 sm:pt-28">
          <GaleriaVida />
        </div>

        {/* O convite final */}
        <section className="mt-24 sm:mt-32">
          <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden bg-[#1E3A2F] px-6 py-16 text-center sm:px-12 sm:py-24 lg:mx-12 lg:w-auto lg:max-w-none xl:mx-auto xl:max-w-[1304px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 90% at 50% 0%, rgba(70,110,88,0.6) 0%, rgba(30,58,47,0) 70%), radial-gradient(120% 80% at 50% 120%, rgba(10,22,17,0.9) 0%, rgba(30,58,47,0) 60%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE_LUXO }}
              className="relative"
            >
              <p className="font-body text-[10px] uppercase tracking-[0.28em] text-[#E8CF8A] sm:text-[11px]">
                Enquanto pomos a mesa
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-[1.02] text-[#FFF8E8] sm:text-5xl md:text-6xl">
                A sua próxima celebração <em className="text-[#E8CF8A]">pode começar aqui.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-md font-body text-[13px] leading-relaxed text-[#CFE0D6] sm:text-sm">
                Conte-nos o que está a imaginar. Nós tratamos do resto — com o mesmo cuidado que dedicamos a cada detalhe.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <MagneticButton
                  href={hrefOrcamento({ pacote: escolhido, origem: "convite-final" })}
                  target={alvo.target}
                  rel={alvo.rel}
                  className="group inline-flex min-h-[52px] w-full max-w-xs items-center justify-center gap-3 bg-[#E4C06A] px-8 py-3.5 font-body text-[13px] font-medium tracking-[0.04em] text-[#161210] shadow-[0_10px_30px_-10px_rgba(228,192,106,0.6)] transition-colors duration-300 hover:bg-[#F0D07E] sm:w-auto"
                >
                  Pedir orçamento
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
                <a
                  href={hrefGuia({ origem: "convite-final" })}
                  target={alvo.target}
                  rel={alvo.rel}
                  className="group inline-flex min-h-[52px] w-full max-w-xs items-center justify-center gap-3 border border-[#E8CF8A]/50 px-8 py-3.5 font-body text-[13px] tracking-[0.04em] text-[#FFF8E8] transition-colors duration-300 hover:border-[#E8CF8A] hover:bg-white/5 sm:w-auto"
                >
                  <Compass className="h-4 w-4 text-[#E8CF8A] transition-transform duration-500 group-hover:rotate-45" />
                  Fazer a jornada
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer ref={rodapeRef} className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:px-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <img src={logo} alt="" aria-hidden="true" className="h-10 w-auto opacity-80" />
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
              Do Luxo à Mesa · by Nádia Schultz
            </p>
          </div>
          <nav aria-label="Ligações" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-[12px] tracking-[0.04em]">
            <a
              href={hrefOrcamento({ pacote: escolhido, origem: "rodape" })}
              target={alvo.target}
              rel={alvo.rel}
              className="border-b border-[#EADCC0] pb-0.5 text-[#1A1A1A] transition-colors hover:border-[#C9A84C] hover:text-[#8C6526]"
            >
              Pedir orçamento
            </a>
            <a
              href={hrefGuia({ origem: "rodape" })}
              target={alvo.target}
              rel={alvo.rel}
              className="border-b border-[#EADCC0] pb-0.5 text-[#1A1A1A] transition-colors hover:border-[#C9A84C] hover:text-[#8C6526]"
            >
              Fazer a jornada
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[#EADCC0] pb-0.5 text-[#1A1A1A] transition-colors hover:border-[#C9A84C] hover:text-[#8C6526]"
            >
              Instagram
            </a>
          </nav>
        </div>
      </footer>

      {/* A carta, em folha */}
      <CartaDaCasa aberta={cartaAberta} aoFechar={fecharCarta} aoEscolher={setEscolhido} escolhido={escolhido} />

      {/* Barra fixa (telemóvel e tablet) — a ação nunca fica longe do polegar */}
      <AnimatePresence>
        {barraVisivel && (
          <motion.div
            key="barra"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.5, ease: EASE_LUXO }}
            className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          >
            <div className="mx-auto flex max-w-lg items-stretch gap-2 border-t border-[#EADCC0] bg-[#FBF8F1]/92 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_-20px_rgba(26,26,26,0.35)] backdrop-blur-md">
              <a
                href={hrefOrcamento({ pacote: escolhido, origem: "barra" })}
                target={alvo.target}
                rel={alvo.rel}
                className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 bg-[#1A1A1A] px-5 font-body text-[13px] font-medium tracking-[0.04em] text-[#FBF8F1] active:bg-[#333]"
              >
                Pedir orçamento
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={hrefGuia({ origem: "barra" })}
                target={alvo.target}
                rel={alvo.rel}
                aria-label="Fazer a jornada — o guia interativo da casa"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 border border-[#C9A84C] px-4 font-body text-[13px] tracking-[0.04em] text-[#8C6526] active:bg-[#F6EFDD]"
              >
                <Compass className="h-4 w-4" />
                <span className="hidden min-[400px]:inline">Jornada</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Paragrafo({ delay }: { delay: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE_LUXO }}
      className="mt-6 max-w-md font-body text-[14px] leading-[1.8] text-[#4B4B4B] sm:text-[15px] lg:mt-7"
    >
      O nosso site está a ganhar uma nova vida, com o mesmo cuidado que dedicamos a cada detalhe. Entretanto, a sua
      próxima celebração pode começar aqui.
    </motion.p>
  );
}

function Acoes({
  hrefOrc,
  hrefJornada,
  alvo,
  delay,
  compacto = false,
}: {
  hrefOrc: string;
  hrefJornada: string;
  alvo: ReturnType<typeof useAlvoExterno>;
  delay: number;
  compacto?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE_LUXO }}
      className={compacto ? "" : "mt-9"}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <MagneticButton
          href={hrefOrc}
          target={alvo.target}
          rel={alvo.rel}
          className="group inline-flex min-h-[54px] items-center justify-between gap-6 bg-[#1A1A1A] px-6 py-4 font-body text-[13px] font-medium tracking-[0.04em] text-[#FBF8F1] shadow-[0_14px_34px_-14px_rgba(26,26,26,0.55)] transition-colors duration-300 hover:bg-[#2A2A2A] sm:min-w-[240px]"
        >
          <span>Pedir orçamento</span>
          {alvo.novoSeparador && <span className="sr-only"> (abre noutro separador)</span>}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </MagneticButton>
        <a
          href={hrefJornada}
          target={alvo.target}
          rel={alvo.rel}
          className="group inline-flex min-h-[54px] items-center justify-between gap-6 border border-[#C9A84C] px-6 py-4 font-body text-[13px] tracking-[0.04em] text-[#8C6526] transition-colors duration-300 hover:bg-[#F6EFDD] sm:min-w-[240px]"
        >
          <span className="inline-flex items-center gap-2.5">
            <Compass className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            Fazer a jornada
          </span>
          {alvo.novoSeparador && <span className="sr-only"> (abre noutro separador)</span>}
          <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <p className="mt-3 font-body text-[11px] tracking-[0.02em] text-[#6B7280]">
        Conte-nos o que está a imaginar para o seu evento · a jornada é o guia interativo da casa.
      </p>
    </motion.div>
  );
}

export default Index;
