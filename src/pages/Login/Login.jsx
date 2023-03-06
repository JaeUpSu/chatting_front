import React from "react";
import { Box, Input, Button, Center, Heading } from "@chakra-ui/react";

function Login() {
  return (
    <Center>
      <Box color="#F7FAFC" bg="#FFD2B2" pt="100px" pb="300px" w="600px">
        <Center>
          <Heading fontWeight="700" fontSize="48px" color="black">
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
              mb="5px"
            />
          </Center>
          <Center>
            <Input
              type="password "
              placeholder="비밀번호"
              w="350px"
              h="40px"
              mb="5px"
            />
          </Center>
          <Center>
            <Box w="350px" h="20px" mb="20px" color="black" fontSize="13px">
              <Input type="checkbox" color="block" />
              아이디저장
            </Box>
          </Center>
          <Center>
            <Button
              w="355px"
              h="40px"
              bg="#FFA15D"
              type="submit"
              value="로그인"
            >
              로그인
            </Button>
          </Center>
        </Box>
        <Center>
          <Box mt="5px">
            <Button border="none" type="submit" bg="#FFD2B2" value="id">
              아이디 찾기
            </Button>
            ｜
            <Button border="none" type="submit" bg="#FFD2B2" value="password">
              비밀번호 찾기
            </Button>
            ｜
            <Button border="none" type="submit" bg="#FFD2B2" value="join">
              회원가입
            </Button>
          </Box>
        </Center>
      </Box>
    </Center>
  );
}

export default Login;
