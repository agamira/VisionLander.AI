import { useState } from "react";
import "./GeneratorFormSection.scss";
import { Button } from "../../../components";
import configIcon from "../../../assets/icon/config.svg";
import corporate from "../../../assets/img/corporate-template.png";
import hardwell from "../../../assets/img/hardwell-template.png";
import { useOutletContext } from "react-router-dom";
import { generatorFormPost } from "../../../api";

const GeneratorFormSection = () => {
  const [inputValue, setInputValue] = useState("");

  const [isLoggedIn, openLogInModal] = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.target.elements.prompt.value;
    const templateId = +e.target.elements.templateId.value;
    const formData = { prompt, templateId };

    console.log(formData);

    if (isLoggedIn) return openLogInModal();

    if (prompt.length > 2 && templateId) {
      generatorFormPost(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            window.location.href = "http://localhost:3000/redactor";
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <section className="generator-form">
      <div className="container">
        <div className="form-box">
          <form name="generator-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-groups">
              <div className="form-group">
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Describe What you want:"
                    name="prompt"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                  />
                  <Button className="btn--primary" type="submit">
                    Generate
                  </Button>
                </div>
                <Button className="config-btn" type={"button"}>
                  <img src={configIcon} alt="" />
                </Button>
              </div>
              <div className="tags-group">
                <span>Popular Tags:</span>
                <div className="tags-list">
                  <Button
                    onClick={(e) => setInputValue(e.target.value)}
                    value={"Landing"}
                    className="btn--secondary"
                    type={"button"}
                  >
                    Landing
                  </Button>
                  <Button
                    onClick={(e) => setInputValue(e.target.value)}
                    value={"E Commerce"}
                    className="btn--secondary"
                    type={"button"}
                  >
                    E Commerce
                  </Button>
                  <Button
                    onClick={(e) => setInputValue(e.target.value)}
                    value={"Portfolio"}
                    className="btn--secondary"
                    type={"button"}
                  >
                    Portfolio
                  </Button>
                  <Button
                    onClick={(e) => setInputValue(e.target.value)}
                    value={"Art works"}
                    className="btn--secondary"
                    type={"button"}
                  >
                    Art works
                  </Button>
                  <Button
                    onClick={(e) => setInputValue(e.target.value)}
                    value={"Creative"}
                    className="btn--secondary"
                    type={"button"}
                  >
                    Creative
                  </Button>
                </div>
              </div>
            </div>
            <div className="builder-templates">
              <span>Choose the template:</span>
              <div className="radio-buttons">
                <label className="radio-label">
                  <input type="radio" name="templateId" value="1" />
                  <img src={corporate} alt="Image 1" />
                </label>
                <label className="radio-label">
                  <input type="radio" name="templateId" value="2" />
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
