import "./TestimonialsCard.scss";

const TestimonialsCard = ({ rate, userImage, comment, username, position }) => {
  return (
    <div className="testimonials-card">
      <div className="testimonials-card__rate">{rate}</div>
      <div className="testimonials-card__comment">
        <p>{comment}</p>
      </div>
      <div className="testimonials-card__user">
        <div className="testimonials-card__user-image">
          <img src={userImage} alt="user" />
        </div>
        <div className="testimonials-card__user-info">
          <p className="username">{username}</p>
          <p className="position">{position}</p>
        </div>
      </div>
    </div>
  );
};

export { TestimonialsCard };
