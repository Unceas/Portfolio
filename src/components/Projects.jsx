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

const ARCHITECTURE_FLOWS = {
  insightgrid: [
    { label: 'Dataset Upload', sub: 'CSV / Excel Ingestion', details: 'Validates schema types, handles null values, parses rows, and prepares data structures for processing.' },
    { label: 'Automated Pipeline', sub: 'Feature Scaling & Encoding', details: 'Performs standard scaling, category encoding, and formats matrices for model input layers.' },
    { label: 'ML Training Engine', sub: 'Supervised Diagnostics', details: 'Fits Random Forest Classifiers and outputs Gini importance attributions for diagnostic analysis.' },
    { label: 'Anomaly Detection', sub: 'Isolation Forest Outlier Scan', details: 'Sweeps the data matrix to score anomalies and flags outlier rows for operations telemetry.' },
    { label: 'LLM Insight Layer', sub: 'Groq LLaMA 3.1 Reasoning', details: 'Generates natural language summaries and operational recommendations based on output model statistics.' },
    { label: 'Analytics Dashboard', sub: 'UI Component Rendering', details: 'Plots Pearson correlation heatmaps, PDFs, and pipeline runs on the interactive React frontend.' }
  ],
  'ai-agent-workflow': [
    { label: 'Goal Decomposition', sub: 'Context Planning', details: 'Translates high-level user instructions into a discrete list of system tasks and execution plans.' },
    { label: 'System Orchestrator', sub: 'Recovery Engine', details: 'Controls main task loops, handles unexpected failures, and schedules sub-processes.' },
    { label: 'DOM Parser', sub: 'Interactive Element Scraper', details: 'Scans active tab browser viewports to extract valid interactive CSS selectors and structural tags.' },
    { label: 'Playwright Sandbox', sub: 'Browser Action Executor', details: 'Invokes headless navigation processes to click buttons, input values, and scrape raw data.' },
    { label: 'Episodic Memory', sub: 'State Persistence Store', details: 'Retains cookies, headers, and historical action traces across multi-step automation flows.' },
    { label: 'Artifact Writer', sub: 'Output Compilation', details: 'Saves collected screenshots, scraped records, and execution logs to disk storage.' }
  ],
  'hybrid-sorting-benchmark': [
    { label: 'C++ Benchmarking Kernels', sub: 'Native Execution', details: 'High-efficiency benchmark sorting operations written in modern C++.' },
    { label: 'Dataset Generator', sub: 'Distribution Modeler', details: 'Configures custom arrays matching random, sorted, and reversed distributions to test execution extremes.' },
    { label: 'Adaptive Sorting', sub: 'Hybrid Insertion Threshold', details: 'Uses Merge Sort for large lists, shifting to Insertion Sort when partitions drop below the threshold limit.' },
    { label: 'IntroSort Shield', sub: 'Depth Limit Heapify', details: 'Tracks QuickSort recursion depth. Switches to HeapSort if stack depth exceeds 2 * log2(N) to guarantee O(N log N) worst case.' },
    { label: 'Telemetry Engine', sub: 'Resource Profiler', details: 'Calculates exact comparison counts, array swaps, and CPU execution time metrics in milliseconds.' },
    { label: 'Python Plotter', sub: 'Visualization Bridge', details: 'Reads generated JSON telemetry output files and plots scalability charts using Matplotlib.' }
  ]
};

