import "./Arrows.css";

export const NextArrow = (props) => {
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
        left: "54rem",
        zIndex: 1,
      }}
    />
  );
};
