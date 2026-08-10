import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import {
  pacotes,
  precoPorConvidado,
  pacotePorId,
  OFERTA_COMUM,
} from "@/data/pacotes";
import MesaAEscala from "@/components/reforma/MesaAEscala";
import { hrefOrcamento, useAlvoExterno } from "@/components/reforma/orcamento";

// ============================================================
// CartaDaCasa — a carta que a mordoma oferece.
//
// Um maître não empurra preços: apresenta o menu e deixa
// escolher. É essa a peça que faltava — quem quer comparar
// abre a carta; quem tem pressa levanta a campânula e nunca
// sabe que ela existiu.
//
// A folha DESENROLA-SE, com um rolo dourado a correr na aresta
// — o mesmo gesto no telemóvel e no computador. Foi preferido
// ao tríptico em rotateY porque é a mesma metáfora de papel dos
// dois lados, custa uma animação de pintura em vez de 3D com
// backface (Android modesto agradece), e põe a primeira palavra
// legível no ecrã em 0,35s em vez de 1,5s.
//
// A pergunta do topo — quantos convidados espera receber — é o
// atalho da decisão: é a única variável que o visitante sabe de
// cor, e aceita uma resposta vaga ("entre 19 e 35"), que é
// precisamente o que ele tem no dia em que anda a pedir
// orçamentos.
//
// props:
//   aberta       — a carta está à vista
//   aoFechar()   — pedido de fecho (✕, Esc, véu, botão Voltar)
//   aoEscolher(id | null) — o serviço anotado segue para o
//                  pedido de orçamento e para a campânula
//   escolhido    — id do serviço já anotado, ou null
// ============================================================

const EASE_LUXO = [0.22, 1, 0.36, 1];
const EASE_SAIDA = [0.4, 0, 1, 1];

/** Marfim com o grão do papel — a carta nunca é uma superfície lisa. */
const PAPEL = {
  backgroundColor: "#FDFBF6",
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(160,120,48,0.022) 0px, rgba(160,120,48,0.022) 1px, transparent 1px, transparent 3px)",
};

/** O último cartão de lugar não é um pacote: é uma conversa. */
const A_MEDIDA = "a-medida";

const WHATSAPP_MESA_GRANDE =
  "https://wa.me/351927177190?text=" +
  encodeURIComponent(
    "Olá! Vi a carta da casa e o meu evento é para mais de 50 convidados. Podemos desenhar uma mesa à medida?",
  );

const LUGARES = [
  ...pacotes.map((p) => ({
    valor: p.id,
    intervalo:
      p.convidadosMin <= 1
        ? `até ${p.convidadosMax}`
        : `${p.convidadosMin} a ${p.convidadosMax}`,
    nome: p.nome,
    aria: `Ver o serviço ${p.nome}, ${
      p.convidadosMin <= 1
        ? `até ${p.convidadosMax} convidados`
        : `de ${p.convidadosMin} a ${p.convidadosMax} convidados`
    }`,
  })),
  {
    valor: A_MEDIDA,
    intervalo: "mais de 50",
    nome: "à medida",
    aria: "Mais de 50 convidados — falar connosco sobre uma mesa à medida",
  },
];

function useMediaQuery(query) {
  const [ativo, setAtivo] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const ouvir = (e) => setAtivo(e.matches);
    setAtivo(mq.matches);
    mq.addEventListener("change", ouvir);
    return () => mq.removeEventListener("change", ouvir);
  }, [query]);
  return ativo;
}

/**
 * O botão Voltar do Android fecha a carta, não o site.
 * Sem isto, quem chega pelo webview do Instagram e carrega em
 * Voltar perde a página inteira — e nós perdemos a visita.
 */
function useFechoPeloVoltar(aberta, aoFechar) {
  const nosso = useRef(false);

  useEffect(() => {
    if (!aberta) return;
    window.history.pushState({ dlmCarta: true }, "");
    nosso.current = true;

    const aoVoltar = () => {
      nosso.current = false;
      aoFechar();
    };
    window.addEventListener("popstate", aoVoltar);

    return () => {
      window.removeEventListener("popstate", aoVoltar);
      // Fechada por ✕/Esc/véu: retiramos a entrada que pusemos,
      // para não deixar história falsa atrás de nós.
      if (nosso.current && window.history.state?.dlmCarta) {
        nosso.current = false;
        window.history.back();
      }
    };
  }, [aberta, aoFechar]);
}

