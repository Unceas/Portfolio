import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const About = () => {
  const { basicInfo, liveStatus } = portfolioData;

  return (
    <section id="about" className="section-band py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Intro */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 flex items-center gap-3">
            <span className="text-primary font-mono text-xl">01.</span> About Me
          </h2>
          <div className="space-y-4 text-gray-400 leading-relaxed font-sans text-lg">
            <p>{basicInfo.shortBio}</p>
          </div>
        </motion.div>

        {/* Right Column: Live Status Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group lg:ml-auto w-full max-w-md"
        >
          <div className="absolute -inset-1 bg-cyan-300/[0.025] blur-2xl opacity-80 transition duration-1000"></div>
          
          <div className="relative glass-panel rounded-xl p-8 h-full flex flex-col justify-center border border-white/[0.05] bg-[#050607]/80 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-200/70">System Status</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                {liveStatus.status}
              </span>
            </div>
            
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-start justify-between py-1.5 border-b border-white/[0.03]">
                <span className="text-slate-500 uppercase tracking-wider">Current Focus</span>
                <span className="text-slate-200 text-right font-medium max-w-[60%]">{liveStatus.currentFocus}</span>
              </div>
              <div className="flex items-start justify-between py-1.5 border-b border-white/[0.03]">
                <span className="text-slate-500 uppercase tracking-wider">Reading</span>
                <span className="text-slate-200 text-right font-medium max-w-[60%]">{liveStatus.reading}</span>
              </div>
              <div className="flex items-start justify-between py-1.5 border-b border-white/[0.03]">
                <span className="text-slate-500 uppercase tracking-wider">Latest Project</span>
                <span className="text-slate-200 text-right font-medium max-w-[60%]">{liveStatus.latestProject}</span>
              </div>
              <div className="flex items-start justify-between py-1.5 border-b border-white/[0.03]">
                <span className="text-slate-500 uppercase tracking-wider">Repositories</span>
                <span className="text-slate-200 text-right font-medium max-w-[60%]">{liveStatus.repositories}</span>
              </div>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-slate-600 text-[10px] font-mono">
              <Activity size={13} className="text-cyan-400/80" />
              <span>System functioning at optimal parameters.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
