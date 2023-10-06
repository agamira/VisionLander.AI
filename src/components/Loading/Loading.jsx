import "./Loading.scss";

const Loading = ({ loadingIcon, loadingMessage }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        {loadingIcon && <img className="loading-spinner" src={loadingIcon} />}
        {loadingMessage && <p className="loading-message">{loadingMessage}</p>}
      </div>
    </div>
  );
};

export { Loading };
