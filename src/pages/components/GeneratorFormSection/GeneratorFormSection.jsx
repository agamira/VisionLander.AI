import "./GeneratorFormSection.scss";
import { Button } from "../../../components";
import configIcon from "../../../assets/icon/config.svg";
import corporate from "../../../assets/img/corporate-template.png";
import hardwell from "../../../assets/img/hardwell-template.png";

const GeneratorFormSection = () => {
  return (
    <section className="generator-form">
      <div className="container">
        <div className="form-box">
          <form action="">
            <div className="form-groups">
              <div className="form-group">
                <div className="input-box">
                  <input type="text" placeholder="Describe What you want:" />
                  <Button className="btn--primary" type="submit">
                    Generate
                  </Button>
                </div>
                <Button className="config-btn">
                  <img src={configIcon} alt="" />
                </Button>
              </div>
              <div className="tags-group">
                <span>Popular Tags:</span>
                <div className="tags-list">{/* <Button></Button> */}</div>
              </div>
            </div>
            <div className="builder-templates">
              <span>Choose the template:</span>
              <div className="radio-buttons">
                <label className="radio-label">
                  <input type="radio" name="option" value="option1" />
                  <img src={corporate} alt="Image 1" />
                </label>
                <label className="radio-label">
                  <input type="radio" name="option" value="option2" />
                  <img src={hardwell} alt="Image 2" />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export { GeneratorFormSection };
