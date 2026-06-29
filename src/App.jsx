import MainLayout from './components/MainLayout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CurrentlyExploring from './components/CurrentlyExploring';
import Skills from './components/Skills';
import BuildLog from './components/BuildLog';
import Achievements from './components/Achievements';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';

function App() {
  return (
    <MainLayout hero={<Hero />}>
      <About />
      <Projects />
      <CurrentlyExploring />
      <Skills />
      <BuildLog />
      <Achievements />
      <GithubStats />
      <Contact />
    </MainLayout>
  );
}

export default App;
