import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import { Avatar, HStack, Text, useDisclosure, Flex } from "@chakra-ui/react";
import IconBtns from "../../pages/Home/IconBtns";
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
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  return (
    <HStack justifyContent={"space-between"} px={"7"} py={"4"}>
      <Text onClick={onHome} fontSize="2xl" color={"#ff404c"} cursor="pointer">
        BangSam
      </Text>
      {!isLoggedIn && !userLoading ? (
        <Avatar cursor={"pointer"} onClick={() => onLoginOpen()} />
      ) : (
        <UserInfoMenu user={user} />
      )}
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </HStack>
  );
}

export default Header;
