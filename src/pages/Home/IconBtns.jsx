import { VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const IconBtn = styled.div`
  // cursor: pointer;
  // display: flex;
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
    <VStack
      alignItems="center"
      justifyContent="center"
      pb="8px"
      borderBottom="2px solid transparent"
      cursor="pointer"
      _hover={{
        borderColor: "rgb(120, 120, 120, 0.2)",
      }}
      onClick={onHosuseList}
    >
      <IconBtn>{icon}</IconBtn>
      <IconName>{children}</IconName>
    </VStack>
  );
};

export default IconBtns;
