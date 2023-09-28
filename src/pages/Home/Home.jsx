import { GeneratorFormSection, WelcomeSection } from "../components";
import "./Home.scss";

const Home = () => {
  return (
    <main id="home">
      <WelcomeSection />
      <GeneratorFormSection />
    </main>
  );
};

export { Home };
