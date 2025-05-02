'use client';
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/basic_button';

interface GalleryImage {
  url: string;
  title: string;
  link: string;
}

interface CardProps {
  imageUrl: string;
  title: string;
  link: string;
  index: number;
}

const images: GalleryImage[] = [
  { url: 'meme2.jpg', title: 'zar_batyshka', link: 'https://x.com/MahmoudH0110' },
  { url: 'meme3.jpg', title: 'zar_batyshka',  link: 'https://x.com/felixx_78' },
  { url: 'meme4.jpg', title: 'zar_batyshka', link: 'https://x.com/the_crannberry' },
  { url: 'meme5.jpg', title: 'zar_batyshka', link: 'https://x.com/MahmoudH0110' },
  { url: 'meme6.jpg', title: 'zar_batyshka', link: 'https://x.com/felixx_78' },
  { url: 'meme7.jpg', title: 'zar_batyshka', link: 'https://x.com/the_crannberry' },
  { url: 'meme8.jpg', title: 'zar_batyshka', link: 'https://x.com/MahmoudH0110' },
  { url: 'meme9.jpg', title: 'zar_batyshka', link: 'https://x.com/felixx_78' },
  { url: 'meme10.jpg', title: 'zar_batyshka', link: 'https://x.com/the_crannberry' },
  { url: 'meme11.jpg', title: 'zar_batyshka',  link: 'https://x.com/MahmoudH0110' },
  { url: 'meme12.jpg', title: 'zar_batyshka', link: 'https://x.com/felixx_78' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const Card = ({ imageUrl, link, title, index }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial={{ opacity: 0.8 }}
      whileHover={{ 
        scale: 1.05, 
        zIndex: 10,
        opacity: 1,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative overflow-hidden rounded-xl bg-black/20 shadow-2xl hover:shadow-white/20 transition-all duration-500 border border-white/10 hover:border-white/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`
            : 'transparent'
        }}
      />
      
      {/* Floating particles */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * 100,
                y: Math.random() * 100,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 0.5 + Math.random() * 0.5, 0],
                x: Math.random() * 100,
                y: Math.random() * 100,
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
        <Image 
          src={`/${imageUrl}`}
          alt={title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 6}
        />
        
        {/* Image overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 rounded-b-xl">
        <motion.h3 
          className="text-white text-lg font-bold text-center tracking-tight"
          initial={{ y: 10, opacity: 0.9 }}
          animate={{ 
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <div className="flex justify-center mt-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              onClick={() => window.open(link, '_blank')}
              className="text-white bg-transparent hover:bg-white hover:text-black text-sm font-medium px-5 py-2 rounded-full border border-white/50 hover:border-white transition-all duration-300 shadow-lg hover:shadow-white/30 relative overflow-hidden group" 
              label={"FOLLOW CREATOR"}            
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Art() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Pedro | Meme Gallery</title>
        <meta name="description" content="Explore memes from the Pedro community" />
        <meta property="og:image" content="/pedro-social-preview.jpg" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-hidden font-mono selection:bg-white selection:text-black">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0">
            <Image
              src="/wallpaper4.png"
              alt="Background texture"
              layout="fill"
              objectFit="cover"
              className="opacity-20 mix-blend-overlay"
              priority
            />
          </div>
        </div>

        <div className="relative z-10">
          <section className="flex items-center justify-center py-12 text-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="px-6 max-w-4xl relative z-10"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                MEME GALLERY
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: "circOut" }}
                className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </motion.div>
          </section>

          <section className="relative py-8 px-6 mx-auto max-w-7xl" ref={galleryRef}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {images.map((image, index) => (
                <Card 
                  key={index}
                  imageUrl={image.url} 
                  title={image.title}
                  link={image.link}
                  index={index}
                />
              ))}
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
}