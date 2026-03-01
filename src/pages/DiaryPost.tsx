import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { diaryPosts } from "@/data/diary-posts";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PackageReplaceModal from "@/components/PackageReplaceModal";
import BubbleReplaceModal from "@/components/BubbleReplaceModal";

const DiaryPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setIsOpen } = useCart();
  const post = diaryPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/diario" replace />;

  const handleStartBooking = () => {
    setIsOpen(true);
    setTimeout(() => {
      const packagesSection = document.getElementById("pacotes");
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <CartDrawer />
      <PackageReplaceModal />
      <BubbleReplaceModal />

      <main className="pt-32 pb-24">
        {/* Back link */}
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl mb-12">
          <Link
            to="/diario"
            className="inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            O Diário da Mesa
          </Link>
        </div>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 lg:px-12 max-w-3xl text-center mb-16"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold mb-6">
            {post.category} · {post.date}
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Post Content */}
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
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
                      className="font-body text-[15px] md:text-base text-foreground/80 leading-[1.9] mb-2"
                    >
                      {line}
                    </p>
                  ))}
                  <div className="mb-8" />
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
                  className="my-12 md:my-16 -mx-6 md:mx-0"
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
              return <div key={i} className="h-6 md:h-10" />;
            }

            return null;
          })}
        </div>

        {/* CTA Section */}
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
            Começar Reserva
          </button>
          <div className="w-16 h-px bg-gold mx-auto mt-10" />
        </motion.div>

        {/* Next/Prev Posts */}
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
