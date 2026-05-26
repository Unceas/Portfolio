import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowUpRight, Code, ExternalLink, Terminal, X } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import portfolioData from '../data/portfolio.json';
import {
  AIAgentWorkflowVisualizer,
  HybridSortingBenchmarkVisualizer,
  InsightGridVisualizer,
} from './ProjectVisuals';

const visualizerMap = {
  insightgrid: <InsightGridVisualizer />,
  'ai-agent-workflow': <AIAgentWorkflowVisualizer />,
  'hybrid-sorting-benchmark': <HybridSortingBenchmarkVisualizer />,
};

const Projects = () => {
  const { projects, miniProjects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);
  const [miniExpanded, setMiniExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="section-band relative py-24 md:py-32">
      <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-cyan-400/[0.025] blur-3xl" />

      <div className="mb-16 max-w-3xl">
        <h2 className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/60" />
          Production Engineering
        </h2>
        <h3 className="mb-4 font-display text-3xl font-medium tracking-tight text-white md:text-5xl">
          Featured Systems
        </h3>
        <p className="max-w-2xl text-base leading-7 text-slate-500">
          Product-style builds focused on orchestration, observability, model behavior, and computational performance.
        </p>
      </div>

      <motion.div layout className="space-y-12">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid items-center gap-8 border border-white/[0.07] bg-[#050607]/75 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)] transition-colors hover:border-white/[0.11] sm:p-7 lg:grid-cols-12 lg:gap-12 lg:p-8"
              >
                <div className={`lg:col-span-5 ${reverse ? 'lg:order-last' : ''}`}>
                  <span className="mb-5 inline-flex border border-cyan-300/[0.12] bg-cyan-300/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-200/70">
                    {project.systemType}
                  </span>
                  <h4 className="mb-5 font-display text-2xl font-medium leading-tight tracking-tight text-white md:text-4xl">
                    {project.title}
                  </h4>
                  <p className="mb-6 text-sm leading-7 text-slate-500">
                    {project.description}
                  </p>

                  <div className="mb-6 border-l border-white/[0.07] pl-4">
                    <h5 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-600">Architecture Highlights</h5>
                    <div className="space-y-2">
                      {project.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex gap-2 text-xs leading-relaxed text-slate-500">
                          <span className="mt-0.5 text-cyan-300/60">&gt;</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-7 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 font-mono text-[10px] text-slate-500">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 border-t border-white/[0.05] pt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="font-mono text-xs uppercase tracking-wider text-white transition-colors hover:text-cyan-200"
                    >
                      Inspect Architecture
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-200"
                    >
                      <FiGithub size={13} />
                      Repo
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="theme-dark-visual border border-white/[0.08] bg-black/30 p-2 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
                    <div className="aspect-[16/10] overflow-hidden border border-white/[0.05] bg-black">
                      {visualizerMap[project.id]}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div className="mt-20 border-t border-white/[0.05] pt-9">
        <button
          type="button"
          onClick={() => setMiniExpanded((value) => !value)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
            Auxiliary Experiments / {miniProjects.length}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            {miniExpanded ? 'Collapse' : 'Expand'}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {miniExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {miniProjects.map((project) => (
                  <div key={project.id} className="border border-white/[0.05] bg-[#060708] p-5 transition-colors hover:border-white/[0.1]">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h5 className="font-display text-base font-medium text-white">{project.title}</h5>
                      <a href={project.github} target="_blank" rel="noreferrer" className="shrink-0 text-slate-600 hover:text-slate-300" aria-label={`${project.title} repo`}>
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                    <p className="mb-4 text-xs leading-6 text-slate-500">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="border border-white/[0.05] px-2 py-0.5 font-mono text-[9px] text-slate-600">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.button
              type="button"
              aria-label="Close project details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md"
            />
            <div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden border border-white/[0.1] bg-[#070809] shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-black/30 px-5 py-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    <Terminal size={13} className="text-cyan-300/65" />
                    Project Architecture
                  </div>
                  <button type="button" onClick={() => setSelectedProject(null)} className="p-1.5 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white" aria-label="Close modal">
                    <X size={16} />
                  </button>
                </div>

                <div className="overflow-y-auto p-6 sm:p-8">
                  <span className="mb-4 inline-block font-mono text-[10px] uppercase tracking-widest text-cyan-300/60">{selectedProject.systemType}</span>
                  <h3 className="mb-4 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">{selectedProject.title}</h3>
                  <p className="mb-8 text-sm leading-7 text-slate-500">{selectedProject.description}</p>

                  <div className="grid gap-8 border-t border-white/[0.06] pt-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300/65">
                        <Code size={12} />
                        System Decisions
                      </h4>
                      <ul className="space-y-3 text-xs leading-relaxed text-slate-500">
                        {selectedProject.features.map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span className="text-cyan-300/55">&gt;</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-blue-200/60">
                        <Activity size={12} />
                        Build Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech) => (
                          <span key={tech} className="border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] text-slate-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-7 border border-white/[0.05] bg-black/35 p-4 font-mono text-[10px] leading-6 text-slate-600">
                        <div>DESIGN MODE: modular</div>
                        <div>TRACEABILITY: enabled</div>
                        <div>SCALABILITY: pipeline-oriented</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-black/25 px-5 py-4">
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/[0.06] bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-white/[0.06]">
                    <FiGithub size={14} />
                    Repository
                  </a>
                  {selectedProject.demo !== '#' && (
                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-black transition-colors hover:bg-slate-200">
                      Live System <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
