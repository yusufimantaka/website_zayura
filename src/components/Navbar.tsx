"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'gallery', 'location', 'sewa', 'keunggulan', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "pt-4 px-4" 
          : "pt-0 px-0"
      }`}
    >
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
        className={`mx-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
          isScrolled 
            ? "max-w-7xl bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10 rounded-full px-8 py-3" 
            : "max-w-full bg-transparent border-transparent rounded-none px-12 py-8"
        }`}
      >
        <Link href="#home" className="flex items-center gap-2 group shrink-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Image 
            src="/images/logo.png" 
            alt="Zayura Exclusive" 
            width={120} 
            height={40} 
            className={`h-8 w-auto object-contain transition-all duration-500 ${
              !isScrolled || theme === 'dark' ? 'brightness-0 invert' : ''
            }`}
          />
          </motion.div>
        </Link>
        
        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold transition-colors duration-500">
            {['gallery', 'location', 'sewa', 'keunggulan'].map((section) => {
              const labels: Record<string, string> = {
                gallery: 'Galeri',
                location: 'Lokasi',
                sewa: 'Paket',
                keunggulan: 'Fasilitas'
              };
              const isActive = activeSection === section;
              
              return (
                <Link 
                  key={section}
                  href={`#${section}`} 
                  className="relative px-1 py-2 group"
                >
                  <span className={`transition-colors duration-300 ${
                    isActive 
                      ? (isScrolled ? 'text-primary' : 'text-white') 
                      : (isScrolled ? 'text-gray-500 hover:text-gray-900' : 'text-white/80 hover:text-white')
                  }`}>
                    {labels[section]}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="navUnderline"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled ? 'bg-primary' : 'bg-white'
                      }`}
                      transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-white/10' 
                  : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && (
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-500 shadow-sm hover:shadow-md ${
                isScrolled 
                  ? "bg-primary text-gray-900 hover:brightness-110" 
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              Hubungi Kami
            </motion.a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};
