import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const systems = [
  {
    id: 'multi-agent',
    label: 'Multi-Agent Systems',
    status: 'PROTOTYPING',
    desc: 'Coordination patterns, task decomposition, delegation, and recovery across cooperative agent runs.',
    x: 76,
    y: 88,
  },
  {
    id: 'orchestration',
    label: 'AI Orchestration',
    status: 'ACTIVE',
    desc: 'Pipeline controllers that connect planning, tools, memory, retries, and final artifact generation.',
    x: 224,
    y: 68,
  },
  {
    id: 'backend-scale',
    label: 'Backend Scalability',
    status: 'PROFILING',
    desc: 'Async APIs, queues, cache strategy, connection pooling, and throughput boundaries for service-heavy systems.',
    x: 340,
    y: 162,
  },
  {
    id: 'llm-infra',
    label: 'LLM Infrastructure',
    status: 'BENCHMARKING',
    desc: 'Structured outputs, routing, prompt caching, observability, and model behavior evaluation.',
    x: 128,
    y: 218,
  },
  {
    id: 'automation',
    label: 'Workflow Automation',
    status: 'BUILDING',
    desc: 'Browser automation, tool-calling layers, execution sandboxes, and state-aware command flows.',
    x: 286,
    y: 292,
  },
  {
    id: 'memory',
    label: 'Memory-Aware Agents',
    status: 'RESEARCHING',
    desc: 'Context persistence, episodic traces, retrieval-backed planning, and long-running task continuity.',
    x: 96,
    y: 346,
  },
];

const edges = [
  ['multi-agent', 'orchestration'],
  ['orchestration', 'backend-scale'],
  ['orchestration', 'llm-infra'],
  ['backend-scale', 'automation'],
  ['llm-infra', 'memory'],
  ['memory', 'automation'],
  ['multi-agent', 'memory'],
];

const getNode = (id) => systems.find((system) => system.id === id);

const SystemClusterMap = ({ activeId, setActiveId }) => {
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      setPulses((current) => [...current.slice(-5), {
        id: Date.now() + Math.random(),
        from: edge[0],
        to: edge[1],
        progress: 0,
      }]);
    }, 900);
    const frameTimer = setInterval(() => {
      setPulses((current) => current
        .map((pulse) => ({ ...pulse, progress: pulse.progress + 0.04 }))
        .filter((pulse) => pulse.progress < 1));
    }, 32);
    return () => {
      clearInterval(pulseTimer);
      clearInterval(frameTimer);
    };
  }, []);

  return (
    <svg viewBox="0 0 420 420" className="w-full" role="img" aria-label="Systems currently exploring cluster map">
      {edges.map(([fromId, toId]) => {
        const from = getNode(fromId);
        const to = getNode(toId);
        const related = activeId && (activeId === fromId || activeId === toId);
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={related ? 'rgba(103,232,249,0.42)' : 'rgba(100,116,139,0.18)'}
            strokeWidth={related ? 1.5 : 1}
            strokeDasharray="4 7"
          />
        );
      })}

      {pulses.map((pulse) => {
        const from = getNode(pulse.from);
        const to = getNode(pulse.to);
        if (!from || !to) return null;
        const x = from.x + (to.x - from.x) * pulse.progress;
        const y = from.y + (to.y - from.y) * pulse.progress;
        return <circle key={pulse.id} cx={x} cy={y} r="2.2" fill="rgba(103,232,249,0.68)" opacity={1 - pulse.progress * 0.65} />;
      })}

      {systems.map((system) => {
        const active = activeId === system.id;
        return (
          <g key={system.id} role="button" tabIndex="0" onClick={() => setActiveId(active ? null : system.id)} className="cursor-pointer">
            <circle cx={system.x} cy={system.y} r={active ? 28 : 23} fill={active ? 'rgba(103,232,249,0.08)' : 'rgba(148,163,184,0.025)'} className="transition-all duration-300" />
            <circle cx={system.x} cy={system.y} r="14" fill="rgb(var(--color-surface))" stroke={active ? 'rgba(103,232,249,0.76)' : 'rgba(148,163,184,0.38)'} strokeWidth={active ? 1.5 : 1} className="transition-all duration-300" />
            <circle cx={system.x + 9} cy={system.y - 9} r="3" fill="rgba(103,232,249,0.65)" />
            <text x={system.x} y={system.y + 32} textAnchor="middle" style={{ fontSize: 8, fill: active ? 'var(--page-ink)' : 'var(--page-muted)', fontFamily: 'monospace' }}>
              {system.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const CurrentlyExploring = () => {
  const [activeId, setActiveId] = useState('orchestration');
  const activeSystem = systems.find((system) => system.id === activeId);

  return (
    <section id="exploring" className="section-band relative py-16 md:py-24 lg:py-32">
      <div className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-cyan-400/[0.025] blur-3xl" />

      <div className="mb-14 max-w-3xl">
        <h2 className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/60" />
          Active Research Map
        </h2>
        <h3 className="mb-4 font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
          Systems Currently Exploring
        </h3>
        <p className="max-w-lg text-sm leading-7 text-slate-500">
          A connected view of the engineering areas shaping the next layer of agentic systems work.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/[0.06] bg-[#050607] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.32)]"
        >
          <div className="mb-2 flex items-center justify-between border-b border-white/[0.05] pb-3 font-mono text-[9px] uppercase tracking-widest text-slate-600">
            <span>SYSTEM_CLUSTER_MAP</span>
            <span>{systems.length} NODES / {edges.length} EDGES</span>
          </div>
          <SystemClusterMap activeId={activeId} setActiveId={setActiveId} />
        </motion.div>

        <div className="space-y-3">
          <motion.div
            key={activeId || 'idle'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-h-44 border border-white/[0.06] bg-[#050607] p-6"
          >
            {activeSystem ? (
              <>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="border border-cyan-300/[0.12] bg-cyan-300/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-200/65">
                    {activeSystem.status}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-700">
                    SYS_{activeSystem.id.replace('-', '_')}
                  </span>
                </div>
                <h4 className="mb-3 font-display text-xl font-medium text-white">{activeSystem.label}</h4>
                <p className="text-sm leading-7 text-slate-500">{activeSystem.desc}</p>
              </>
            ) : (
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-700">Select a node to inspect.</p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {systems.map((system, index) => (
              <motion.button
                type="button"
                key={system.id}
                onClick={() => setActiveId(activeId === system.id ? null : system.id)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.35 }}
                aria-pressed={activeId === system.id}
                className={`relative border p-3 text-left transition-all duration-200 ${
                  activeId === system.id
                    ? 'border-cyan-300/35 bg-cyan-300/[0.055] shadow-[inset_3px_0_0_rgba(103,232,249,0.8),0_0_0_1px_rgba(103,232,249,0.04)]'
                    : 'border-white/[0.05] bg-[#060708] hover:border-white/[0.12] hover:bg-white/[0.025]'
                }`}
              >
                <span className="mb-1 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-widest">
                  <span className={activeId === system.id ? 'text-cyan-200/75' : 'text-slate-600'}>{system.status}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${activeId === system.id ? 'bg-cyan-200' : 'bg-white/10'}`} />
                </span>
                <span className={`block text-xs leading-snug ${activeId === system.id ? 'text-white' : 'text-slate-400'}`}>
                  {system.label}
                </span>
                {activeId === system.id && (
                  <span className="mt-2 block font-mono text-[8px] uppercase tracking-widest text-cyan-200/55">
                    Selected
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyExploring;
