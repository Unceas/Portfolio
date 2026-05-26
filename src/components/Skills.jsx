import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Server, Layout, Database, Cloud, BookOpen } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const iconMap = {
  aiml: <Brain size={22} className="text-cyan-400" />,
  languages: <Code2 size={22} className="text-slate-300" />,
  backend: <Server size={22} className="text-blue-400" />,
  frontend: <Layout size={22} className="text-slate-400" />,
  databases: <Database size={22} className="text-emerald-400" />,
  devops: <Cloud size={22} className="text-amber-400" />,
  fundamentals: <BookOpen size={22} className="text-cyan-200" />
};

const titleMap = {
  aiml: 'AI & Machine Learning',
  languages: 'Languages',
  backend: 'Backend & APIs',
  frontend: 'Frontend',
  databases: 'Databases',
  devops: 'Cloud & DevOps',
  fundamentals: 'Core CS'
};

const colSpanMap = {
  aiml: 'md:col-span-2 md:row-span-2',
  languages: 'md:col-span-1 md:row-span-1',
  backend: 'md:col-span-1 md:row-span-1',
  databases: 'md:col-span-1 md:row-span-1',
  frontend: 'md:col-span-1 md:row-span-1',
  fundamentals: 'md:col-span-2 md:row-span-1',
  devops: 'md:col-span-2 md:row-span-1'
};

const SkillCard = ({ title, icon, skills, colSpan, index }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/10 group ${colSpan} flex flex-col justify-between`}
    >
      {/* Dynamic Cursor Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--card-glow), transparent 45%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 group-hover:border-white/15 transition-colors">
            {icon}
          </div>
          <h3 className="text-lg font-display font-medium text-white tracking-wide">{title}</h3>
        </div>
        
        {/* Skill Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-xs font-mono text-gray-400 bg-white/[0.02] border border-white/5 rounded-md transition-all duration-300 group-hover:border-white/10 group-hover:text-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { skills } = portfolioData;

  // We want to preserve a specific order:
  // Row 1: aiml (cols 1-2, rows 1-2), languages (col 3), backend (col 4)
  // Row 2: databases (col 3), frontend (col 4)
  // Row 3: fundamentals (cols 1-2), devops (cols 3-4)
  const orderKeys = ['aiml', 'languages', 'backend', 'databases', 'frontend', 'fundamentals', 'devops'];

  const skillsList = orderKeys.map(key => ({
    id: key,
    title: titleMap[key],
    icon: iconMap[key],
    skills: skills[key] || [],
    colSpan: colSpanMap[key] || 'md:col-span-1 md:row-span-1'
  }));

  return (
    <section id="skills" className="section-band py-16 md:py-24 lg:py-28 relative">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

      <div className="mb-16 max-w-4xl">
        <h2 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
          Technical Stack
        </h2>
        <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4 text-white">
          Architectural Arsenal & Capabilities
        </h3>
        <p className="text-gray-400 font-sans text-lg max-w-2xl leading-relaxed">
          Robust tech foundations optimized for machine learning inference, automated agent execution, and scalable backend infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-min md:auto-rows-[160px] relative z-10">
        {skillsList.map((data, index) => (
          <SkillCard key={data.id} {...data} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
