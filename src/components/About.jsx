import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const About = () => {
  const { basicInfo, education } = portfolioData;

  return (
    <section id="about" className="section-band py-24">
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
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-xl font-display text-white mb-4">Education</h3>
              <div className="flex flex-col gap-1 border-l-2 border-primary/50 pl-4">
                <span className="text-white font-medium">{education.degree} in {education.branch}</span>
                <span className="text-primary font-mono text-sm">{education.college}</span>
                <span className="text-gray-500 font-mono text-xs">{education.startYear} - {education.graduationYear} | CGPA: {education.cgpa}</span>
              </div>
            </div>
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
          
          <div className="relative glass-panel rounded-xl p-8 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <span className="font-mono text-sm text-primary tracking-wider uppercase">Live Status</span>
            </div>
            
            <h3 className="text-xl font-display font-semibold mb-3 text-white">Current Focus</h3>
            <p className="text-gray-400 font-mono text-sm border-l-2 border-slate-600 pl-4 py-2 leading-relaxed">
              "Building scalable machine learning pipelines & developing full-stack AI applications."
            </p>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-gray-500 text-sm font-mono">
              <Activity size={18} className="text-primary" />
              <span>System functioning at optimal parameters.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
