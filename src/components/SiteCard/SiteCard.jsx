import "./SiteCard.scss";

const SiteCard = ({ siteImage }) => {
  return (
    <div className="site-card">
      <div className="site-info">
        <p className="site-name">Site Name</p>
        <p className="site-url">Site URL</p>
      </div>
      <div className="site-img">
        <img src={siteImage} alt="website" />
      </div>
    </div>
  );
};

export { SiteCard };
