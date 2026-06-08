import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import portfolioData from '../data/portfolio.json';
import portraitImg from '../assets/portrait.png';

// 1. Atmospheric Particles Component
// Renders extremely faint, slow-moving floating dust particles to bring life to the dark canvas
// Scales particle count and animation loop on mobile to preserve CPU performance
const AtmosphericParticles = ({ isMobile }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Dynamic density to keep it subtle and highly performant on mobile
    const particleCount = isMobile ? 5 : 15;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.025 : 0.05), // slower drift on mobile
      vy: (Math.random() - 0.5) * (isMobile ? 0.025 : 0.05),
      r: Math.random() * (isMobile ? 1.0 : 1.5) + 0.5,
      alpha: Math.random() * (isMobile ? 0.06 : 0.12) + 0.02,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103, 232, 249, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// 2. Subtle Orchestration Layer
// Renders extremely faint node connections and flow paths (subconscious system vibe)
// Reduced to minimal aesthetic texture on mobile devices to optimize rendering paths and readability
const SubtleOrchestration = ({ isMobile }) => {
  if (isMobile) {
    return (
      <div className="absolute right-0 top-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <svg className="w-full h-full" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Extremely sparse node lines for texture */}
          <line x1="280" y1="360" x2="410" y2="420" stroke="rgba(103,232,249,0.25)" strokeWidth="0.5" />
          <line x1="410" y1="420" x2="320" y2="520" stroke="rgba(103,232,249,0.25)" strokeWidth="0.5" />
          {/* Sparse Nodes */}
          <circle cx="280" cy="360" r="1.5" fill="#67e8f9" />
          <circle cx="410" cy="420" r="1.5" fill="#67e8f9" />
          <circle cx="320" cy="520" r="1.5" fill="#67e8f9" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full overflow-hidden opacity-[0.08] pointer-events-none select-none">
      <svg className="w-full h-full" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines */}
        <line x1="240" y1="120" x2="380" y2="180" stroke="rgba(103,232,249,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="380" y1="180" x2="480" y2="260" stroke="rgba(103,232,249,0.3)" strokeWidth="0.5" />
        <line x1="280" y1="360" x2="380" y2="180" stroke="rgba(103,232,249,0.2)" strokeWidth="0.5" />
        <line x1="280" y1="360" x2="410" y2="420" stroke="rgba(103,232,249,0.3)" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="410" y1="420" x2="480" y2="260" stroke="rgba(103,232,249,0.2)" strokeWidth="0.5" />
        <line x1="410" y1="420" x2="320" y2="520" stroke="rgba(103,232,249,0.3)" strokeWidth="0.5" />
        <line x1="220" y1="450" x2="320" y2="520" stroke="rgba(103,232,249,0.2)" strokeWidth="0.5" />
        <line x1="320" y1="520" x2="460" y2="580" stroke="rgba(103,232,249,0.3)" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="460" y1="580" x2="480" y2="260" stroke="rgba(103,232,249,0.2)" strokeWidth="0.5" />

        {/* Animated pulses along pathways */}
        <path d="M240 120 L380 180 L480 260" stroke="rgba(103,232,249,0.4)" strokeWidth="0.75" strokeDasharray="8 80" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" values="400;0" dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M280 360 L410 420 L480 260" stroke="rgba(103,232,249,0.35)" strokeWidth="0.75" strokeDasharray="12 100" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" values="0;300" dur="12s" repeatCount="indefinite" />
        </path>
        <path d="M410 420 L320 520 L460 580" stroke="rgba(103,232,249,0.4)" strokeWidth="0.75" strokeDasharray="6 60" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" values="200;0" dur="8s" repeatCount="indefinite" />
        </path>

        {/* System Nodes */}
        <circle cx="240" cy="120" r="1.5" fill="#67e8f9" />
        <circle cx="380" cy="180" r="2" fill="#67e8f9" />
        <circle cx="480" cy="260" r="1.5" fill="#67e8f9" />
        <circle cx="280" cy="360" r="2" fill="#67e8f9" />
        <circle cx="410" cy="420" r="1.5" fill="#67e8f9" />
        <circle cx="320" cy="520" r="2" fill="#67e8f9" />
        <circle cx="460" cy="580" r="1.5" fill="#67e8f9" />
        <circle cx="220" cy="450" r="1" fill="#67e8f9" />

        {/* Ambient glow pulses */}
        <circle cx="380" cy="180" r="6" stroke="rgba(103,232,249,0.4)" strokeWidth="0.5" fill="none">
          <animate attributeName="r" values="3;10;3" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.7;0.1" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="520" r="8" stroke="rgba(103,232,249,0.3)" strokeWidth="0.5" fill="none">
          <animate attributeName="r" values="4;12;4" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

// 3. Main Hero Component
const Hero = () => {
  const { basicInfo, socials } = portfolioData;
  const heroRef = useRef(null);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Framer Motion Scroll tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Spring-smoothing for scroll transitions (physical inertia feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Scroll animations over 0% to 45% hero scroll progress
  // Opacity: 1 -> 0.08 on desktop, and 0.06 -> 0.01 on mobile (super faint, clean typography backdrop)
  const portraitOpacity = useTransform(
    smoothProgress,
    [0, 0.45],
    isMobile ? [0.06, 0.01] : [1, 0.08]
  );

  // TranslateY: 0px -> 60px
  const portraitY = useTransform(smoothProgress, [0, 0.45], [0, 60]);

  // Scale: 1 -> 0.97
  const portraitScale = useTransform(smoothProgress, [0, 0.45], [1, 0.97]);

  // Blur: 0px -> 8px
  const blurValue = useTransform(smoothProgress, [0, 0.45], [0, 8]);
  const portraitFilter = useTransform(
    blurValue,
    (v) => `contrast(1.1) brightness(0.8) grayscale(100%) blur(${v}px)`
  );

  // Faint orchestration & particle fades as user scrolls
  const orchestrationOpacity = useTransform(
    smoothProgress,
    [0, 0.45],
    isMobile ? [0.03, 0.00] : [1, 0.00]
  );
  const particlesOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0.1]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full bg-background text-slate-900 dark:text-white overflow-hidden flex items-center"
    >
      {/* 1. Background Gradient Layer */}
      <div className="absolute inset-0 bg-background -z-20 pointer-events-none">
        {/* Subtle cyan radial ambient glow centered on the portrait side */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(6,32,44,0.3)_0%,rgba(3,3,3,0)_70%)] dark:block hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(8,145,178,0.08)_0%,rgba(244,247,251,0)_70%)] dark:hidden block" />
        {/* Extra fine, technical grid system */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.012] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* 2. Portrait Layer (Facing Left, embedded in the environment) */}
      {/* Shifted further right on mobile (right-[-35%]) and height restricted (h-[65dvh]) to prevent content overlapping */}
      <motion.div
        style={{
          opacity: portraitOpacity,
          y: portraitY,
          scale: portraitScale,
          filter: portraitFilter,
        }}
        className="absolute right-[-35%] sm:right-[-15%] md:right-[0%] lg:right-[1%] bottom-0 h-[65dvh] sm:h-[82dvh] md:h-[90dvh] lg:h-[98dvh] w-auto aspect-[2/3] pointer-events-none z-10 select-none flex items-end justify-end overflow-hidden"
      >
        <img
          src={portraitImg}
          alt=""
          className="h-full w-auto object-cover object-bottom desaturate opacity-75 dark:opacity-85 mix-blend-multiply dark:mix-blend-lighten"
        />
      </motion.div>

      {/* 3. Overlay Layer */}
      {/* Sitting ABOVE the portrait (z-20) to fade it smoothly into background and protect text readability */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Horizontal blend gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 sm:via-background/80 md:via-background/75 to-transparent" />
        {/* Bottom vertical blend to merge clothing into background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/90 to-transparent" />
        {/* Top blend for clean header space */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-background to-transparent" />
      </div>

      {/* 4. Orchestration Graphics Layer (Ambient, faint topology lines) */}
      <motion.div style={{ opacity: orchestrationOpacity }} className="absolute inset-0 pointer-events-none z-30">
        <SubtleOrchestration isMobile={isMobile} />
      </motion.div>

      {/* 5. Atmospheric Noise / Particles Layer */}
      <motion.div style={{ opacity: particlesOpacity }} className="absolute inset-0 pointer-events-none z-[35]">
        <AtmosphericParticles isMobile={isMobile} />
      </motion.div>

      {/* 6. Hero Typography Layer (Spacious, confident, editorial alignment) */}
      {/* Optimized padding and grid heights to prevent mobile content overlap */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 z-40 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100dvh-80px)]">
          <motion.div
            className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-5 inline-flex self-start items-center gap-2 border border-black/10 dark:border-white/[0.05] bg-black/[0.02] dark:bg-white/[0.02] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80 animate-pulse-slow" />
              {basicInfo.tagline}
            </div>

            {/* Editorial Header */}
            {/* Fluid typography scaling prevents text overflow or edge collisions on narrow widths */}
            <h1 className="font-display font-semibold tracking-tight text-slate-900 dark:text-white text-[2.25rem] sm:text-5xl md:text-6xl xl:text-7xl leading-[1.12] sm:leading-[1.08] mb-6">
              <span className="block text-slate-500 dark:text-slate-400 font-light">Orchestrating</span>
              <span className="block">Autonomous Systems.</span>
              <span className="block text-slate-500 dark:text-slate-400/80 font-normal text-lg sm:text-2xl md:text-3xl mt-3 tracking-wide font-sans">
                Backend Architectures & Agent Runtimes
              </span>
            </h1>

            {/* Restrained Subtext */}
            <p className="max-w-xl text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-7 font-light">
              {basicInfo.shortBio}
            </p>

            {/* Call to Actions */}
            {/* Stacks on mobile and extends full tap width, matches inline flex behavior on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center bg-white text-black font-mono text-[10px] uppercase tracking-wider font-semibold px-6 py-4 transition-all duration-300 hover:bg-slate-200 text-center"
              >
                Inspect Systems
                <ArrowRight size={13} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={basicInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] text-slate-300 font-mono text-[10px] uppercase tracking-wider px-6 py-4 transition-all duration-300 text-center"
              >
                <FileText size={13} className="mr-2 text-cyan-400/70" />
                Resume
              </a>
            </div>

            {/* System Info Bar */}
            <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/[0.05] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4 text-slate-500 justify-start">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={18} />
                </a>
              </div>
              <div className="grid grid-cols-3 gap-6 font-mono text-[8px] uppercase tracking-widest text-slate-500 dark:text-slate-500">
                <div>
                  <span className="block text-[10px] font-bold text-slate-800 dark:text-slate-300">FastAPI</span>
                  <span>Backend</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-800 dark:text-slate-300">Playwright</span>
                  <span>Automation</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-800 dark:text-slate-300">300+</span>
                  <span>DSA Solved</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
