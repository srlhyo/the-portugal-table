import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { diaryPosts } from "@/data/diary-posts";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PackageReplaceModal from "@/components/PackageReplaceModal";
import BubbleReplaceModal from "@/components/BubbleReplaceModal";
import { useMemo } from "react";

const DiaryPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { items, setIsOpen } = useCart();
  const navigate = useNavigate();
  const post = diaryPosts.find((p) => p.slug === slug);

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const hasItems = items.length > 0;
  const ctaLabel = hasItems ? "Continuar Reserva" : "Começar Reserva";

  // Estimate reading time
  const readingTime = useMemo(() => {
    if (!post) return 0;
    const wordCount = post.blocks
      .filter((b) => b.type === "paragraph")
      .reduce((sum, b) => sum + (b as { type: "paragraph"; text: string }).text.split(/\s+/).length, 0);
    return Math.max(1, Math.ceil(wordCount / 200));
  }, [post]);

  if (!post) return <Navigate to="/diario" replace />;

  const handleStartBooking = () => {
    navigate("/#pacotes");
    setTimeout(() => {
      const el = document.getElementById("pacotes");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left"
        style={{ scaleX }}
      />

      <Header />
      <CartDrawer />
      <PackageReplaceModal />
      <BubbleReplaceModal />

      {/* Cinematic Hero */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <motion.img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-light mb-4">
              {post.category} · {post.date}
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60">
              {readingTime} min de leitura
            </p>
          </motion.div>
        </div>
      </div>

      <main className="pt-12 pb-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl mb-16">
          <nav className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors duration-300">Início</Link>
            <span className="text-border">·</span>
            <Link to="/diario" className="hover:text-gold transition-colors duration-300">O Diário da Mesa</Link>
            <span className="text-border">·</span>
            <span className="text-foreground/50 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>

        {/* Post Content */}
        <div className="container mx-auto px-6 lg:px-12 max-w-2xl">
          {post.blocks.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                >
                  {block.text.split("\n").map((line, j) => (
                    <p
                      key={j}
                      className="font-body text-[15px] md:text-base text-foreground/75 leading-[2] mb-3"
                    >
                      {line}
                    </p>
                  ))}
                  <div className="mb-10" />
                </motion.div>
              );
            }

            if (block.type === "image") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8 }}
                  className="my-14 md:my-20 -mx-6 md:-mx-12 lg:-mx-20"
                >
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full object-cover"
                  />
                </motion.div>
              );
            }

            if (block.type === "spacer") {
              return <div key={i} className="h-8 md:h-12" />;
            }

            /* Mid-article CTA - insert after first spacer */
            return null;
          })}
        </div>

        {/* Mid-article subtle CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 lg:px-12 max-w-2xl my-16"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="flex-1 h-px bg-border" />
            <button
              onClick={handleStartBooking}
              className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors duration-500 link-underline whitespace-nowrap"
            >
              {ctaLabel}
            </button>
            <div className="flex-1 h-px bg-border" />
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 lg:px-12 max-w-3xl mt-20 md:mt-28 text-center"
        >
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
          <p className="font-display text-2xl md:text-3xl text-foreground italic mb-10">
            Deseja viver um momento assim?
          </p>
          <button
            onClick={handleStartBooking}
            className="inline-flex items-center justify-center gap-2 bg-foreground text-background font-body text-[11px] uppercase tracking-[0.18em] px-10 py-4 hover:bg-foreground/90 transition-colors duration-300"
          >
            <ClipboardList className="w-4 h-4" />
            {ctaLabel}
          </button>
          <div className="w-16 h-px bg-gold mx-auto mt-10" />
        </motion.div>

        {/* Related Posts */}
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl mt-24">
          <div className="border-t border-border pt-12">
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground text-center mb-8">
              Mais do Diário
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {diaryPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/diario/${relatedPost.slug}`}
                    className="group text-center"
                  >
                    <div className="overflow-hidden mb-4">
                      <div className="aspect-[16/10]">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                    <p className="font-body text-[9px] uppercase tracking-[0.2em] text-gold mb-2">
                      {relatedPost.category}
                    </p>
                    <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors duration-300">
                      {relatedPost.title}
                    </h3>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiaryPost;
