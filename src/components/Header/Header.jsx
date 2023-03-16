import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import routes from "../../routes";
import styled from "styled-components";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

// 없어질 예정
import { faComment, faComments } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AddressMenu from "../Menu/AddressMenu";
import OptionDropdown from "../Menu/OptionDropdown";
import LoginModal from "../Modal/LoginModal";
import useUser from "../../hooks/useUser";

function Header() {
  const { user, isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();

  const onHome = () => {
    sessionStorage.clear();
    navigate(`${routes.home}`);
  };
  const onProfile = () => {
    navigate(`/profile/userId`);
  };
  const onChatList = () => {
    navigate(`/chatList`);
  };

  // 없어질 예정
  const onChat = () => {
    navigate(`/chatList/isOwner/chat/chatId`);
  };
  const onSignUp = () => {
    navigate(`/signup`);
  };
  const onHouse = () => {
    navigate(`/houseList/house/houseId`);
  };
  const onHouseList = () => {
    navigate(`/houseList`);
  };
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  return (
    <HStack justifyContent={"space-between"} px={"10"} py={"3"}>
      <Text onClick={onHome} fontSize="2xl" color={"#ff404c"} cursor="pointer">
        BangSam
      </Text>
      {/* 없어질 컬럼 (routing 편하게 할려고 만듬) */}
      {/* <OptionDropdown /> */}
      <HStack>
        <FontAwesomeIcon size={"2x"} icon={faUserPlus} onClick={onSignUp} />
        <Text onClick={onHouseList}>집리스트</Text>
      </HStack>
      <HStack>
        <FontAwesomeIcon
          size={"2x"}
          cursor="pointer"
          icon={faComment}
          onClick={onChat}
        />
        <FontAwesomeIcon
          size={"2x"}
          cursor="pointer"
          icon={faComments}
          onClick={onChatList}
        />
        {!isLoggedIn && !userLoading ? (
          <Avatar onClick={() => onLoginOpen()} />
        ) : (
          <Avatar onClick={() => onLoginOpen()} />
        )}
      </HStack>
      {/* <FontAwesomeIcon size={"2x"} icon={faUser} onClick={onProfile} /> */}
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </HStack>
  );
}

export default Header;
