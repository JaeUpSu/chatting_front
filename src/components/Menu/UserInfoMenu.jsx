import React from "react";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ActiveBadge from "../Badge/ActiveBadge";

function UserInfoMenu() {
  const navigate = useNavigate();

  const onChatList = () => {
    navigate(`/chatList`);
  };

  const onProfile = () => {
    navigate(`/profile/userId`);
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar ml="10px" />
      </MenuButton>
      <Badge colorScheme="green">Login</Badge>

      <MenuList>
        <MenuItem onClick={onChatList}>문의내역</MenuItem>
        <MenuItem onClick={onProfile}>마이페이지</MenuItem>
        <MenuItem>판매하기</MenuItem>
        <MenuItem>로그아웃</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserInfoMenu;
