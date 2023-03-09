import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import routes from "../../routes";
import styled from "styled-components";
import { Text } from "@chakra-ui/react";

// 없어질 예정
import { faComment, faComments } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AddressMenu from "../Menu/AddressMenu";
import OptionDropdown from "../Menu/OptionDropdown";

const HeaderContainer = styled.header`
  width: 100%;
  max-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 0;

  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: white;
`;

const Wrapper = styled.div`
  width: 100%;
  padding-right: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  &:nth-child(1) {
    transform: translateX(20px);
  }
  // &:nth-child(2) {
  //   transform: translateX(20px);
  //   border: 2px solid black;
  //   border-radius: 10px;
  //   padding: 3px;
  // }
`;

const Icon = styled.span`
  margin: 0px 10px;
  margin-left: 15px;
  cursor: pointer;
  &:nth-child(1) {
    margin-left: 10px;
  }
`;

function Header() {
  const navigate = useNavigate();

  const onHome = () => {
    navigate(`${routes.home}`);
  };
  const onProfile = () => {
    navigate(`/profile/userId`);
  };
  const onChatList = () => {
    navigate(`/chatList/isOwner`);
  };

  // 없어질 예정
  const onChat = () => {
    navigate(`/chatList/isOwner/chat/chatId`);
  };
  const onLogin = () => {
    navigate(`/login`);
  };
  const onSignUp = () => {
    navigate(`/signup`);
  };
  const onHouse = () => {
    navigate(`/houseList/address=null/options=null/house/houseId`);
  };
  const onHouseList = () => {
    navigate(`/houseList/address=null/options=null`);
  };

  return (
    <HeaderContainer>
      <Wrapper>
        <Column>
          <Icon>
            <Text onClick={onHome} fontSize="2xl">
              BangSam
            </Text>
          </Icon>
        </Column>
        <Column padding="0px">
          <AddressMenu />
        </Column>
        {/* 없어질 컬럼 (routing 편하게 할려고 만듬) */}
        <Column>
          {/* <OptionDropdown /> */}

          <Icon>
            <FontAwesomeIcon size={"2x"} icon={faComment} onClick={onChat} />
          </Icon>
          <Icon>
            <FontAwesomeIcon size={"2x"} icon={faUserPlus} onClick={onSignUp} />
          </Icon>
          <Icon>
            <Text onClick={onHouse}>집</Text>
          </Icon>
          <Icon>
            <Text onClick={onHouseList}>집리스트</Text>
          </Icon>
          <Icon>
            <Text onClick={onLogin}>로그인</Text>
          </Icon>
        </Column>
        <Column>
          <Icon>
            <FontAwesomeIcon
              size={"2x"}
              icon={faComments}
              onClick={onChatList}
            />
          </Icon>
          <Icon>
            <FontAwesomeIcon size={"2x"} icon={faUser} onClick={onProfile} />
          </Icon>
        </Column>
      </Wrapper>
    </HeaderContainer>
  );
}

export default Header;
