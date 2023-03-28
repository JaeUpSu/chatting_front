import "./Arrows.css";
import { AiOutlineArrowRight } from "react-icons/ai";

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: "block",
        position: "absolute",
        border: "none",
        top: "37%",
        right: "3.5rem",
        zIndex: 1,
      }}
    >
      <AiOutlineArrowRight />
    </div>
  );
};
