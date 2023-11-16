import "./SiteCard.scss";

const SiteCard = ({
  id,
  title,
  domain,
  template,
  editAction,
  deleteAction,
  changeDomainAction,
  changeSiteNameAction,
}) => {
  return (
    <div id={id} className="site-card">
      <div className="site-info">
        <div className="site-name">
          <p>{title}</p>
          {changeSiteNameAction}
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
          {editAction}
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
