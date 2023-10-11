import { useMediaQuery } from "../../hooks/useMediaQuery";

function Modal({ children, isOpen, closeModal }) {
  const isTablet = useMediaQuery("(max-width: 768px)");

  // Function to close the modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Inline CSS for the modal styles
  const modalStyle = {
    cursor: "pointer",
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(7, 15, 35, 0.50)",
    backdropFilter: "blur(20px)",
    zIndex: 9,
  };

  const modalContentStyle = {
    cursor: "default",
    position: "absolute",
    width: isTablet && "70%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div style={modalStyle} onClick={handleOutsideClick}>
      <div style={modalContentStyle}>{children}</div>
    </div>
  );
}

export { Modal };
