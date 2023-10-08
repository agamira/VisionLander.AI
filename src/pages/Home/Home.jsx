import {
  FaqSection,
  GeneratorFormSection,
  HowItWorksSection,
  WelcomeSection,
} from "../components";
import "./Home.scss";

const Home = () => {
  return (
    <main id="home">
      <WelcomeSection />
      <GeneratorFormSection />
      <HowItWorksSection />
      <FaqSection />
    </main>
  );
};

export { Home };