export default function CartaDaCasa({ aberta, aoFechar, aoEscolher, escolhido }) {
  const reduzido = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const folhaRef = useRef(null);
  const carrosselRef = useRef(null);
  const painelRefs = useRef([]);

  const sugestao = pacotes.find((p) => p.destaque) ?? pacotes[0];
  const [lugar, setLugar] = useState(() => escolhido ?? sugestao.id);
  const [visivel, setVisivel] = useState(() =>
    Math.max(0, pacotes.findIndex((p) => p.destaque)),
  );

  const d = useCallback((v) => (reduzido ? 0 : v), [reduzido]);

  useFechoPeloVoltar(aberta, aoFechar);

  // ---- Trancar o fundo enquanto a carta está aberta ----
  useEffect(() => {
    if (!aberta) return;
    const html = document.documentElement;
    const anterior = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = anterior;
    };
  }, [aberta]);

  // ---- Esc fecha; Tab circula dentro da carta ----
  useEffect(() => {
    if (!aberta) return;
    const aoTeclar = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        aoFechar();
        return;
      }
      if (e.key !== "Tab") return;
      const folha = folhaRef.current;
      if (!folha) return;
      const focaveis = folha.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberta, aoFechar]);

  // O foco entra na carta ao abrir e volta ao gatilho ao fechar —
  // quem navega por teclado nunca é despejado no início da página.
  useEffect(() => {
    if (!aberta) return;
    const veioDe = document.activeElement;
    folhaRef.current?.focus({ preventScroll: true });
    return () => {
      if (veioDe instanceof HTMLElement && document.contains(veioDe)) {
        veioDe.focus({ preventScroll: true });
      }
    };
  }, [aberta]);

  // ---- No telemóvel, o visitante aterra na sugestão da casa ----
  useLayoutEffect(() => {
    if (!aberta || desktop) return;
    const pista = carrosselRef.current;
    const alvo = painelRefs.current[visivel];
    if (!pista || !alvo) return;
    pista.scrollLeft = alvo.offsetLeft - (pista.clientWidth - alvo.offsetWidth) / 2;
    // Só ao abrir: a partir daqui o carrossel é do visitante.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberta, desktop]);

  /** Que folha está centrada — manda na barra de ação do telemóvel. */
  const aoRolar = useCallback(() => {
    const pista = carrosselRef.current;
    if (!pista) return;
    const centro = pista.scrollLeft + pista.clientWidth / 2;
    let melhor = 0;
    let menor = Infinity;
    painelRefs.current.forEach((el, i) => {
      if (!el) return;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centro);
      if (dist < menor) {
        menor = dist;
        melhor = i;
      }
    });
    setVisivel(melhor);
  }, []);

  /** Escolher onde se senta: anota o serviço e leva lá o carrossel. */
  const escolherLugar = useCallback(
    (valor) => {
      setLugar(valor);

      // "Mais de 50" não é um pacote: nada fica anotado, mas o
      // carrossel tem mesmo de ir até lá. Sem isto, o visitante de
      // maior valor tocava e via apenas o CTA desaparecer.
      const i =
        valor === A_MEDIDA
          ? pacotes.length
          : pacotes.findIndex((p) => p.id === valor);

      aoEscolher?.(valor === A_MEDIDA ? null : valor);

      if (i < 0) return;
      if (valor !== A_MEDIDA) setVisivel(i);

      const alvo = painelRefs.current[i];
      const pista = carrosselRef.current;
      if (alvo && pista && !desktop) {
        pista.scrollTo({
          left: alvo.offsetLeft - (pista.clientWidth - alvo.offsetWidth) / 2,
          behavior: reduzido ? "auto" : "smooth",
        });
      }
    },
    [aoEscolher, desktop, reduzido],
  );

  // Na folha "à medida" não há pacote — e a barra de ação some-se,
  // porque essa folha traz o seu próprio caminho (o WhatsApp).
  const pacoteVisivel = pacotes[visivel] ?? null;

  return (
    <AnimatePresence>
      {aberta && (
        <div className="fixed inset-0 z-50">
          {/* A luz da sala baixa: o resto da página recolhe-se.
              Sem backdrop-filter — havia um canvas de partículas
              vivo por baixo, e desfocá-lo a 60 fps num telemóvel
              a bateria era caro por nada. */}
          <motion.div
            aria-hidden="true"
            onClick={aoFechar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: d(0.35), ease: "easeOut" }}
            className="absolute inset-0 bg-[#1A1A1A]/35"
          />

          <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-center md:p-6">
            <motion.div
              ref={folhaRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="carta-titulo"
              tabIndex={-1}
              initial={
                reduzido
                  ? { opacity: 0 }
                  : { opacity: 1, clipPath: "inset(0 0 100% 0)" }
              }
              animate={
                reduzido
                  ? { opacity: 1 }
                  : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
              }
              exit={
                reduzido
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, transition: { duration: 0.3, ease: EASE_SAIDA } }
              }
              transition={{ duration: d(0.55), ease: EASE_LUXO }}
              // O papel acabou de desenrolar: tiramos o clip-path,
              // que de outro modo ficava inscrito no style inline e
              // continuava a recortar a folha para sempre.
              onAnimationComplete={() => {
                const el = folhaRef.current;
                if (el) el.style.clipPath = "";
              }}
              style={PAPEL}
              className="pointer-events-auto relative flex h-[92dvh] w-full flex-col border border-[#E4D3A2] shadow-[0_40px_120px_-40px_rgba(26,26,26,0.35)] outline-none md:h-[min(820px,88dvh)] md:w-[min(1120px,94vw)]"
            >
              {/* O rolo dourado que corre na aresta enquanto o
                  papel se desenrola */}
              {!reduzido && (
                <motion.div
                  aria-hidden="true"
                  initial={{ top: "0%", opacity: 1 }}
                  animate={{ top: "100%", opacity: 0 }}
                  transition={{
                    top: { duration: d(0.55), ease: EASE_LUXO },
                    opacity: { duration: d(0.2), delay: d(0.42) },
                  }}
                  className="pointer-events-none absolute inset-x-0 z-20 h-[5px] bg-gradient-to-r from-[#E8D5A3] via-[#C9A84C] to-[#E8D5A3] shadow-[0_2px_10px_rgba(201,168,76,0.5)]"
                />
              )}

              {/* O vinco do topo */}
              <div
                aria-hidden="true"
                className="h-[3px] w-full shrink-0 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
              />

              <Cabecalho d={d} />

              <CartoesDeLugar lugar={lugar} aoEscolher={escolherLugar} d={d} />

              <div
                aria-hidden="true"
                className="mx-6 h-px shrink-0 bg-[#EADCC0] md:mx-10"
              />

              {/* ---- O corpo da carta ---- */}
              <div
                ref={carrosselRef}
                onScroll={desktop ? undefined : aoRolar}
                className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] md:block md:snap-none md:overflow-x-hidden md:overflow-y-auto [&::-webkit-scrollbar]:hidden"
              >
                {/* Encostos para a primeira e a última folha
                    centrarem no encaixe */}
                <div aria-hidden="true" className="w-[8vw] shrink-0 md:hidden" />

                {/* No telemóvel este invólucro desaparece
                    (display:contents) para que cada folha seja
                    filha direta da pista e o encaixe funcione;
                    no computador vira a grelha de três colunas. */}
                <div className="contents md:grid md:grid-cols-3">
                  {pacotes.map((p, i) => (
                    <PainelDoServico
                      key={p.id}
                      refCallback={(el) => (painelRefs.current[i] = el)}
                      pacote={p}
                      realcado={lugar === p.id}
                      apagado={lugar !== p.id && lugar !== A_MEDIDA}
                      desktop={desktop}
                      d={d}
                      total={pacotes.length}
                      indice={i}
                    />
                  ))}
                </div>

                {/* O evento maior não sai pela porta: tem casa
                    própria, de largura total, e está cá sempre —
                    a grelha de três colunas nunca muda de forma.
                    No telemóvel é a quarta folha do carrossel,
                    logo tem de vir ANTES do encosto final. */}
                <BlocoAMedida
                  refCallback={(el) => (painelRefs.current[pacotes.length] = el)}
                  realcado={lugar === A_MEDIDA}
                />

                <div aria-hidden="true" className="w-[8vw] shrink-0 md:hidden" />
              </div>

              {/* Um véu de marfim no fim do corpo: diz, sem uma
                  palavra, que a ementa continua por baixo. */}
              <div
                aria-hidden="true"
                className="pointer-events-none relative z-10 -mt-8 hidden h-8 shrink-0 bg-gradient-to-t from-[#FDFBF6] to-transparent md:block"
              />

              <Rodape
                pacoteVisivel={pacoteVisivel}
                desktop={desktop}
                aoFechar={aoFechar}
              />

              <button
                type="button"
                onClick={aoFechar}
                aria-label="Fechar a carta e voltar à mesa"
                className="absolute right-1 top-2 z-30 flex h-11 w-11 items-center justify-center text-[#A07830] opacity-60 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A07830] md:right-3 md:top-3"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <p className="sr-only" aria-live="polite">
                Carta da casa aberta. Três serviços disponíveis.
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ------------------------------------------------------------
function Cabecalho({ d }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: d(0.5), delay: d(0.25), ease: "easeOut" }}
      className="shrink-0 px-6 pb-3 pt-5 text-center md:px-10 md:pb-4 md:pt-7"
    >
      <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A07830]">
        A carta da casa
      </p>
      <h2
        id="carta-titulo"
        className="font-display mt-1.5 text-[26px] font-light leading-tight text-[#1A1A1A] md:mt-2 md:text-[34px]"
      >
        Três serviços, uma mesma mesa.
      </h2>
      <p className="mt-1.5 font-body text-[11px] font-light text-[#6B7280] md:text-xs">
        Escolha pela lotação — o resto tratamos nós.
      </p>
    </motion.header>
  );
}

