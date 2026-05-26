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
              <svg className="h-4 w-4 text-primary opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 50,20 L 50,48" />
                <path d="M 50,80 L 50,57.5" />
                <path d="M 32,30 L 40,40 C 42.5,42.5 42.5,45 42.5,47.5 L 42.5,52.5 C 42.5,57.5 45,57.5 50,57.5 C 55,57.5 57.5,57.5 57.5,52.5 L 57.5,47.5 C 57.5,45 57.5,42.5 60,40 L 68,30" />
                <path d="M 18,50 L 26,50 C 30,50 32,48 32,43 L 32,30" />
                <path d="M 18,50 L 26,50 C 30,50 32,52 32,57 L 32,63 C 32,68 37,68 42,68 L 50,68" />
                <path d="M 82,50 L 74,50 C 70,50 68,48 68,43 L 68,30" />
                <path d="M 82,50 L 74,50 C 70,50 68,52 68,57 L 68,63 C 68,68 63,68 58,68 L 50,68" />
                <circle cx="50" cy="20" r="3.5" fill="currentColor" stroke="none" />
                <circle cx="50" cy="80" r="3.5" fill="currentColor" stroke="none" />
                <circle cx="18" cy="50" r="3.5" fill="currentColor" stroke="none" />
                <circle cx="82" cy="50" r="3.5" fill="currentColor" stroke="none" />
                <circle cx="32" cy="30" r="3.5" fill="currentColor" stroke="none" />
                <circle cx="68" cy="30" r="3.5" fill="currentColor" stroke="none" />
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
          <svg className="h-8 w-8 text-slate-500 dark:text-slate-400 opacity-20 hover:opacity-60 transition-opacity duration-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 50,20 L 50,48" />
            <path d="M 50,80 L 50,57.5" />
            <path d="M 32,30 L 40,40 C 42.5,42.5 42.5,45 42.5,47.5 L 42.5,52.5 C 42.5,57.5 45,57.5 50,57.5 C 55,57.5 57.5,57.5 57.5,52.5 L 57.5,47.5 C 57.5,45 57.5,42.5 60,40 L 68,30" />
            <path d="M 18,50 L 26,50 C 30,50 32,48 32,43 L 32,30" />
            <path d="M 18,50 L 26,50 C 30,50 32,52 32,57 L 32,63 C 32,68 37,68 42,68 L 50,68" />
            <path d="M 82,50 L 74,50 C 70,50 68,48 68,43 L 68,30" />
            <path d="M 82,50 L 74,50 C 70,50 68,52 68,57 L 68,63 C 68,68 63,68 58,68 L 50,68" />
            <circle cx="50" cy="20" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="50" cy="80" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="18" cy="50" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="82" cy="50" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="32" cy="30" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="68" cy="30" r="3.5" fill="currentColor" stroke="none" />
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
