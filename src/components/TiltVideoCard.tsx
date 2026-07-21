import { motion } from "framer-motion";

interface TiltVideoCardProps {
  src: string;
  poster?: string;
  className?: string;
}

/** A framed portrait video that floats gently in 3D space — real event footage as the hero's proof of craft. */
const TiltVideoCard = ({ src, poster, className = "" }: TiltVideoCardProps) => {
  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30, rotateY: -18 }}
        animate={{
          opacity: 1,
          y: [0, -14, 0],
          rotateY: [-10, -4, -10],
          rotateX: [4, 1, 4],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.6 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative mx-auto w-56 sm:w-64 md:w-72 [transform-style:preserve-3d]"
      >
        <div className="relative overflow-hidden rounded-sm border border-gold-light/30 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_60px_-10px_rgba(217,184,119,0.35)]">
          <video
            src={src}
            poster={poster}
            className="aspect-[9/16] w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
        <div className="pointer-events-none absolute -inset-x-6 -bottom-8 h-16 bg-[radial-gradient(ellipse,rgba(217,184,119,0.35),transparent_70%)] blur-xl" />
      </motion.div>
    </div>
  );
};

export default TiltVideoCard;
