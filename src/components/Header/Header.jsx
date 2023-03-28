import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import {
  Avatar,
  HStack,
  Text,
  useDisclosure,
  Box,
  Image,
} from "@chakra-ui/react";
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
    <HStack
      justifyContent={"space-between"}
      px={"7"}
      py={"4"}
      pl="5"
      alignItems="center"
    >
      <Box w="40px" onClick={onHome} cursor="pointer">
        <Image src="https://velog.velcdn.com/images/hugh0223/post/b0f1b39b-9e4f-43c2-98fb-66579a716003/image.png" />
      </Box>
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
