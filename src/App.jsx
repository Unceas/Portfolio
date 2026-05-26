import MainLayout from './components/MainLayout';
import Hero from './components/Hero';
import Projects from './components/Projects';
import CurrentlyExploring from './components/CurrentlyExploring';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';

function App() {
  return (
    <MainLayout hero={<Hero />}>
      <Projects />
      <CurrentlyExploring />
      <Skills />
      <Experience />
      <Achievements />
      <GithubStats />
      <Contact />
    </MainLayout>
  );
}

export default App;
