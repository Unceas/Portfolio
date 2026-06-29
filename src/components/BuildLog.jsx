import { motion } from 'framer-motion';
import { BookOpen, Cpu, Briefcase, Rocket, ArrowDown } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const iconMap = {
  academic: <BookOpen size={16} className="text-cyan-400" />,
  project: <Cpu size={16} className="text-blue-400" />,
  internship: <Briefcase size={16} className="text-emerald-400" />,
  launch: <Rocket size={16} className="text-amber-400" />,
};

const BuildLog = () => {
  const { buildLog } = portfolioData;

  return (
    <section id="build-log" className="section-band py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.02),transparent_50%)] pointer-events-none" />

      <div className="mb-16 max-w-4xl">
        <h2 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
          Chronological Trace
        </h2>
        <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4 text-white">
          System Build Log
        </h3>
        <p className="text-gray-400 font-sans text-lg max-w-2xl leading-relaxed">
          A personal timeline of academic milestones, system engineering iterations, and software integrations.
        </p>
      </div>

      <div className="relative max-w-3xl ml-4 sm:ml-8 border-l border-white/[0.08] pl-8 sm:pl-10 space-y-12">
        {buildLog.map((log, index) => {
          const isLast = index === buildLog.length - 1;
          return (
            <div key={log.title} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[49px] sm:-left-[57px] top-1 z-10 flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-[#070809] rounded-lg shadow-md group-hover:border-cyan-300/35 transition-colors">
                {iconMap[log.type] || <Cpu size={16} />}
              </div>

              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/5 bg-[#0a0a0a]/40 rounded-xl p-6 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="font-mono text-lg font-semibold text-cyan-400">{log.year}</span>
                  <h4 className="text-lg font-display font-medium text-white">{log.title}</h4>
                  <span className="text-xs font-mono text-slate-500">/ {log.subtitle}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{log.details}</p>
              </motion.div>

              {/* Downward connecting arrow link */}
              {!isLast && (
                <div className="absolute -left-[41px] sm:-left-[49px] -bottom-[32px] text-white/[0.07] group-hover:text-cyan-400/20 transition-colors pointer-events-none">
                  <ArrowDown size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BuildLog;
