import { Button } from "..";
import "./SiteCard.scss";
import editIcon from "../../assets/icon/pen.svg";
import { Link } from "react-router-dom";

const SiteCard = ({
  id,
  title,
  template,
  domain,
  deleteAction,
  changeDomainAction,
}) => {
  return (
    <div id={id} className="site-card">
      <div className="site-info">
        <div className="site-name">
          <p>{title}</p>
          <Button onClick={() => console.log("clicked")}>
            <img src={editIcon} alt="" />
          </Button>
        </div>
        {!!domain && (
          <a
            href={domain}
            target="_blank"
            rel="noreferrer"
            className="site-url"
          >
            {domain}
          </a>
        )}
        <div className="edit-buttons">
          {changeDomainAction}
          <Link
            color="#fff"
            to={`/redactor/${id}`}
            target="_blank"
            className="btn edit-btn"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span>
              <img src={editIcon} alt="" />
            </span>
            <span> Edit Site</span>
          </Link>
        </div>
        <div className="action-buttons">{deleteAction}</div>
      </div>
      <div className="site-img">
        <a href={domain} target="_blank" rel="noreferrer">
          <img height="283px" width="268px" src={template} alt="website" />
        </a>
      </div>
    </div>
  );
};

export { SiteCard };
