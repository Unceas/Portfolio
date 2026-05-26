import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Terminal } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import portfolioData from '../data/portfolio.json';

const Cursor = () => (
  <span className="ml-1 inline-block h-[13px] w-[7px] translate-y-0.5 bg-cyan-300/70 animate-[blink_1s_step-end_infinite]" />
);

const TerminalLine = ({ prefix = '>', delay = 0, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="flex gap-2 font-mono text-[12px] leading-6">
      <span className="select-none text-cyan-300/55">{prefix}</span>
      <span className="text-slate-400">{children}</span>
    </div>
  );
};

const contactLinks = [
  {
    id: 'github',
    label: 'GitHub',
    sub: 'Unceas',
    href: portfolioData.socials.github,
    icon: <FiGithub size={15} />,
    command: '--open github/Unceas',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    sub: 'ayush-kushwaha',
    href: portfolioData.socials.linkedin,
    icon: <FiLinkedin size={15} />,
    command: '--open linkedin/profile',
  },
  {
    id: 'resume',
    label: 'Resume',
    sub: 'PDF profile',
    href: portfolioData.basicInfo.resumeUrl,
    icon: <FileText size={15} />,
    command: '--read resume.pdf',
  },
  {
    id: 'email',
    label: 'Email',
    sub: portfolioData.basicInfo.email,
    href: `mailto:${portfolioData.basicInfo.email}`,
    icon: <FiMail size={15} />,
    command: '--compose message',
  },
];

const Contact = () => {
  const [executed, setExecuted] = useState([]);

  const markExecuted = (id) => {
    setExecuted((current) => (current.includes(id) ? current : [...current, id]));
  };

  return (
    <section id="contact" className="section-band relative py-16 md:py-24 lg:py-32">
      <div className="mb-12 max-w-3xl">
        <h2 className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/60" />
          System Interface
        </h2>
        <h3 className="mb-4 font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
          Initialize Connection
        </h3>
        <p className="max-w-md text-sm leading-7 text-slate-500">
          Direct endpoints for source code, profile context, resume review, and collaboration.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="theme-dark-visual max-w-3xl border border-white/[0.07] bg-[#050607] shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
      >
        <div className="flex items-center justify-between border-b border-white/[0.05] bg-black/25 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/25" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
            <Terminal size={11} />
            connection_manager.sh
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-300/55">ready</div>
        </div>

        <div className="space-y-1 p-6">
          <TerminalLine delay={0}>initialize_connection()</TerminalLine>
          <TerminalLine prefix=" " delay={240}>checking available endpoints</TerminalLine>
          <TerminalLine prefix=" " delay={520}>
            <span className="text-emerald-300/75">ok</span>
            <span className="ml-2">4 channels mounted</span>
          </TerminalLine>
          <div className="flex pt-1 font-mono text-[11px] text-slate-600">
            <span className="text-cyan-300/50">&gt;</span>
            <span className="ml-2">select_channel --interactive</span>
            <Cursor />
          </div>
        </div>

        <div className="divide-y divide-white/[0.04] border-t border-white/[0.05]">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.href}
              target={link.id === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              onClick={() => markExecuted(link.id)}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.06, duration: 0.4 }}
              className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-white/[0.025]"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/[0.06] bg-white/[0.025] text-slate-500 transition-colors group-hover:border-white/[0.12] group-hover:text-cyan-200">
                  {link.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[12px] text-slate-300 transition-colors group-hover:text-white">{link.label}</span>
                  <span className="block truncate font-mono text-[10px] text-slate-600">{link.sub}</span>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3 font-mono text-[10px] text-slate-700 transition-colors group-hover:text-slate-500">
                <span className="hidden sm:inline">{link.command}</span>
                {executed.includes(link.id) ? (
                  <span className="text-emerald-300/60">executed</span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-white/12 group-hover:bg-cyan-300/55" />
                )}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="border-t border-white/[0.05] bg-black/20 px-6 py-3 font-mono text-[10px] text-slate-700">
          connection_profile: AI systems engineer / backend infrastructure / agent workflows
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
