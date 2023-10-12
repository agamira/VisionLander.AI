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
                "“VisionLander's intuitive drag-and-drop website builder transformed my vision into reality! Creating my website was a breeze, even as a beginner. The dashboard and builder are incredibly user-friendly. Grateful for this tool that enabled me to bring my ideas to life!”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“As a small business owner, VisionLander's website builder has been a game-changer. It's incredibly intuitive, allowing me to create a professional website for my business without any prior experience. The simplicity and efficiency of the platform are a boon for busy entrepreneurs like me.”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“VisionLander's website builder provided the perfect canvas for my artistic expression. The drag-and-drop feature and diverse customization options allowed me to showcase my portfolio in a visually stunning and unique way. It's a tool that resonates with creatives looking to make a bold statement online.”"
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
                "“Impressed with VisionLander! Easy for newbies like me. Drag-and-drop made it fun. Highly recommend it for a sleek website! Your website builder gave me the perfect start, perfect pictures, and from there, it was everything I needed. I love you guys!”"
              }
              userImage={userImage}
              username={"Leslie Alexander"}
              position={"Founder"}
              rate={<Rate disabled defaultValue={5} />}
            />
            <TestimonialsCard
              comment={
                "“I had a Facebook page but wanted to share my work with more potential clients. When I found VisionLander's offer, it seemed too good to be true at first. But VisionLander did a great job! They built the website I needed and helped me learn how to manage it. 10/10.”"
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