const Projects = () => {
  const { projects, miniProjects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);
  const [miniExpanded, setMiniExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('architecture');
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      setActiveTab('architecture');
      setActiveNode(0);
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="section-band relative py-16 md:py-24 lg:py-32">
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
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/[0.03] bg-[#050607]/40 p-6 md:p-8 rounded-2xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Visualizer Column */}
                <div className={`lg:col-span-6 w-full h-[320px] md:h-[380px] rounded-xl overflow-hidden border border-white/[0.06] bg-[#070809] flex flex-col justify-between theme-dark-visual order-1`}>
                  {visualizerMap[project.id] || <div className="p-6 font-mono text-[10px] text-slate-600">SYSTEM VISUALIZER</div>}
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-6 flex flex-col justify-center order-2 ${reverse ? 'lg:pl-8' : 'lg:pr-8'}`}>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/70 mb-3">{project.systemType}</span>
                  <h4 className="text-2xl font-display font-medium tracking-tight text-white mb-4">{project.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-400 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-slate-400">{tech}</span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 border border-white/[0.08] hover:border-cyan-300/40 bg-white/[0.03] hover:bg-cyan-500/5 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-white transition-all duration-300"
                    >
                      <Terminal size={14} className="text-cyan-300/70" />
                      Inspect Architecture
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 hover:text-white text-slate-400 font-mono text-xs uppercase tracking-wider transition-colors duration-300 py-2"
                      >
                        {project.github.includes('github.com') ? 'Repository' : 'Live System'} <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
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
                    Project Analysis Console
                  </div>
                  <button type="button" onClick={() => setSelectedProject(null)} className="p-1.5 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white" aria-label="Close modal">
                    <X size={16} />
                  </button>
                </div>

                <div className="overflow-y-auto p-6 sm:p-8">
                  <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-widest text-cyan-300/60">{selectedProject.systemType}</span>
                  <h3 className="mb-3 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">{selectedProject.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500">{selectedProject.description}</p>

                  {/* Tabs Header */}
                  <div className="flex border-b border-white/[0.06] mb-6 font-mono text-[10px] uppercase tracking-widest">
                    <button
                      type="button"
                      onClick={() => setActiveTab('architecture')}
                      className={`px-4 py-2 border-b-2 transition-all ${
                        activeTab === 'architecture'
                          ? 'border-cyan-400 text-cyan-300'
                          : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Architecture
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('decisions')}
                      className={`px-4 py-2 border-b-2 transition-all ${
                        activeTab === 'decisions'
                          ? 'border-cyan-400 text-cyan-300'
                          : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Decisions
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('specs')}
                      className={`px-4 py-2 border-b-2 transition-all ${
                        activeTab === 'specs'
                          ? 'border-cyan-400 text-cyan-300'
                          : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Specifications
                    </button>
                  </div>

                  {/* Tab Contents */}
                  {activeTab === 'architecture' && (
                    <div className="grid gap-6 md:grid-cols-12">
                      {/* Flow Node Chain */}
                      <div className="md:col-span-7 space-y-3 relative pl-4 border-l border-white/[0.06] ml-2">
                        {(ARCHITECTURE_FLOWS[selectedProject.id] || []).map((node, i) => (
                          <div key={node.label} className="relative">
                            <button
                              type="button"
                              onClick={() => setActiveNode(i)}
                              className={`absolute -left-[21px] top-4 h-2.5 w-2.5 rounded-full border transition-all ${
                                activeNode === i
                                  ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                                  : 'bg-[#070809] border-white/20 hover:border-cyan-400'
                              }`}
                            />
                            
                            <button
                              type="button"
                              onClick={() => setActiveNode(i)}
                              className={`w-full text-left p-3 rounded-lg border transition-all ${
                                activeNode === i
                                  ? 'bg-white/[0.02] border-cyan-500/30'
                                  : 'bg-[#070809]/50 border-white/[0.04] hover:bg-white/[0.01]'
                              }`}
                            >
                              <div className="flex justify-between items-center gap-2">
                                <span className="font-display text-xs font-medium text-white">{node.label}</span>
                                <span className="font-mono text-[9px] text-slate-500 uppercase">Step 0{i + 1}</span>
                              </div>
                              <div className="font-mono text-[9px] text-cyan-400/60 mt-0.5">{node.sub}</div>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Telemetry Detail Box */}
                      <div className="md:col-span-5 flex flex-col justify-between">
                        <div className="border border-white/[0.06] bg-black/45 rounded-xl p-5 font-mono text-[11px] leading-relaxed text-slate-400 h-full flex flex-col justify-between min-h-[220px]">
                          <div>
                            <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-slate-500 border-b border-white/[0.05] pb-2 mb-4">
                              <span>Subsystem telemetry</span>
                              <span className="text-cyan-400 animate-pulse">active</span>
                            </div>
                            <h5 className="font-display text-sm font-semibold text-white mb-1">
                              {(ARCHITECTURE_FLOWS[selectedProject.id] || [])[activeNode]?.label}
                            </h5>
                            <div className="text-[9px] text-cyan-400/80 uppercase tracking-wider mb-3">
                              {(ARCHITECTURE_FLOWS[selectedProject.id] || [])[activeNode]?.sub}
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed font-sans">
                              {(ARCHITECTURE_FLOWS[selectedProject.id] || [])[activeNode]?.details}
                            </p>
                          </div>
                          <div className="border-t border-white/[0.05] pt-4 mt-6 text-[9px] text-slate-600">
                            <div>TRACE_ID: 0x{((activeNode + 1) * 3421).toString(16).toUpperCase()}</div>
                            <div>STATUS: COMPILATION_SUCCESS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'decisions' && selectedProject.engineeringDecisions && (
                    <div className="space-y-5 font-mono text-xs">
                      <div>
                        <h5 className="text-[10px] uppercase tracking-widest text-cyan-300/80 mb-1.5 flex items-center gap-2">
                          <span className="text-cyan-400/50">&gt;</span> Why I Built It
                        </h5>
                        <p className="font-sans text-xs leading-relaxed text-slate-400 bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg">
                          {selectedProject.engineeringDecisions.whyBuilt}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="text-[10px] uppercase tracking-widest text-amber-300/80 mb-1.5 flex items-center gap-2">
                          <span className="text-amber-400/50">&gt;</span> Biggest Challenge
                        </h5>
                        <p className="font-sans text-xs leading-relaxed text-slate-400 bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg">
                          {selectedProject.engineeringDecisions.biggestChallenge}
                        </p>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <h5 className="text-[10px] uppercase tracking-widest text-blue-300/80 mb-1.5 flex items-center gap-2">
                            <span className="text-blue-400/50">&gt;</span> Trade-offs
                          </h5>
                          <p className="font-sans text-xs leading-relaxed text-slate-400 bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg h-full">
                            {selectedProject.engineeringDecisions.tradeOffs}
                          </p>
                        </div>

                        <div>
                          <h5 className="text-[10px] uppercase tracking-widest text-emerald-300/80 mb-1.5 flex items-center gap-2">
                            <span className="text-emerald-400/50">&gt;</span> Future Improvements
                          </h5>
                          <p className="font-sans text-xs leading-relaxed text-slate-400 bg-white/[0.01] border border-white/[0.03] p-3 rounded-lg h-full">
                            {selectedProject.engineeringDecisions.futureImprovements}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid gap-8 border-t border-white/[0.06] pt-6 md:grid-cols-2">
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
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] bg-black/25 px-5 py-4">
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/[0.06] bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-white/[0.06]">
                    {selectedProject.github.includes('github.com') ? (
                      <>
                        <FiGithub size={14} />
                        Repository
                      </>
                    ) : (
                      <>
                        <ExternalLink size={14} />
                        Live System
                      </>
                    )}
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
