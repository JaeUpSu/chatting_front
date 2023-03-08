import React from "react";
import {
  Box,
  Input,
  Button,
  Center,
  Heading,
  Checkbox,
  git,
} from "@chakra-ui/react";

function Login() {
  const [show, setShow] = React.useState(false);

  return (
    <Center>
      <Box color="#F7FAFC" bg="#FFD2B2" pt="100px" pb="300px" w="600px">
        <Center>
          <Heading
            fontWeight="600"
            fontSize="35px"
            color="black"
            pb="110px"
            mt="50px"
            w="350px"
            h="70px"
          >
            로그인
          </Heading>
        </Center>

        <Box>
          <Center>
            <Input
              type="email"
              placeholder="아이디"
              w="350px"
              h="40px"
              mb="10px"
              bg="white"
              color="black"
            />
          </Center>
          <Center>
            <Input
              type={show ? "text" : "password"}
              placeholder="비밀번호"
              w="350px"
              h="40px"
              mb="10px"
              color="black"
              bg="white"
            />
          </Center>
          <Center>
            <Box w="350px" h="20px" mb="30px" color="black" fontSize="10px">
              <Checkbox size="md">아이디 저장</Checkbox>
            </Box>
          </Center>
          <Center>
            <Button
              w="355px"
              h="40px"
              bg="#FFA15D"
              type="submit"
              value="로그인"
              color="black"
            >
              로그인
            </Button>
          </Center>
        </Box>
        <Center>
          <Box mt="5px">
            <Button
              border="none"
              type="submit"
              bg="#FFD2B2"
              value="id"
              color="black"
              _hover={{
                backgroundColor: "transparent",
              }}
            >
              아이디 찾기
            </Button>
            ｜
            <Button
              border="none"
              type="submit"
              bg="#FFD2B2"
              value="password"
              color="black"
              _hover={{
                backgroundColor: "transparent",
              }}
            >
              비밀번호 찾기
            </Button>
            ｜
            <Button
              border="none"
              type="submit"
              bg="#FFD2B2"
              value="join"
              color="black"
              _hover={{
                backgroundColor: "transparent",
              }}
            >
              회원가입
            </Button>
          </Box>
        </Center>
      </Box>
    </Center>
  );
}

export default Login;
