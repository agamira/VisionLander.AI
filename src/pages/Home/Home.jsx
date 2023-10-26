import {
  WelcomeSection,
  FaqSection,
  GeneratorFormSection,
  HowItWorksSection,
  TestimonialsSection,
} from "../components";
import "./Home.scss";

const Home = () => {
  return (
    <main id="home">
      <WelcomeSection />
      <GeneratorFormSection />
      <HowItWorksSection />
      <FaqSection />
      <TestimonialsSection />
    </main>
  );
};

export { Home };
