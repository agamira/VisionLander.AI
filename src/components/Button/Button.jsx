import "./Button.scss";

const Button = ({ className = "", children, ...props }) => {
  return (
    <button className={"btn " + className} {...props}>
      {children}
    </button>
  );
};

export { Button };
