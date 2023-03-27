import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const IconName = styled.p`
  font-weight: 600;
  font-family: "Nanum Gothic";
  font-size: 20px;
  text-align: center;
`;

const IconBtns = ({ children }) => {
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
      <IconName onClick={onHosuseList}>{children}</IconName>
    </div>
  );
};

export default IconBtns;
