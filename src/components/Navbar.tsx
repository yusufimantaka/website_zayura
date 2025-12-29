"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  // If not home page, we want the navbar to always have its "scrolled" style (background & dark text)
  // because sub-pages don't have the dark hero image at the top.
  const shouldBeElevated = !isHomePage || isScrolled;

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

  const navLinks = [
    { href: '/kamar', label: 'Kamar' },
    { href: '/gedung', label: 'Gedung' },
    { href: '/lokasi', label: 'Lokasi' },
    { href: '/paket', label: 'Paket' }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          shouldBeElevated 
            ? "pt-4 px-4" 
            : "pt-0 px-0"
        }`}
      >
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
          className={`mx-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
            shouldBeElevated 
              ? "max-w-7xl bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/10 rounded-full px-4 md:px-8 py-3" 
              : "max-w-full bg-transparent border-transparent rounded-none px-6 md:px-12 py-6 md:py-8"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image 
              src="/images/logo.png" 
              alt="Zayura Exclusive" 
              width={100} 
              height={32} 
              className={`h-6 md:h-8 w-auto object-contain transition-all duration-500 ${
                !shouldBeElevated || theme === 'dark' ? 'brightness-0 invert' : ''
              }`}
            />
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-10">
            <div className="hidden lg:flex items-center gap-12 text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-500">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="relative px-1 py-2 group"
                  >
                    <span className={`transition-colors duration-300 ${
                      shouldBeElevated 
                        ? (isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white') 
                        : 'text-white/70 hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-full transition-all duration-300 ${
                  shouldBeElevated 
                    ? 'hover:bg-muted text-muted-foreground hover:text-foreground' 
                    : 'hover:bg-white/10 text-white'
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && (
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href="/contact"
                className={`hidden sm:flex px-8 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                  shouldBeElevated 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-gray-900"
                }`}
              >
                Hubungi Kami
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                  shouldBeElevated 
                    ? 'hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-white/10' 
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[40] lg:hidden bg-background/95 backdrop-blur-xl pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-black tracking-tighter transition-colors ${
                      isActive ? 'text-primary' : 'text-foreground/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="h-[1px] bg-border my-4" />
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-primary text-gray-900 px-8 py-4 rounded-2xl text-lg font-black text-center shadow-lg shadow-primary/20"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
