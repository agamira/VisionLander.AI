import "./GeneratorFormSection.scss";
import { useRef, useState } from "react";
import { Button, Loading } from "../../../components";
import corporate from "../../../assets/img/corporate-template.png";
import krypto from "../../../assets/img/krypto-template.png";
import hardwell from "../../../assets/img/hardwell-template.png";
import warkinon from "../../../assets/img/warkinon-template.png";
import loadingIcon from "../../../assets/icon/loading.svg";
import { generatorFormPost } from "../../../api";
import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { openModalByName } from "../../../utils/modalUtils";
import { useDispatch } from "react-redux";
import { authAsync } from "../../../redux/authSlice";

const GeneratorFormSection = () => {
  const [prompt, setPrompt] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [subdomain, setSubdomain] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleButtonClick = (value) => {
    setPrompt(value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };
  const error = (message) => {
    messageApi.open({
      type: "error",
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
    const websiteName = e.target.elements.websiteName.value;
    const subdomain = e.target.elements.subdomain.value;
    const formData = { prompt, templateId, websiteName, subdomain };
    if (!templateId) return warning("Please choose the template!");
    if (!websiteName) return warning("Please fill the website name!");
    if (!subdomain) return warning("Please fill the subdomain!");
    if (!prompt) return warning("Please fill the prompt");

    // Regular expression pattern for subdomain validation
    const subdomainRegex =
      /^([a-zA-Z0-9]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)?([a-zA-Z0-9]{1,2}([-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.?([a-zA-Z]{2,63})?$/;
    // Validate subdomain using the regex pattern
    if (!subdomainRegex.test(subdomain)) {
      return warning("Please enter a valid subdomain!");
    }

    if (prompt.length > 2 && templateId) {
      setIsLoading(true);
      generatorFormPost(formData)
        .then((res) => {
          dispatch(authAsync());
          setIsLoading(false);
          success("Your project has been created!");
          navigate(`/redactor/${res.id}`);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.status === 402) {
            error("You have to upgrade your plan!");
            openModalByName(dispatch, "pricingModal");
          }
          if (err.status === 406) {
            error("Subdomain already exists!");
          }
          if (err.status === 400) {
            error(err.statusText);
          }
        });
    } else {
      warning("Please fill all fields!");
    }
  };

  const tagsArray = [
    { value: "Book", tag: "Book" },
    { value: "Lead Capture", tag: "Lead Capture" },
    { value: "About & Bio", tag: "About & Bio" },
    { value: "Checkout", tag: "Checkout" },
    { value: "Consultation", tag: "Consultation" },
    { value: "Contest & Giveaway", tag: "Contest & Giveaway" },
    { value: "Event", tag: "Event" },
    { value: "Free Resource & Download", tag: "Free Resource & Download" },
    { value: "Lead Capture", tag: "Lead Capture" },
    { value: "Newsletter & Sign Up", tag: "Newsletter & Sign Up" },
    { value: "Offer, Discount, & Coupon", tag: "Offer, Discount, & Coupon" },
    { value: "Sales", tag: "Sales" },
    { value: "Thank You & Confirmation", tag: "Thank You & Confirmation" },
    { value: "Wait List & Coming Soon", tag: "Wait List & Coming Soon" },
    { value: "Webinar & Virtual Event", tag: "Webinar & Virtual Event" },
    { value: "Author", tag: "Author" },
    { value: "Automotive", tag: "Automotive" },
    { value: "Business & Marketing", tag: "Business & Marketing" },
    { value: "Creative Services", tag: "Creative Services" },
    { value: "Education", tag: "Education" },
    { value: "Entertainment & Travel", tag: "Entertainment & Travel" },
    { value: "Financial & Legal", tag: "Financial & Legal" },
    { value: "Health & Wellness", tag: "Health & Wellness" },
    { value: "Home", tag: "Home" },
    { value: "Services", tag: "Services" },
    { value: "Insurance", tag: "Insurance" },
    { value: "Personal Development", tag: "Personal Development" },
    { value: "Real Estate", tag: "Real Estate" },
    { value: "Restaurant & Food", tag: "Restaurant & Food" },
    { value: "Software & Technology", tag: "Software & Technology" },
  ];

  return (
    <>
      {contextHolder}
      {isLoading && (
        <Loading
          loadingIcon={loadingIcon}
          loadingMessage={"Your page is generating..."}
        />
      )}
      <section className="generator-form" id="generator">
        <div className="container">
          <div className="form-box">
            <form name="generator-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="builder-templates">
                <span>Choose the template:</span>
                <div className="radio-buttons">
                  <label className="radio-label">
                    <input type="radio" name="templateId" value="1" />
                    <img src={corporate} alt="Image 1" />
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="templateId" value="2" />
                    <img src={hardwell} alt="Image 3" />
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="templateId" value="3" />
                    <img src={warkinon} alt="Image 3" />
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="templateId" value="4" />
                    <img src={krypto} alt="Image 2" />
                  </label>
                </div>
              </div>
              <div className="form-groups">
                <div className="form-group">
                  <div className="input-box">
                    <label htmlFor="websiteName">Your Website name:</label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder={"My Website"}
                      name="websiteName"
                      id="websiteName"
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="subdomain">Your subdomain name:</label>

                    <Input
                      type="text"
                      name="subdomain"
                      id="subdomain"
                      value={subdomain}
                      placeholder="mysite"
                      addonBefore="https://"
                      addonAfter=".visionlander.ai"
                      className="input-field"
                      onChange={(e) =>
                        setSubdomain(e.target.value.trim().toLowerCase())
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-box">
                    <label htmlFor="prompt">
                      Describe what you business about:
                    </label>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={"Delivery of wedding bouquets ..."}
                      name="prompt"
                      className="input-field"
                      id="prompt"
                      onChange={(e) => setPrompt(e.target.value)}
                      value={prompt}
                    />
                    <Button className="btn--primary" type="submit">
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="tags-group">
                  <span>Popular Tags:</span>
                  <div className="tags-list">
                    <Button
                      onClick={(e) => handleButtonClick(e.target.value)}
                      value={"E Commerce"}
                      className="btn--secondary"
                      type={"button"}
                    >
                      E Commerce
                    </Button>
                    <Button
                      onClick={(e) => handleButtonClick(e.target.value)}
                      value={"SaaS"}
                      className="btn--secondary"
                      type={"button"}
                    >
                      SaaS
                    </Button>
                    <Button
                      onClick={(e) => handleButtonClick(e.target.value)}
                      value={"Portfolio"}
                      className="btn--secondary"
                      type={"button"}
                    >
                      Portfolio
                    </Button>
                    <Button
                      onClick={(e) => handleButtonClick(e.target.value)}
                      value={"Art works"}
                      className="btn--secondary"
                      type={"button"}
                    >
                      Art works
                    </Button>
                    <Button
                      onClick={(e) => handleButtonClick(e.target.value)}
                      value={"Creative"}
                      className="btn--secondary"
                      type={"button"}
                    >
                      Creative
                    </Button>
                  </div>
                </div>
                {showMore && (
                  <div className="tags-list">
                    {tagsArray.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          onClick={(e) => handleButtonClick(e.target.value)}
                          value={item.value}
                          className="btn--secondary"
                          type={"button"}
                        >
                          {item.tag}
                        </Button>
                      );
                    })}
                  </div>
                )}
                <div className="btn-wrapper">
                  <Button
                    type={"button"}
                    className="more-btn"
                    onClick={() => setShowMore((prev) => !prev)}
                  >
                    {showMore ? "Less" : "More"}
                  </Button>
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
