import "./HowItWorksSection.scss";
import { StepsCard } from "../../../components";
import macbookGuy from "../../../assets/img/macbook-guy.png";
import templateImage from "../../../assets/img/card-template.png";
import editorImage from "../../../assets/img/card-editor.png";
import macbookGirl from "../../../assets/img/macbook-girl.png";

const HowItWorksSection = () => {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-title">
          <h3>How it works?</h3>
        </div>
        <div className="card-list">
          <StepsCard
            cardImage={macbookGuy}
            cardNumber={"1"}
            cardTitle={"Registration and Pricing Plan Selection"}
            cardText={
              "Begin your journey by signing up and choosing the perfect pricing plan that suits your needs."
            }
          />
          <StepsCard
            cardImage={templateImage}
            cardNumber={"2"}
            cardTitle={"Choose a Template"}
            cardText={
              "Browse through a variety of professionally designed templates and pick the one that resonates with your vision."
            }
          />
          <StepsCard
            cardImage={editorImage}
            cardNumber={"3"}
            cardTitle={"Customize Your Landing Page"}
            cardText={
              "Tailor your website to your taste by customizing colors, fonts, images, and content—make it uniquely yours."
            }
          />
          <StepsCard
            cardImage={macbookGirl}
            cardNumber={"4"}
            cardTitle={"Preview and Publish"}
            cardText={
              "Review your masterpiece, ensure it's exactly as you envisioned, and with a click, publish it for the world to see your amazing creation."
            }
          />
        </div>
      </div>
    </section>
  );
};

export { HowItWorksSection };
