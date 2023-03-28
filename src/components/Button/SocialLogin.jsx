import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import Cookie from "js-cookie";

const SocialLogin = () => {
  const kakaoParams = {
    client_id: "69ba16ba77556c01d4a4ea9911fc06ad",
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:3000/social/kakao"
        : "https://bangsam.site/social/kakao",
    response_type: "code",
  };
  const paramsKakao = new URLSearchParams(kakaoParams).toString();
  const naverParams = {
    response_type: "code",
    client_id: "1Vm0j0Ggt3_VZer8jmHA",

    redirect_uri:
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:3000/social/naver"
        : "https://bangsam.site/social/naver",
    state: "OzCoding",
  };
  // https://nid.naver.com/oauth2.0/authorize
  // ?response_type=code&
  // client_id=CLIENT_ID&
  // state=STATE_STRING&
  // redirect_uri=CALLBACK_URL

  const paramsNaver = new URLSearchParams(naverParams).toString();

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
        as="a"
        href={`https://nid.naver.com/oauth2.0/authorize?${paramsNaver}`}
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
        href={`https://kauth.kakao.com/oauth/authorize?${paramsKakao}`}
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
