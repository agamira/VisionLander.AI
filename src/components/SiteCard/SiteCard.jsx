import { Button } from "..";
import { Button as BtnAnt, message, Popconfirm } from "antd";
import "./SiteCard.scss";
import editIcon from "../../assets/icon/pen.svg";
import { Link } from "react-router-dom";

const SiteCard = ({ id, title, template, domain }) => {
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

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
          <Button
            style={{ borderRadius: "8px" }}
            className="btn btn--outline"
            onClick={() => console.log("clicked")}
          >
            Change domain
          </Button>
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
        <div className="activation-buttons">
          {/* <Button
            className="btn activate-btn"
            onClick={() => console.log("clicked")}
          >
            Activate on Subdomain
          </Button> */}
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="right"
          >
            <BtnAnt
              type="primary"
              danger
              style={{ padding: "8px 12px", height: "100%" }}
            >
              Delete
            </BtnAnt>
          </Popconfirm>
        </div>
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
