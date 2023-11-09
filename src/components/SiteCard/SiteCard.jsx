import { Button } from "..";
import "./SiteCard.scss";

const SiteCard = ({ siteImage }) => {
  return (
    <div className="site-card">
      <div className="site-info">
        <div className="site-name">
          <p>Site Name</p>
          <Button onClick={() => console.log("clicked")}></Button>
        </div>
        <a className="site-url">Site URL</a>
        <div className="edit-buttons">
          <Button
            className="btn btn--outline"
            onClick={() => console.log("clicked")}
          >
            Change domain
          </Button>
          <Button className="btn" onClick={() => console.log("clicked")}>
            Edit
          </Button>
        </div>
        <div className="activation-buttons">
          <Button
            className="btn"
            onClick={() => console.log("clicked")}
          >
            Activate
          </Button>
          <Button className="btn" onClick={() => console.log("clicked")}>
            Publish
          </Button>
        </div>
      </div>
      <div className="site-img">
        <img src={siteImage} alt="website" />
      </div>
    </div>
  );
};

export { SiteCard };
