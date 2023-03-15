import React, { useState, useEffect } from "react";
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
  const [roomQuery, setRoomQuery] = useState(children);

  const sessionStorage = window.sessionStorage;

  useEffect(() => {
    setRoomQuery(children);
  }, [children]);

  const homeToDetail = () => {
    sessionStorage.setItem("roomKind", roomQuery);
    console.log(roomQuery);
  };

  return (
    <div>
      <Img src={src} onClick={homeToDetail} />
      <IconName>{children}</IconName>
    </div>
  );
};

export default IconBtns;
