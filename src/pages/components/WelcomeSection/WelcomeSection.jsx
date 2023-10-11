import "./WelcomeSection.scss";

const WelcomeSection = () => {
  return (
    <section className="welcome-section" id="#home">
      <div className="container">
        <div className="welcome">
          <div className="welcome__title">
            <h1>
              Create stunning <span>landing pages</span> effortlessly with AI in
              seconds
            </h1>
            <p>
              VisionLander.AI simplifies the process, empowering you to craft
              visually stunning pages that convert - no coding, design, or
              copywriting skills required. VisionLander.AI - Your Ultimate
              Landing Page Solution
            </p>
          </div>
          <div className="welcome__video">
            <iframe
              src="https://www.youtube.com/embed/I0FBwd7O4s0?si=Pw8nR5MGe_ZXxUrg"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export { WelcomeSection };
