import { Link } from "react-router-dom";

const Card = ({ title, description, image, route }) => {
  const handleClick = () => {
    window.location.href = route;
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={title} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button>IR</button>
      </div>
    </div>
  );
};

export default Card;

