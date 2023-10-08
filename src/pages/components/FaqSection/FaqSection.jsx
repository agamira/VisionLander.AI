import { Accordion } from "../../../components";
import "./FaqSection.scss";

const FaqSection = () => {
  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-title">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-content">
          <Accordion />
        </div>
      </div>
    </section>
  );
};

export { FaqSection };
