import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const IconBtn = styled.div`
  cursor: pointer;
  display: flex;
`;

const IconName = styled.p`
  font-weight: 600;
  margin-left: 5px;
`;

const IconBtns = ({ icon, children }) => {
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
    <IconBtn onClick={onHosuseList}>
      {icon}
      <IconName>{children}</IconName>
    </IconBtn>
  );
};

export default IconBtns;
