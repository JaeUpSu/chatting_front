import "./Arrows.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...props.style,
        display: "block",
        position: "absolute",
        border: "none",
        background: "transparent",
        color: "black",
        top: "37%",
        zIndex: 1,
        left: "2rem",
      }}
    >
      <FaArrowLeft />
    </div>
  );
};
