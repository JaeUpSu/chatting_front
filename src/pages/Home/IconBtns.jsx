import React from "react";
import styled from "styled-components";

const Img = styled.img`
  max-width: 3rem;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 5px;
`;

const IconName = styled.p`
  font-weight: 600;
  text-align: center;
`;

const IconBtns = ({ src, children }) => {
  const handleClickDetail = () => {};
  return (
    <div>
      <Img src={src} onClick={handleClickDetail} />
      <IconName>{children}</IconName>
    </div>
  );
};

export default IconBtns;
