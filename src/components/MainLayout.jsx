import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Moon, Sun } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import portfolioData from '../data/portfolio.json';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#exploring' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';

  const savedTheme = window.localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const MainLayout = ({ children, hero }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30 selection:text-cyan-200">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-500 via-cyan-200 to-blue-300 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/90 md:bg-background/70 backdrop-blur-safari border-b border-black/[0.05] dark:border-white/5 shadow-lg' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <span className="text-xl sm:text-2xl font-display font-bold tracking-normal text-slate-800 dark:text-white">
              {portfolioData.basicInfo.displayName}<span className="text-primary">.</span>
            </span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 font-mono text-sm transition-colors ${
                    activeSection === link.href.substring(1) ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/[0.06] -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="text-primary/60 mr-1">/</span>{link.name.toLowerCase()}
                </a>
              ))}
            </div>

            {/* Systems Status Badge containing the custom systems-oriented logo */}
            <div className="hidden lg:flex items-center gap-2 border border-black/10 dark:border-white/[0.08] bg-black/5 dark:bg-white/[0.025] px-3 h-9 font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
              <svg className="h-4 w-4 text-primary opacity-80" viewBox="0 0 100 100" fill="none">
                <path d="M 46 29 L 62.27 38.39 Q 64 39.39 64 41.39 L 64 59 L 57.5 59 L 57.5 44.64 Q 57.5 43.14 55.77 42.14 L 46 36.5 Z" fill="currentColor" />
                <path d="M 46 44 L 54.27 48.77 Q 56 49.77 56 51.77 L 56 67 L 49.5 67 L 49.5 55.02 Q 49.5 53.52 47.77 52.52 L 46 51.5 Z" fill="currentColor" />
                <path d="M 54 71 L 37.73 61.61 Q 36 60.61 36 58.61 L 36 41 L 42.5 41 L 42.5 55.36 Q 42.5 56.86 44.23 57.86 L 54 63.5 Z" fill="currentColor" />
                <path d="M 54 56 L 45.73 51.23 Q 44 50.23 44 48.23 L 44 33 L 50.5 33 L 50.5 44.98 Q 50.5 46.48 52.23 47.48 L 54 48.5 Z" fill="currentColor" />
              </svg>
              <span className="text-slate-400 dark:text-slate-300 font-semibold">SYS.ACTIVE</span>
            </div>

            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              className="inline-flex h-9 w-9 items-center justify-center border border-black/10 dark:border-white/[0.08] bg-black/5 dark:bg-white/[0.025] text-slate-500 dark:text-slate-400 transition-colors hover:border-primary/30 hover:text-primary"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              className="inline-flex h-9 w-9 items-center justify-center border border-black/10 dark:border-white/[0.08] bg-black/5 dark:bg-white/[0.025] text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button 
              className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <span className="text-primary/60 mr-2">/</span>{link.name.toLowerCase()}
                </a>
              ))}
            </div>
            
            <div className="mt-12 flex gap-6">
              <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"><FiGithub size={24} /></a>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"><FiLinkedin size={24} /></a>
              <a href={`mailto:${portfolioData.basicInfo.email}`} className="text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"><Mail size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Container */}
      {hero}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full overflow-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 dark:border-white/[0.06] bg-background py-10 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6">
          {/* Subtle cinematic brand logo mark */}
          <svg className="h-8 w-8 text-slate-500 dark:text-slate-400 opacity-20 hover:opacity-60 transition-opacity duration-300" viewBox="0 0 100 100" fill="none">
            <path d="M 46 29 L 62.27 38.39 Q 64 39.39 64 41.39 L 64 59 L 57.5 59 L 57.5 44.64 Q 57.5 43.14 55.77 42.14 L 46 36.5 Z" fill="currentColor" />
            <path d="M 46 44 L 54.27 48.77 Q 56 49.77 56 51.77 L 56 67 L 49.5 67 L 49.5 55.02 Q 49.5 53.52 47.77 52.52 L 46 51.5 Z" fill="currentColor" />
            <path d="M 54 71 L 37.73 61.61 Q 36 60.61 36 58.61 L 36 41 L 42.5 41 L 42.5 55.36 Q 42.5 56.86 44.23 57.86 L 54 63.5 Z" fill="currentColor" />
            <path d="M 54 56 L 45.73 51.23 Q 44 50.23 44 48.23 L 44 33 L 50.5 33 L 50.5 44.98 Q 50.5 46.48 52.23 47.48 L 54 48.5 Z" fill="currentColor" />
          </svg>
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 border-t border-black/5 dark:border-white/[0.05] pt-6">
            <p className="text-gray-500 font-mono text-sm">
              (c) {new Date().getFullYear()} Designed and built by {portfolioData.basicInfo.fullName}.
            </p>
            <div className="flex gap-6 font-mono text-sm text-gray-500">
              <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
