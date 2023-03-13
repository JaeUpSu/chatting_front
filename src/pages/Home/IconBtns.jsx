import React from "react";
import styled from "styled-components";

const Img = styled.img`
  max-width: 3rem;
  cursor: pointer;
  margin-bottom: 5px;
`;

const IconName = styled.p`
  font-weight: 600;
  text-align: center;
`;

const IconBtns = ({ src, children }) => {
  return (
    <div>
      <Img src={src} />
      <IconName>{children}</IconName>
    </div>
  );
};

export default IconBtns;
