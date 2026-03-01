import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { diaryPosts } from "@/data/diary-posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PackageReplaceModal from "@/components/PackageReplaceModal";
import BubbleReplaceModal from "@/components/BubbleReplaceModal";

const Diary = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <CartDrawer />
      <PackageReplaceModal />
      <BubbleReplaceModal />

      <main className="pt-32 pb-24">
        {/* Page Header */}
        <div className="container mx-auto px-6 lg:px-12 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
              O Diário da Mesa
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              O Diário da Mesa
            </h1>
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <p className="font-body text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Histórias, bastidores e momentos que ganham forma à mesa.
            </p>
          </motion.div>
        </div>

        {/* Posts Grid - Editorial Layout */}
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="space-y-24 md:space-y-32">
            {diaryPosts.map((post, index) => (
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
                    <div className="aspect-[16/10] md:aspect-[16/9]">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Post Meta */}
                  <div className="max-w-2xl mx-auto text-center">
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                      {post.category} · {post.date}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 group-hover:text-gold transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/60 group-hover:text-gold transition-colors duration-300 link-underline">
                      Ler mais
                    </span>
                  </div>
                </Link>

                {/* Separator between posts */}
                {index < diaryPosts.length - 1 && (
                  <div className="mt-24 md:mt-32 flex justify-center">
                    <div className="w-px h-16 bg-border" />
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
