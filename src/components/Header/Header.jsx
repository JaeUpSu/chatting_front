import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { isLoggedInVar } from "../../apollo";
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
import UserInfoMenu from "../Menu/UserInfoMenu";

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

  // 없어질 예정
  const onChat = () => {
    navigate(`/chatList/isOwner/chat/chatId`);
  };
  const onSignUp = () => {
    navigate(`/signup`);
  };
  const onSell = () => {
    navigate(`/sell`);
  };
  const onHouseList = () => {
    navigate(`/houseList`);
  };
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  // const [userMenu, setUserMenu] = useState(false);

  return (
    <HStack justifyContent={"space-between"} px={"7"} py={"4"}>
      <Text onClick={onHome} fontSize="2xl" color={"#ff404c"} cursor="pointer">
        BangSam
      </Text>
      {/* 없어질 컬럼 (routing 편하게 할려고 만듬) */}
      {/* <OptionDropdown /> */}
      <HStack>
        <FontAwesomeIcon size={"2x"} icon={faUserPlus} onClick={onSignUp} />
        <Text onClick={onHouseList}>집리스트</Text>
        <Text onClick={onProfile}>프로필</Text>
        <Text onClick={onSell}>판매</Text>
      </HStack>

      {!isLoggedIn && !userLoading ? (
        <Avatar onClick={() => onLoginOpen()} />
      ) : (
        <UserInfoMenu user={user} />
      )}
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </HStack>
  );
}

export default Header;
