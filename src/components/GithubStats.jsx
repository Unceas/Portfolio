import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Code2, GitFork, Star } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import portfolioData from '../data/portfolio.json';

const fallbackData = {
  repos: 0,
  stars: 0,
  forks: 0,
  updatedAt: 'Live data unavailable',
  languages: [
    { name: 'Python', count: 4 },
    { name: 'JavaScript', count: 2 },
    { name: 'C++', count: 1 },
  ],
};

const StatTile = ({ icon, label, value }) => (
  <div className="border border-white/[0.05] bg-black/25 p-4">
    <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">
      {icon}
      {label}
    </div>
    <div className="font-display text-2xl font-medium text-white">{value}</div>
  </div>
);

const GithubStats = () => {
  const username = portfolioData.socials.githubUsername;
  const [githubData, setGithubData] = useState(fallbackData);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!username) return undefined;

    const controller = new AbortController();

    const loadGithubData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { signal: controller.signal }),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub API request failed');
        }

        const [user, repos] = await Promise.all([userResponse.json(), reposResponse.json()]);
        const publicRepos = Array.isArray(repos) ? repos.filter((repo) => !repo.fork) : [];
        const languageCounts = publicRepos.reduce((acc, repo) => {
          if (!repo.language) return acc;
          acc[repo.language] = (acc[repo.language] || 0) + 1;
          return acc;
        }, {});

        setGithubData({
          repos: user.public_repos ?? publicRepos.length,
          stars: publicRepos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0),
          forks: publicRepos.reduce((total, repo) => total + (repo.forks_count || 0), 0),
          updatedAt: publicRepos[0]?.updated_at
            ? new Date(publicRepos[0].updated_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'No recent repository activity',
          languages: Object.entries(languageCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5),
        });
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setGithubData(fallbackData);
          setStatus('fallback');
        }
      }
    };

    loadGithubData();
    return () => controller.abort();
  }, [username]);

  const maxLanguageCount = useMemo(
    () => Math.max(...githubData.languages.map((language) => language.count), 1),
    [githubData.languages],
  );

  if (!username) return null;

  return (
    <section id="github-stats" className="section-band relative py-24">
      <div className="absolute inset-0 bg-cyan-300/[0.018] [mask-image:radial-gradient(ellipse_at_center,white,transparent_68%)] pointer-events-none" />

      <div className="mb-12 max-w-4xl">
        <h2 className="mb-4 flex items-center gap-3 font-display text-3xl font-medium tracking-tight text-white md:text-5xl">
          <FiGithub className="text-cyan-300" size={36} />
          GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-slate-400">Activity</span>
        </h2>
        <p className="border-l-2 border-cyan-300/45 pl-4 font-mono text-sm text-slate-500">
          Repository signal pulled directly from GitHub API.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-white/[0.06] bg-[#060708] p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-sm text-slate-300">
              <Activity size={16} className="text-cyan-300" />
              Repository Overview
            </div>
            <span className={`font-mono text-[10px] uppercase tracking-widest ${
              status === 'ready' ? 'text-emerald-300/65' : 'text-amber-300/65'
            }`}>
              {status === 'ready' ? 'Live' : status}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatTile icon={<Code2 size={13} />} label="Repos" value={githubData.repos} />
            <StatTile icon={<Star size={13} />} label="Stars" value={githubData.stars} />
            <StatTile icon={<GitFork size={13} />} label="Forks" value={githubData.forks} />
          </div>

          <div className="mt-5 border border-white/[0.05] bg-black/25 p-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">Last Updated Repo</div>
            <div className="font-mono text-sm text-slate-300">{githubData.updatedAt}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-white/[0.06] bg-[#060708] p-6"
        >
          <div className="mb-5 flex items-center gap-2 font-mono text-sm text-slate-300">
            <Activity size={16} className="text-cyan-300" />
            Language Distribution
          </div>

          <div className="space-y-4">
            {githubData.languages.map((language) => (
              <div key={language.name}>
                <div className="mb-2 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-300">{language.name}</span>
                  <span className="text-slate-600">{language.count} repos</span>
                </div>
                <div className="h-2 bg-white/[0.04]">
                  <div
                    className="h-full bg-cyan-300/65"
                    style={{ width: `${Math.max((language.count / maxLanguageCount) * 100, 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex border border-white/[0.06] bg-white/[0.025] px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate-300 transition-colors hover:border-cyan-300/25 hover:text-white"
          >
            Open GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubStats;
