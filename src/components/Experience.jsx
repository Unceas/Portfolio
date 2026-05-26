import { motion } from 'framer-motion';
import { Briefcase, Terminal, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Experience = () => {
  const { experience } = portfolioData;
  const exp = experience[0]; // Spotlight the main internship

  return (
    <section id="experience" className="section-band py-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.02),transparent_50%)] pointer-events-none" />

      <div className="mb-16 max-w-4xl">
        <h2 className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
          Career Foundations
        </h2>
        <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4 text-white">
          Professional Experience
        </h3>
        <p className="text-gray-400 font-sans text-lg max-w-2xl leading-relaxed">
          Applying computer science fundamentals, backend automation, and structured testing in active software engineering environments.
        </p>
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-white/5 bg-[#0a0a0a]/40 rounded-xl p-8 lg:p-10 hover:border-white/10 transition-colors"
        >
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-cyan-400 mt-1">
                <Briefcase size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-display font-medium text-white">{exp.role}</h4>
                <p className="text-gray-400 font-mono text-sm mt-1">{exp.company}</p>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <span className="text-xs font-mono tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full self-start md:self-auto">
                {exp.duration}
              </span>
              <span className="text-xs text-gray-500 font-mono">REMOTE / INTERNSHIP</span>
            </div>
          </div>

          {/* Details & Bullet Points */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h5 className="text-xs font-mono tracking-wider text-gray-400 uppercase">Core Responsibilities & Impact</h5>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Designed and built Python automation scripts for data harvesting, formatting, and analysis, standardizing custom ingestion formats.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Developed mock REST APIs using FastAPI, establishing robust schemas with Pydantic for validation and testing integrations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Employed clean git structures and modular software design patterns to ensure developer team alignment and software extensibility.
                  </span>
                </li>
              </ul>
            </div>

            {/* Architecture Focus Box */}
            <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
                  <Terminal size={14} />
                  <span>SYSTEM FOCUS</span>
                </div>
                <h5 className="text-white font-display font-medium text-base mb-2">Backend & Scripting Architecture</h5>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Focused on building clean pipeline processes, handling stream payloads efficiently, and practicing asynchronous processing paradigms.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {['Python', 'FastAPI', 'Pandas', 'REST APIs', 'Git'].map(tech => (
                  <span key={tech} className="px-2 py-1 text-[10px] font-mono text-gray-400 bg-white/5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
