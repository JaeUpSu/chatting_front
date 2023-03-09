import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <VStack width={"100%"} spacing={"5"}>
      <HStack width={"100%"} spacing={"5"}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color="gray.500"
          fontSize={"xs"}
          as="b"
        >
          or
        </Text>
        <Divider />
      </HStack>
      <Button
        // leftIcon={<NaverIcon />}
        width={"100%"}
        backgroundColor="rgb(3, 199, 90)"
        color={"white"}
        _hover={{
          backgroundColor: "rgb(15, 171, 64)",
        }}
      >
        NAVER 로그인
      </Button>
      <Button
        as="a"
        width={"100%"}
        colorScheme={"yellow"}
        leftIcon={<FaComment />}
      >
        카카오 로그인
      </Button>
    </VStack>
  );
};
export default SocialLogin;
