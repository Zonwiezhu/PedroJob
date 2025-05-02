'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AltHomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typingComplete, setTypingComplete] = useState(false);

  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const textToType = "This is a professional space where talent meets opportunity. We connect skilled individuals with innovative companies in the Injective ecosystem. Our platform is designed to elevate your career to new heights through meaningful connections.";

  return (
    <>
      <Head>
        <title>PEDRO×JOB</title>
        <meta name="description" content="Career opportunities in the Injective ecosystem" />
      </Head>

      <div 
        className="min-h-screen bg-black text-white overflow-hidden font-mono selection:bg-white selection:text-black"
        onMouseMove={handleMouseMove}
      >
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute inset-0">
            <Image
              src="/wallpaper3.png"
              alt="Background texture"
              layout="fill"
              objectFit="cover"
              className="opacity-20 mix-blend-overlay"
              priority
            />
          </div>
          
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'radial-gradient(ellipse at center, transparent 0%, black 100%)'
            }}
          />
        </div>

        <section className="relative flex items-center justify-center h-screen text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-6 max-w-4xl"
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter font-mono"
              whileHover={{ scale: 1.02 }}
            >
              PEDRO × <span className="text-white font-mono bg-clip-text bg-gradient-to-r">JOB</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl opacity-80 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Connecting talent with opportunity
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent my-12"
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex justify-center mt-8"
            >
              <motion.a
                href="#submit-cv"
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="px-8 py-3 border-2 border-gray-400 bg-transparent text-gray-300 text-lg font-mono hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  SUBMIT YOUR CV
                </button>
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative pt-64 pb-10 px-6 max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-64"
          >
            <h2 className="text-3xl md:text-5xl text-center font-bold tracking-tighter mb-12">
              <span className="text-white bg-clip-text bg-gradient-to-r">TALENT NETWORK</span>
            </h2>
            
            <motion.div 
              className="text-xl md:text-2xl leading-relaxed text-center text-gray-300 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <TypingText 
                text={textToType} 
                speed={20} 
                onComplete={() => setTypingComplete(true)}
              />
              
              {typingComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-12"
                >
                  <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-gray-500 to-transparent my-8" />
                  <p className="text-lg italic opacity-70">
                    Powered by TEAM PEDRO
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

const TypingText = ({ text, speed, onComplete }: { text: string; speed: number; onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className="typing-text">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1"
      >
        |
      </motion.span>
    </div>
  );
};