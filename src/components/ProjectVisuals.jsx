import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, RotateCcw } from 'lucide-react';

const INSIGHTGRID_INSIGHTS = [
  'Demand is tracking 11.8% above baseline.',
  'Anomaly score crossed threshold on segment B.',
  'Forecast confidence stabilized at 88.4%.',
  'Feature correlation changed in the last ingest window.',
];

const SORT_INITIAL = [62, 34, 88, 17, 75, 45, 92, 28, 56, 40];

const Panel = ({ children, label, status = 'LIVE' }) => (
  <div className="theme-dark-visual relative h-full w-full overflow-hidden bg-[#040506] p-4 font-mono text-[11px] text-slate-500">
    <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.025)_1px,transparent_1px)] bg-[size:14px_14px]" />
    <div className="relative z-10 mb-3 flex items-center justify-between border-b border-white/[0.05] pb-2">
      <span className="text-[10px] uppercase tracking-widest text-slate-400">{label}</span>
      <span className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-cyan-300/60">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
        {status}
      </span>
    </div>
    <div className="relative z-10 h-[calc(100%-2rem)]">{children}</div>
  </div>
);

export const InsightGridVisualizer = () => {
  const [points, setPoints] = useState([34, 39, 42, 48, 45, 54, 62, 58, 69, 74, 71, 82]);
  const [alert, setAlert] = useState(false);
  const [insight, setInsight] = useState('Demand is tracking 11.8% above baseline.');

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((current) => {
        const next = [...current.slice(1)];
        const value = Math.max(22, Math.min(92, current[current.length - 1] + Math.random() * 14 - 5));
        next.push(value);
        setAlert(value > 78);
        return next;
      });
      setInsight(INSIGHTGRID_INSIGHTS[Math.floor(Math.random() * INSIGHTGRID_INSIGHTS.length)]);
    }, 1900);
    return () => clearInterval(timer);
  }, []);

  const width = 280;
  const height = 104;
  const path = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - (point / 100) * height;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <Panel label="InsightGrid / Observability" status={alert ? 'ANOMALY' : 'LIVE'}>
      <div className="grid h-full grid-rows-[1fr_auto] gap-3">
        <div className="grid grid-cols-[1.35fr_0.9fr] gap-3">
          <div className="border border-white/[0.05] bg-black/25 p-3">
            <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-widest">
              <span>Prediction Stream</span>
              <span className={alert ? 'text-red-300/75' : 'text-cyan-300/65'}>{alert ? 'outlier' : 'stable'}</span>
            </div>
            <svg viewBox={`0 0 ${width} ${height}`} className="h-[78%] w-full" preserveAspectRatio="none">
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" x2={width} y1={height - (y / 100) * height} y2={height - (y / 100) * height} stroke="rgba(255,255,255,0.05)" />
              ))}
              <path d={`${path} L ${width} ${height} L 0 ${height} Z`} fill={alert ? 'rgba(248,113,113,0.08)' : 'rgba(103,232,249,0.08)'} />
              <path d={path} fill="none" stroke={alert ? 'rgba(248,113,113,0.8)' : 'rgba(103,232,249,0.76)'} strokeWidth="1.8" />
              <path d="M205 38 L230 31 L255 36 L280 24" fill="none" stroke="rgba(191,219,254,0.42)" strokeDasharray="4 5" strokeWidth="1.3" />
              <line x1="205" x2="205" y1="0" y2={height} stroke="rgba(191,219,254,0.16)" strokeDasharray="3 5" />
              <circle cx={width} cy={height - (points[points.length - 1] / 100) * height} r="3" fill={alert ? '#f87171' : '#67e8f9'} />
            </svg>
          </div>

          <div className="grid gap-3">
            <div className="border border-white/[0.05] bg-black/25 p-3">
              <div className="mb-2 text-[9px] uppercase tracking-widest text-slate-600">AI Insights</div>
              <p className="text-[11px] leading-relaxed text-slate-300">{insight}</p>
            </div>
            <div className="border border-white/[0.05] bg-black/25 p-3">
              <div className="mb-2 text-[9px] uppercase tracking-widest text-slate-600">Ingest Health</div>
              <div className="space-y-2">
                {['CSV parser', 'Model route', 'Insight API'].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <span>{item}</span>
                    <Check size={11} className="text-emerald-300/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-[9px] uppercase tracking-widest">
          <span className="border border-white/[0.05] bg-black/25 p-2">Latency 142ms</span>
          <span className="border border-white/[0.05] bg-black/25 p-2">Confidence 88%</span>
          <span className="border border-white/[0.05] bg-black/25 p-2">Alerts {alert ? 1 : 0}</span>
        </div>
      </div>
    </Panel>
  );
};

