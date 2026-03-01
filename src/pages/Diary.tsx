import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { diaryPosts } from "@/data/diary-posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PackageReplaceModal from "@/components/PackageReplaceModal";
import BubbleReplaceModal from "@/components/BubbleReplaceModal";

const Diary = () => {
  const heroPost = diaryPosts[0];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <CartDrawer />
      <PackageReplaceModal />
      <BubbleReplaceModal />

      {/* Editorial Hero */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        <Link to={`/diario/${heroPost.slug}`} className="block w-full h-full group">
          <motion.img
            src={heroPost.coverImage}
            alt={heroPost.title}
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-light mb-4">
                {heroPost.category} · {heroPost.date}
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4 leading-tight group-hover:text-gold-light transition-colors duration-500">
                {heroPost.title}
              </h2>
              <p className="font-body text-sm text-primary-foreground/70 max-w-md mx-auto leading-relaxed">
                {heroPost.excerpt}
              </p>
            </motion.div>
          </div>
        </Link>
      </div>

      <main className="pt-20 pb-24">
        {/* Page Header */}
        <div className="container mx-auto px-6 lg:px-12 mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
              O Diário da Mesa
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Histórias à Mesa
            </h1>
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Bastidores, visões e momentos que ganham forma entre flores, luz e porcelana.
            </p>
          </motion.div>
        </div>

        {/* Posts Grid */}
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="space-y-28 md:space-y-36">
            {diaryPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link
                  to={`/diario/${post.slug}`}
                  className="group block"
                >
                  {/* Cover Image */}
                  <div className="relative overflow-hidden mb-8 md:mb-10">
                    <div className="aspect-[16/10] md:aspect-[16/8]">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700" />
                  </div>

                  {/* Post Meta */}
                  <div className="max-w-2xl mx-auto text-center">
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                      {post.category} · {post.date}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-5 group-hover:text-gold transition-colors duration-500">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
                      {post.excerpt}
                    </p>
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/40 group-hover:text-gold transition-colors duration-500 link-underline">
                      Ler mais
                    </span>
                  </div>
                </Link>

                {/* Separator */}
                {index < diaryPosts.length - 2 && (
                  <div className="mt-28 md:mt-36 flex justify-center">
                    <div className="w-px h-20 bg-border" />
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Diary;
