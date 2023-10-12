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
      children: (
        <p className="text">
          {
            "AI accelerates the website-building process, saving you time and effort better spent on other important tasks. If you’re on a tight budget, using an AI website generator is also much more affordable than hiring a web developer."
          }
        </p>
      ),
    },
    {
      key: "3",
      label: "How does VisionLander.AI work?",
      children: (
        <p className="text">{`It’s simple. To use VisionLander.AI, you only need to describe your business and select a website type that matches your needs.
      Our AI builder will automatically write unique content, select royalty-free stock images, and choose a color palette and fonts that best suit your description.`}</p>
      ),
    },
    {
      key: "4",
      label: "Do I need coding skills to use VisionLander.AI?",
      children: (
        <p className="text">{`Not at all. Our AI website generator is designed to help beginners build professional websites without worrying about technicalities.
      Web designers and developers can also use VisionLander.AI, to make simple websites faster for their clients.`}</p>
      ),
    },
    {
      key: "5",
      label: "Can I edit my website’s HTML?",
      children: (
        <p className="text">{`Durable is a “no code” solution to building websites. Because of that, we don’t offer extensive options for HTML customization. But if you have a specific need or request, get in touch with us.`}</p>
      ),
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
