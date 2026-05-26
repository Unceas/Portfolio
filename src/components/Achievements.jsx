import { motion } from 'framer-motion';
import { Award, Code, Radio, ShieldAlert, Trophy, Users } from 'lucide-react';

const achievementData = [
  {
    title: 'Winner - Sonic Earth',
    subtitle: 'World Radio Day 2025',
    category: 'Competition',
    icon: <Radio className="text-emerald-300" size={20} />,
    description: 'Awarded first place for engineering an automated audio processing and streaming service.',
  },
  {
    title: 'Organizer - BugHunt',
    subtitle: 'College Coding Event',
    category: 'Leadership',
    icon: <Users className="text-blue-300" size={20} />,
    description: 'Designed and coordinated a college-wide debugging competition with custom coding sandboxes.',
  },
  {
    title: '300+ Algorithmic Challenges',
    subtitle: 'DSA Platforms',
    category: 'Technical',
    icon: <Code className="text-slate-300" size={20} />,
    description: 'Practiced data structures, graph theory, dynamic programming, and computational optimization patterns.',
  },
  {
    title: '5th Position - Tech Fest',
    subtitle: 'Robo Rover Project',
    category: 'Competition',
    icon: <Trophy className="text-cyan-300" size={20} />,
    description: 'Co-engineered hardware-software interfaces, pathfinding behavior, and rover communication flows.',
  },
  {
    title: 'Smart India Hackathon',
    subtitle: 'National Participant',
    category: 'Competition',
    icon: <ShieldAlert className="text-amber-300" size={20} />,
    description: 'Designed a decentralized supply-chain tracking interface and pitch system under time constraints.',
  },
];

const certifications = [
  { title: 'Generative AI Foundations', issuer: 'Amazon Web Services (AWS)', year: '2025' },
  { title: 'AI Essentials', issuer: 'Google', year: '2024' },
  { title: 'Python Internship Certification', issuer: 'CodeTech IT Solutions', year: '2024' },
];

const Achievements = () => (
  <section id="achievements" className="section-band relative py-24 md:py-32">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.018),transparent_50%)] pointer-events-none" />

    <div className="mb-14 max-w-4xl">
      <h2 className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/60" />
        Milestones
      </h2>
      <h3 className="mb-4 font-display text-3xl font-medium tracking-tight text-white md:text-5xl">
        Achievements and Credentials
      </h3>
      <p className="max-w-2xl text-base leading-7 text-slate-500">
        Technical execution, student engineering leadership, and validated cloud and AI foundations.
      </p>
    </div>

    <div className="relative z-10 grid gap-8 lg:grid-cols-3">
      <div className="grid gap-4 md:grid-cols-2 lg:col-span-2">
        {achievementData.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="group flex flex-col justify-between border border-white/[0.05] bg-[#060708] p-5 transition-colors hover:border-white/[0.1]"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="border border-white/[0.05] bg-white/[0.025] p-2">{achievement.icon}</div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{achievement.category}</span>
              </div>
              <h4 className="mb-1 font-display text-base font-medium text-white transition-colors group-hover:text-cyan-200">
                {achievement.title}
              </h4>
              <p className="mb-3 font-mono text-xs text-cyan-300/60">{achievement.subtitle}</p>
              <p className="text-sm leading-relaxed text-slate-500">{achievement.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="flex flex-col justify-between border border-white/[0.05] bg-[#060708] p-6"
      >
        <div>
          <h4 className="mb-6 flex items-center gap-2 font-display text-lg font-medium text-white">
            <Award className="text-cyan-200" size={20} />
            Verified Certifications
          </h4>
          <div className="space-y-6">
            {certifications.map((certification) => (
              <div key={certification.title} className="border-l border-white/[0.08] py-1 pl-4">
                <p className="font-display text-sm font-medium text-white transition-colors hover:text-cyan-200">
                  {certification.title}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-600">
                  {certification.issuer} / {certification.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.05] pt-6 font-mono text-[11px] uppercase tracking-widest text-slate-600">
          Credential verification / live
        </div>
      </motion.div>
    </div>
  </section>
);

export default Achievements;
