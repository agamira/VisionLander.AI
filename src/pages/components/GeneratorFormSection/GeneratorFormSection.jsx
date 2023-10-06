import { useState } from "react";
import "./GeneratorFormSection.scss";
import { Button, Loading } from "../../../components";
import configIcon from "../../../assets/icon/config.svg";
import corporate from "../../../assets/img/corporate-template.png";
import hardwell from "../../../assets/img/hardwell-template.png";
import { useOutletContext } from "react-router-dom";
import { generatorFormPost } from "../../../api";
import { message } from "antd";
import loadingIcon from "../../../assets/icon/loading.svg";

const GeneratorFormSection = () => {
  const [inputValue, setInputValue] = useState("");

  const [isLoggedIn, openLogInModal] = useOutletContext();

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.target.elements.prompt.value;
    const templateId = +e.target.elements.templateId.value;
    const formData = { prompt, templateId };

    if (!isLoggedIn) return openLogInModal();

    if (!prompt) return warning("Please fill the prompt");

    if (!templateId) return warning("Please choose the template!");

    if (prompt.length > 2 && templateId) {
      setIsLoading(true);
      generatorFormPost(formData)
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            success("Your project has been created!");
            window.location.href = "http://localhost:3000/redactor";
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    } else {
      warning("Please fill all fields!");
    }
  };

  return (
    <>
      {contextHolder}
      {isLoading && (
        <Loading
          loadingIcon={loadingIcon}
          loadingMessage={"Your page is generating..."}
        />
      )}
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
    </>
  );
};

export { GeneratorFormSection };