export const AIAgentWorkflowVisualizer = () => {
  const [step, setStep] = useState(0);
  const nodes = [
    { id: 'plan', label: 'Planner', x: 72, y: 52 },
    { id: 'mem', label: 'Memory', x: 205, y: 48 },
    { id: 'browse', label: 'Browser', x: 55, y: 156 },
    { id: 'exec', label: 'Executor', x: 176, y: 150 },
    { id: 'api', label: 'API', x: 288, y: 166 },
    { id: 'result', label: 'Result', x: 190, y: 258 },
  ];
  const edges = [['plan', 'mem'], ['plan', 'browse'], ['browse', 'exec'], ['mem', 'exec'], ['exec', 'api'], ['api', 'result'], ['result', 'mem']];
  const logs = [
    'planner: decomposed request into 4 actions',
    'browser: loaded target page and parsed DOM',
    'memory: merged context with active run state',
    'executor: retry policy attached to action group',
    'api: POST /agent/run returned 200',
    'result: artifact cached with trace id',
  ];
  const get = (id) => nodes.find((node) => node.id === id);

  useEffect(() => {
    const timer = setInterval(() => setStep((current) => (current + 1) % nodes.length), 1500);
    return () => clearInterval(timer);
  }, [nodes.length]);

  return (
    <Panel label="Agent Runtime / Browser Automation">
      <div className="grid h-full grid-cols-[1fr_0.72fr] gap-3">
        <div className="border border-white/[0.05] bg-black/25 p-2">
          <svg viewBox="0 0 340 310" className="h-full w-full">
            {edges.map(([fromId, toId], index) => {
              const from = get(fromId);
              const to = get(toId);
              const active = index === step || index === (step + 1) % edges.length;
              return (
                <line key={`${fromId}-${toId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={active ? 'rgba(103,232,249,0.48)' : 'rgba(100,116,139,0.22)'} strokeWidth={active ? 1.5 : 1} strokeDasharray={active ? '0' : '4 7'} />
              );
            })}
            {edges.map(([fromId, toId], index) => {
              const from = get(fromId);
              const to = get(toId);
              const active = index === step;
              if (!active) return null;
              return (
                <motion.circle
                  key={`${fromId}-${toId}-pulse`}
                  r="3"
                  fill="rgba(103,232,249,0.82)"
                  initial={{ cx: from.x, cy: from.y }}
                  animate={{ cx: to.x, cy: to.y }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                />
              );
            })}
            {nodes.map((node, index) => {
              const active = index === step;
              const done = index < step;
              return (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r={active ? 25 : 20} fill={active ? 'rgba(103,232,249,0.08)' : 'rgba(148,163,184,0.025)'} />
                  <circle cx={node.x} cy={node.y} r="14" fill="#06080a" stroke={active ? 'rgba(103,232,249,0.75)' : done ? 'rgba(134,239,172,0.5)' : 'rgba(148,163,184,0.35)'} />
                  <text x={node.x} y={node.y + 32} textAnchor="middle" style={{ fontSize: 8, fill: 'rgba(226,232,240,0.78)', fontFamily: 'monospace' }}>{node.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-3">
          <div className="border border-white/[0.05] bg-black/25 p-3">
            <div className="mb-2 text-[9px] uppercase tracking-widest text-slate-600">Run State</div>
            <div className="text-slate-300">{nodes[step].label}</div>
            <div className="mt-1 text-[9px] uppercase tracking-widest text-cyan-300/55">executing</div>
          </div>
          <div className="overflow-hidden border border-white/[0.05] bg-black/25 p-3">
            <div className="mb-2 text-[9px] uppercase tracking-widest text-slate-600">Trace Log</div>
            <div className="space-y-2">
              {logs.slice(Math.max(0, step - 2), step + 1).map((log) => (
                <div key={log} className="truncate text-[10px] text-slate-500">{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

// HELPER: Hybrid Sort (Merge + Insertion) step generator
const generateHybridSortSteps = (arr) => {
  const steps = [];
  const tempArr = [...arr];
  let comp = 0;
  let swaps = 0;

  const insertionSort = (l, r) => {
    for (let i = l + 1; i <= r; i++) {
      const key = tempArr[i];
      let j = i - 1;
      while (j >= l && tempArr[j] > key) {
        comp++;
        swaps++;
        tempArr[j + 1] = tempArr[j];
        steps.push({
          array: [...tempArr],
          active: [j, j + 1],
          phase: 'INSERTION',
          message: `Insertion: shifting ${tempArr[j]} right (threshold size <= 4)`,
          comparisons: comp,
          swaps: swaps
        });
        j--;
      }
      tempArr[j + 1] = key;
      steps.push({
        array: [...tempArr],
        active: [j + 1],
        phase: 'INSERTION',
        message: `Insertion: placed key ${key}`,
        comparisons: comp,
        swaps: swaps
      });
    }
  };

  const merge = (l, m, r) => {
    const leftArr = tempArr.slice(l, m + 1);
    const rightArr = tempArr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < leftArr.length && j < rightArr.length) {
      comp++;
      steps.push({
        array: [...tempArr],
        active: [l + i, m + 1 + j],
        phase: 'MERGE',
        message: `Merge: comparing left segment and right segment`,
        comparisons: comp,
        swaps: swaps
      });
      if (leftArr[i] <= rightArr[j]) {
        tempArr[k] = leftArr[i];
        i++;
      } else {
        tempArr[k] = rightArr[j];
        j++;
      }
      k++;
      steps.push({
        array: [...tempArr],
        active: [k - 1],
        phase: 'MERGE',
        message: `Merge: wrote element to segment`,
        comparisons: comp,
        swaps: swaps
      });
    }
    while (i < leftArr.length) {
      tempArr[k] = leftArr[i];
      i++;
      k++;
      steps.push({
        array: [...tempArr],
        active: [k - 1],
        phase: 'MERGE',
        message: `Merge: flushed left segment elements`,
        comparisons: comp,
        swaps: swaps
      });
    }
    while (j < rightArr.length) {
      tempArr[k] = rightArr[j];
      j++;
      k++;
      steps.push({
        array: [...tempArr],
        active: [k - 1],
        phase: 'MERGE',
        message: `Merge: flushed right segment elements`,
        comparisons: comp,
        swaps: swaps
      });
    }
  };

  const sort = (l, r) => {
    if (l >= r) return;
    const size = r - l + 1;
    if (size <= 4) {
      insertionSort(l, r);
      return;
    }
    const m = Math.floor((l + r) / 2);
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  };

  sort(0, tempArr.length - 1);
  return steps;
};

// HELPER: IntroSort (Quick + Heap) step generator
const generateIntroSortSteps = (arr) => {
  const steps = [];
  const tempArr = [...arr];
  let comp = 0;
  let swaps = 0;

  const heapify = (n, i, start) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      comp++;
      steps.push({
        array: [...tempArr],
        active: [start + left, start + largest],
        phase: 'HEAPIFY',
        message: 'IntroSort: comparing left child node',
        comparisons: comp,
        swaps: swaps
      });
      if (tempArr[start + left] > tempArr[start + largest]) {
        largest = left;
      }
    }
    if (right < n) {
      comp++;
      steps.push({
        array: [...tempArr],
        active: [start + right, start + largest],
        phase: 'HEAPIFY',
        message: 'IntroSort: comparing right child node',
        comparisons: comp,
        swaps: swaps
      });
      if (tempArr[start + right] > tempArr[start + largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swaps++;
      const t = tempArr[start + i];
      tempArr[start + i] = tempArr[start + largest];
      tempArr[start + largest] = t;
      steps.push({
        array: [...tempArr],
        active: [start + i, start + largest],
        phase: 'HEAPIFY',
        message: 'IntroSort: swapping out-of-order heap nodes',
        comparisons: comp,
        swaps: swaps
      });
      heapify(n, largest, start);
    }
  };

  const heapSort = (l, r) => {
    const n = r - l + 1;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i, l);
    }
    for (let i = n - 1; i > 0; i--) {
      swaps++;
      const t = tempArr[l];
      tempArr[l] = tempArr[l + i];
      tempArr[l + i] = t;
      steps.push({
        array: [...tempArr],
        active: [l, l + i],
        phase: 'HEAPSORT',
        message: 'IntroSort: extracting heap maximum element',
        comparisons: comp,
        swaps: swaps
      });
      heapify(i, 0, l);
    }
  };

  const partition = (l, r) => {
    const pivot = tempArr[r];
    let i = l - 1;
    for (let j = l; j < r; j++) {
      comp++;
      steps.push({
        array: [...tempArr],
        active: [j, r],
        phase: 'PARTITION',
        message: `IntroSort: scanning pivot index (Pivot: ${pivot})`,
        comparisons: comp,
        swaps: swaps
      });
      if (tempArr[j] < pivot) {
        i++;
        swaps++;
        const t = tempArr[i];
        tempArr[i] = tempArr[j];
        tempArr[j] = t;
        steps.push({
          array: [...tempArr],
          active: [i, j],
          phase: 'PARTITION',
          message: `IntroSort: swapped ${tempArr[i]} and ${tempArr[j]} (< pivot)`,
          comparisons: comp,
          swaps: swaps
        });
      }
    }
    swaps++;
    const t = tempArr[i + 1];
    tempArr[i + 1] = tempArr[r];
    tempArr[r] = t;
    steps.push({
      array: [...tempArr],
      active: [i + 1, r],
      phase: 'PARTITION',
      message: `IntroSort: placed pivot at index ${i + 1}`,
      comparisons: comp,
      swaps: swaps
    });
    return i + 1;
  };

  const sort = (l, r, depthLimit) => {
    if (l >= r) return;
    if (depthLimit === 0) {
      steps.push({
        array: [...tempArr],
        active: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
        phase: 'SHIELD_ACTIVE',
        message: `IntroSort: depth limit hit! Activating HeapSort worst-case shield`,
        comparisons: comp,
        swaps: swaps
      });
      heapSort(l, r);
      return;
    }
    const p = partition(l, r);
    sort(l, p - 1, depthLimit - 1);
    sort(p + 1, r, depthLimit - 1);
  };

  // Depth limit of 2 simulates quick partition worst case switch
  sort(0, tempArr.length - 1, 2);
  return steps;
};

export const HybridSortingBenchmarkVisualizer = () => {
  const [distribution, setDistribution] = useState('random');
  const [algorithm, setAlgorithm] = useState('hybrid');
  
  const getInitialArray = (dist) => {
    if (dist === 'sorted') return [17, 28, 34, 40, 45, 56, 62, 75, 88, 92];
    if (dist === 'reversed') return [92, 88, 75, 62, 56, 45, 40, 34, 28, 17];
    return [62, 34, 88, 17, 75, 45, 92, 28, 56, 40]; // random
  };

  const [array, setArray] = useState(getInitialArray('random'));
  const [active, setActive] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [phase, setPhase] = useState('IDLE');
  const [message, setMessage] = useState('Ready to benchmark');
  const [sorting, setSorting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [animIndex, setAnimIndex] = useState(-1);

  // Sync array to distribution selector when idle
  useEffect(() => {
    if (!sorting) {
      setArray(getInitialArray(distribution));
      setComparisons(0);
      setSwaps(0);
      setMessage('Ready to benchmark');
      setPhase('IDLE');
      setActive([]);
      setAnimIndex(-1);
    }
  }, [distribution, sorting]);

  // Run the step-by-step animation loop
  useEffect(() => {
    let timer;
    if (sorting && animIndex < steps.length - 1) {
      timer = setTimeout(() => {
        const nextIdx = animIndex + 1;
        const currentStep = steps[nextIdx];
        setAnimIndex(nextIdx);
        setArray(currentStep.array);
        setActive(currentStep.active);
        setComparisons(currentStep.comparisons);
        setSwaps(currentStep.swaps);
        setPhase(currentStep.phase);
        setMessage(currentStep.message);
      }, 180);
    } else if (sorting && animIndex === steps.length - 1) {
      setSorting(false);
      setPhase('DONE');
      setActive([]);
      setMessage('Benchmarking complete');
    }
    return () => clearTimeout(timer);
  }, [sorting, animIndex, steps]);

  const runSort = () => {
    if (sorting) return;
    const initialArr = getInitialArray(distribution);
    let sortingSteps = [];
    if (algorithm === 'hybrid') {
      sortingSteps = generateHybridSortSteps(initialArr);
    } else {
      sortingSteps = generateIntroSortSteps(initialArr);
    }
    setSteps(sortingSteps);
    setAnimIndex(-1);
    setSorting(true);
  };

  const reset = () => {
    setSorting(false);
    setArray(getInitialArray(distribution));
    setComparisons(0);
    setSwaps(0);
    setPhase('IDLE');
    setMessage('Ready to benchmark');
    setActive([]);
    setAnimIndex(-1);
  };

  const getBarColor = (index) => {
    if (phase === 'DONE') {
      return 'rgba(16, 185, 129, 0.5)'; // emerald
    }
    if (active.includes(index)) {
      if (algorithm === 'hybrid') {
        return phase === 'INSERTION' ? 'rgba(245, 158, 11, 0.8)' : 'rgba(6, 182, 212, 0.8)';
      } else {
        if (phase === 'SHIELD_ACTIVE' || phase === 'HEAPIFY' || phase === 'HEAPSORT') {
          return 'rgba(239, 68, 68, 0.8)'; // worst-case shield active (red)
        }
        return 'rgba(168, 85, 247, 0.8)'; // quick partition active (purple)
      }
    }
    return 'rgba(226, 232, 240, 0.08)';
  };

  return (
    <Panel label="DSA / Computational Patterns" status={phase}>
      <div className="grid h-full grid-rows-[auto_1fr_auto_auto] gap-2.5">
        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.03] pb-2">
          <div className="flex gap-2">
            <select
              disabled={sorting}
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="bg-black/40 border border-white/[0.05] text-[9px] uppercase tracking-wider text-slate-300 px-2 py-0.5 rounded outline-none font-mono cursor-pointer"
            >
              <option value="hybrid">Hybrid (Merge+Insert)</option>
              <option value="introsort">IntroSort (Quick+Heap)</option>
            </select>
            <select
              disabled={sorting}
              value={distribution}
              onChange={(e) => setDistribution(e.target.value)}
              className="bg-black/40 border border-white/[0.05] text-[9px] uppercase tracking-wider text-slate-300 px-2 py-0.5 rounded outline-none font-mono cursor-pointer"
            >
              <option value="random">Random</option>
              <option value="sorted">Sorted</option>
              <option value="reversed">Reversed</option>
            </select>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={runSort}
              disabled={sorting}
              className="border border-white/[0.07] bg-white/[0.02] p-1 text-cyan-300 hover:bg-white/[0.06] disabled:opacity-20 rounded"
              aria-label="Run sort"
            >
              <Play size={10} />
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={sorting}
              className="border border-white/[0.07] bg-white/[0.02] p-1 text-slate-500 hover:bg-white/[0.06] disabled:opacity-20 rounded"
              aria-label="Reset sort"
            >
              <RotateCcw size={10} />
            </button>
          </div>
        </div>

        {/* Vis Area */}
        <div className="flex min-h-[100px] items-end gap-1.5 border border-white/[0.03] bg-black/10 p-3 relative">
          {array.map((value, index) => (
            <div key={`${index}-${value}`} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
              <motion.div
                layout
                className="w-full rounded-t-sm relative"
                style={{
                  height: `${(value / 100) * 88}px`,
                  background: getBarColor(index),
                  boxShadow: active.includes(index) ? '0 0 10px rgba(103,232,249,0.15)' : 'none'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
              <span className="text-[7.5px] font-mono text-slate-600">{value}</span>
            </div>
          ))}
        </div>

        {/* Message Step Bar */}
        <div className="truncate border border-white/[0.05] bg-black/45 px-2.5 py-1 font-mono text-[8.5px] text-cyan-300/80 leading-normal">
          &gt; {message}
        </div>

        {/* Analytics Benchmarks Grid */}
        <div className="grid grid-cols-3 gap-2 text-[8.5px] uppercase tracking-widest text-slate-500 font-mono">
          <div className="border border-white/[0.04] bg-black/20 p-1.5">
            <span className="block text-[7.5px] text-slate-600 mb-0.5">COMPARE</span>
            <span className="text-slate-300">{comparisons}</span>
          </div>
          <div className="border border-white/[0.04] bg-black/20 p-1.5">
            <span className="block text-[7.5px] text-slate-600 mb-0.5">SWAP/WRITE</span>
            <span className="text-slate-300">{swaps}</span>
          </div>
          <div className="border border-white/[0.04] bg-black/20 p-1.5 relative overflow-hidden">
            <span className="block text-[7.5px] text-slate-600 mb-0.5">SHIELD STATUS</span>
            {algorithm === 'introsort' && (phase === 'SHIELD_ACTIVE' || phase === 'HEAPIFY' || phase === 'HEAPSORT') ? (
              <span className="text-rose-400 font-bold animate-pulse">SHIELD ACTIVE</span>
            ) : (
              <span className="text-slate-400">INACTIVE</span>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
};
