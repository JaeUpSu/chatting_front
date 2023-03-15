import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onHosuseList = () => {
    sessionStorage.setItem("roomKind", roomQuery);
    navigate(`/houseList`);
  };
  const [roomQuery, setRoomQuery] = useState(children);

  const sessionStorage = window.sessionStorage;

  useEffect(() => {
    setRoomQuery(children);
  }, [children]);

  return (
    <div>
      <Img src={src} onClick={onHosuseList} />
      <IconName>{children}</IconName>
    </div>
  );
};

export default IconBtns;
