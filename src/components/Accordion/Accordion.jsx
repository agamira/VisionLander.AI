import { Collapse } from "antd";
import "./Accordion.scss";

const Accordion = () => {
  const text =
    "VisionLander.AI is a platform that uses artificial intelligence to generate a custom site from scratch. As a result, you get a much easier and faster website creation process. VisionLander.AI also comes with built-in AI tools for you to modify the website further.";

  const getItems = () => [
    {
      key: "1",
      label: "What Is an VisionLander.AI?",
      children: <p className="text">{text}</p>,
    },
    {
      key: "2",
      label: "Why generate a website with AI?",
      children: <p className="text">{text}</p>,
    },
    {
      key: "3",
      label: "How does VisionLander.AI work?",
      children: <p className="text">{text}</p>,
    },
    {
      key: "4",
      label: "What are the Pricing Plans for VisionLander.AI?",
      children: <p className="text">{text}</p>,
    },
    {
      key: "5",
      label: "Can I edit my website’s HTML?",
      children: <p className="text">{text}</p>,
    },
  ];

  return (
    <>
      <Collapse
        // accordion
        // defaultActiveKey={["1"]}
        expandIconPosition={"end"}
        expandIcon={({ isActive }) =>
          !isActive && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
            >
              <path
                d="M8 12.3572L16 20.3572L24 12.3572"
                stroke="white"
                strokeWidth="1.70982"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        }
        style={({ background: "transparent" }, { border: "none" })}
        items={getItems()}
      />
    </>
  );
};
export { Accordion };