// ------------------------------------------------------------
// Os cartões de lugar — escolher é escolher onde se senta.
// (Um slider seria a gramática do simulador de crédito; aqui a
// pergunta aceita um intervalo, que é a resposta que a pessoa
// realmente tem.)
// ------------------------------------------------------------
function CartoesDeLugar({ lugar, aoEscolher, d }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: d(0.5), delay: d(0.33), ease: "easeOut" }}
      className="shrink-0 px-3 pb-3 md:px-10 md:pb-4"
    >
      <p className="text-center font-body text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF]">
        Quantos convidados espera receber?
      </p>

      <div
        role="group"
        aria-label="Lotação do evento"
        className="mx-auto mt-2 flex max-w-2xl gap-1.5 md:gap-3"
      >
        {LUGARES.map((s) => {
          const ativo = s.valor === lugar;
          return (
            <button
              key={s.valor}
              type="button"
              onClick={() => aoEscolher(s.valor)}
              aria-pressed={ativo}
              aria-label={s.aria}
              className={`flex min-h-[44px] flex-1 flex-col items-center justify-center border px-1 py-1.5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#A07830] ${
                ativo
                  ? "border-[#C9A84C] bg-[#FFFDF6]"
                  : "border-[#EADCC0] bg-transparent hover:border-[#DCCBA0]"
              }`}
            >
              <span
                className={`font-body text-[9.5px] tracking-[0.04em] transition-colors duration-300 md:text-[11px] ${
                  ativo ? "text-[#1A1A1A]" : "text-[#9CA3AF]"
                }`}
              >
                {s.intervalo}
              </span>
              <span
                className={`font-display text-[12px] leading-tight transition-colors duration-300 md:text-[14px] ${
                  ativo ? "text-[#A07830]" : "text-[#C4B999]"
                }`}
              >
                {s.nome}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------
// Um serviço. A ordem de leitura é a mesma nos três, para que a
// comparação se faça por linha e não à caça.
// ------------------------------------------------------------
function PainelDoServico({
  refCallback,
  pacote,
  realcado,
  apagado,
  desktop,
  d,
  indice,
  total,
}) {
  const alvo = useAlvoExterno();
  const porConvidado = precoPorConvidado(pacote);

  return (
    <motion.article
      ref={refCallback}
      aria-roledescription="folha da carta"
      aria-label={`Serviço ${indice + 1} de ${total}: ${pacote.nome}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: apagado ? 0.72 : 1, y: 0 }}
      transition={{
        opacity: { duration: d(0.4), delay: d(0.4 + indice * 0.05) },
        y: { duration: d(0.5), delay: d(0.4 + indice * 0.05), ease: "easeOut" },
      }}
      className={`flex w-[84vw] shrink-0 snap-center flex-col overflow-y-auto px-5 pb-5 pt-4 outline-none [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#A07830] [&::-webkit-scrollbar]:hidden md:w-auto md:overflow-visible md:px-7 md:pb-7 md:pt-6 ${
        pacote.destaque
          ? "bg-[#FAF7F0] md:border-x md:border-[#F0E4C9]"
          : "bg-transparent"
      } ${realcado && !pacote.destaque ? "bg-[#FDFBF6]" : ""}`}
    >
      {/* Ordinal e a sugestão da casa — uma opinião assumida, que
          é sempre verdadeira, e não um "mais popular" que ninguém
          consegue provar. */}
      <div className="flex min-h-[20px] items-center justify-between">
        <span className="font-accent text-[11px] tracking-[0.3em] text-[#A07830]">
          {pacote.ordinal}
        </span>
        {pacote.destaque && (
          <span className="font-body text-[9px] uppercase tracking-[0.18em] text-[#A07830]">
            Sugestão da casa
          </span>
        )}
      </div>

      <h3 className="font-display mt-1.5 text-[30px] font-light leading-none text-[#1A1A1A] md:text-[38px]">
        {pacote.nome}
      </h3>

      {/* O preço sobe para debaixo do nome: os três números e as
          três mesas desenhadas cabem no primeiro ecrã. */}
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-body text-[9px] uppercase tracking-[0.18em] text-[#9CA3AF]">
          desde
        </span>
        <span className="font-display text-[38px] font-light leading-none text-[#A07830] md:text-[44px]">
          {pacote.preco}€
        </span>
      </div>
      <p className="mt-1 font-body text-[10.5px] text-[#6B7280]">
        ≈ {porConvidado} € por convidado
      </p>

      {/* Altura reservada para três linhas: as promessas têm
          comprimentos diferentes, mas os três botões têm de
          arrancar da mesma linha para a comparação ser justa. */}
      <p className="font-display mt-3 text-[15px] italic leading-snug text-[#4B5563] md:min-h-[4.3em]">
        {pacote.descricao}
      </p>

      {/* A ação vive logo a seguir à promessa: os três botões ficam
          à vista sem ser preciso rolar, alinhados entre si, e toda
          a prova — mesa, medidas, ementa — corre por baixo sem
          nada por cima. (Era sticky no fundo da coluna e tapava a
          ementa, justamente aquilo que faz a casa merecer o
          preço.) */}
      <div className="mt-4 hidden md:block">
        <a
          href={hrefOrcamento({ pacote: pacote.id, origem: "carta" })}
          target={alvo.target}
          rel={alvo.rel}
          className={`flex w-full items-center justify-center gap-2 py-3.5 font-body text-[10.5px] uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#A07830] ${
            pacote.destaque ? "btn-gold-flat" : "btn-outline-gold"
          }`}
        >
          Seguir com o {pacote.nome} →
          {alvo.novoSeparador && (
            <span className="sr-only"> (abre noutro separador)</span>
          )}
        </a>
        <p className="mt-1.5 text-center font-body text-[9.5px] text-[#9CA3AF]">
          Abre o pedido de orçamento
        </p>
      </div>

      {/* A mesa deste serviço, à escala real */}
      <div className="mt-4">
        <MesaAEscala pacote={pacote} />
        <p className="mt-1 text-center font-body text-[9px] uppercase tracking-[0.16em] text-[#9CA3AF]">
          {pacote.medida} · {pacote.lotacaoCurta} convidados
        </p>
      </div>

      {/* Especificações, sempre nas mesmas três células */}
      <div className="mt-4 grid grid-cols-3 border-y border-[#EADCC0]">
        {[
          ["Comprimento", pacote.medida],
          ["Peças", pacote.pecas.replace(" peças", "")],
          ["Lotação", pacote.lotacaoCurta],
        ].map(([rotulo, valor], i) => (
          <div
            key={rotulo}
            className={`px-1 py-2 text-center ${i < 2 ? "border-r border-[#EADCC0]" : ""}`}
          >
            <p className="font-body text-[8.5px] uppercase tracking-[0.18em] text-[#9CA3AF]">
              {rotulo}
            </p>
            <p className="font-display mt-0.5 text-[18px] leading-none text-[#1A1A1A]">
              {valor}
            </p>
          </div>
        ))}
      </div>

      {/* A ementa. Inteira, sempre: a especificidade é a prova de
          competência desta casa — truncá-la seria esconder o
          argumento. Travessões dourados, nunca ícones de check:
          isto é uma carta, não um plano tarifário. */}
      <p className="mt-4 font-body text-[9px] uppercase tracking-[0.22em] text-[#9CA3AF]">
        Na mesa
      </p>
      <ul className="mt-2 space-y-1">
        {pacote.itens.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-[9px] h-px w-2 shrink-0 bg-[#C9A84C]"
            />
            <span className="font-display text-[14.5px] leading-snug text-[#4B5563]">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* O degrau explicado por palavras nossas, não por um diff */}
      {pacote.ganho && (
        <p className="mt-4 border-l-2 border-[#C9A84C] pl-3 font-display text-[13.5px] italic leading-snug text-[#6B7280]">
          {pacote.ganho}
        </p>
      )}

    </motion.article>
  );
}

// ------------------------------------------------------------
function BlocoAMedida({ realcado, refCallback }) {
  const alvo = useAlvoExterno();
  return (
    <section
      ref={refCallback}
      className={`w-[84vw] shrink-0 snap-center border-l border-[#EADCC0] px-5 py-6 text-center transition-colors duration-300 md:w-auto md:border-l-0 md:border-t md:px-10 ${
        realcado ? "bg-[#FAF7F0]" : ""
      }`}
    >
      <h3 className="font-display text-[22px] font-light text-[#1A1A1A] md:text-[26px]">
        Mais de 50 convidados?
      </h3>
      <p className="mx-auto mt-1.5 max-w-md font-body text-[11.5px] font-light leading-relaxed text-[#6B7280]">
        Acima de 50, desenhamos a mesa consigo — comprimento, ementa e serviço de
        sala à medida do que a sua festa pede.
      </p>
      <a
        href={WHATSAPP_MESA_GRANDE}
        target={alvo.target}
        rel={alvo.rel}
        className="mt-3 inline-flex items-center border-b border-[#C9A84C] pb-0.5 font-body text-[11px] tracking-[0.06em] text-[#A07830] transition-colors hover:text-[#8C6526] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#A07830]"
      >
        Falar connosco sobre uma mesa maior →
        {alvo.novoSeparador && (
          <span className="sr-only"> (abre noutro separador)</span>
        )}
      </a>
    </section>
  );
}

// ------------------------------------------------------------
// O rodapé: a política da casa, dita uma vez — e, no telemóvel,
// a barra de ação que acompanha a folha à vista, para que o
// polegar nunca tenha de rolar até ao fim de um cartão.
// ------------------------------------------------------------
function Rodape({ pacoteVisivel, desktop, aoFechar }) {
  const alvo = useAlvoExterno();

  return (
    <div className="shrink-0 border-t border-[#EADCC0] bg-[#FDFBF6]">
      {!desktop && (
        <div
          className="px-4 pt-3"
          style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        >
          {/* Na folha "à medida" a ação é a da própria folha; aqui
              fica só a saída, para a barra nunca prometer um
              serviço que não é o que está no ecrã. */}
          {pacoteVisivel && (
            <a
              key={pacoteVisivel.id}
              href={hrefOrcamento({ pacote: pacoteVisivel.id, origem: "carta" })}
              target={alvo.target}
              rel={alvo.rel}
              className="btn-gold-flat flex w-full items-center justify-center py-3.5 font-body text-[11px] uppercase tracking-[0.16em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#A07830]"
            >
              Seguir com o {pacoteVisivel.nome} →
              {alvo.novoSeparador && (
                <span className="sr-only"> (abre noutro separador)</span>
              )}
            </a>
          )}
          <button
            type="button"
            onClick={aoFechar}
            className="mt-2 min-h-[44px] w-full font-body text-[10px] tracking-[0.08em] text-[#9CA3AF] transition-colors hover:text-[#6B7280] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A07830]"
          >
            Fechar a carta
          </button>
        </div>
      )}

      <div className="hidden px-10 py-3 text-center md:block">
        <p className="font-body text-[10.5px] font-light leading-relaxed text-[#6B7280]">
          {OFERTA_COMUM}
        </p>
        <p className="mt-1 font-body text-[9.5px] leading-relaxed text-[#9CA3AF]">
          Valor por convidado calculado sobre a lotação máxima de cada serviço. Os
          preços são pontos de partida — o orçamento final depende da data, do
          local e do que quiser acrescentar.
        </p>
      </div>
    </div>
  );
}
