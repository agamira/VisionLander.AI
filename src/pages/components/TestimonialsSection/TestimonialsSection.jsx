import "./TestimonialsSection.scss";
import { TestimonialsCard } from "../../../components";
import { Rate } from "antd";
import userImage from "../../../assets/img/user-image.png";

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-title">
          <h2>Testimonials from Happy Customers All Around the World:</h2>
        </div>
        <div className="testimonials-content">
          <div className="row">
            <TestimonialsCard
              comment={
                "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change & it is a good channel for us.”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change & it is a good channel for us.”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change & it is a good channel for us.”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change & it is a good channel for us.”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change & it is a good channel for us.”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change & it is a good channel for us.”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
