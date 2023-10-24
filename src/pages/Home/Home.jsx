import {
  WelcomeSection,
  FaqSection,
  GeneratorFormSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingSection,
} from "../components";
import "./Home.scss";

const Home = () => {
  return (
    <main id="home">
      <WelcomeSection />
      <GeneratorFormSection />
      <HowItWorksSection />
      <FaqSection />
      <PricingSection />
      <TestimonialsSection />
    </main>
  );
};

export { Home };
