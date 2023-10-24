import "./CustomList.scss";

const CustomList = ({ className = "", items }) => {
  return (
    <ul className={`custom-list ${className}`}>
      {items.map((item, index) => {
        return (
          <li className="custom-list__item" key={index}>
            <p>{item}</p>
          </li>
        );
      })}
    </ul>
  );
};

export { CustomList };
