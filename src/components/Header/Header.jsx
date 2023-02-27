import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import routes from "../../routes";
import styled from "styled-components";
import { Text } from "@chakra-ui/react";

// 없어질 예정
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faHouseFloodWater } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.header`
  width: 100%;
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
  &:nth-child(2) {
    transform: translateX(20px);
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
  }
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
    navigate(`/chat/chatId`);
  };
  const onLogin = () => {
    navigate(`/loginDev`);
  };
  const onSignUp = () => {
    navigate(`/signupDev`);
  };
  const onHouse = () => {
    navigate(`/house/houseId`);
  };
  const onHouseList = () => {
    navigate(`/houseList/address`);
  };
  return (
    <HeaderContainer>
      <Wrapper>
        <Column>
          <FontAwesomeIcon size={"2x"} icon={faHome} onClick={onHome} />
        </Column>
        <Column>
          <Text color="#555">강남구 잠원동</Text>
          <Icon>
            <FontAwesomeIcon size={"lg"} icon={faSearch} />
          </Icon>
        </Column>
        {/* 없어질 컬럼 (routing 편하게 할려고 만듬) */}
        <Column>
          <Icon>
            <FontAwesomeIcon size={"lg"} icon={faComment} onClick={onChat} />
          </Icon>
          <Icon>
            <FontAwesomeIcon size={"lg"} icon={faUserPlus} onClick={onSignUp} />
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
              size={"lg"}
              icon={faPaperPlane}
              onClick={onChatList}
            />
          </Icon>
          <Icon>
            <FontAwesomeIcon size={"lg"} icon={faUser} onClick={onProfile} />
          </Icon>
        </Column>
      </Wrapper>
    </HeaderContainer>
  );
}

export default Header;
