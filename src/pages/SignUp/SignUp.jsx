import React from "react";
import { Box, Input, Button, Center, Heading, Text } from "@chakra-ui/react";

function SignUp() {
  const [show, setShow] = React.useState(false);

  return (
    <Center>
      <Box color="#F7FAFC" bg="#FFD2B2" pt="100px" pb="300px" w="600px">
        <Center>
          <Heading
            fontWeight="600"
            fontSize="35px"
            color="black"
            pb="100px"
            mt="50px"
            w="350px"
            h="70px"
          >
            회원가입
          </Heading>
        </Center>

        <Box>
          <Center>
            <Text w="350px" h="10px" color="black" mb="20px">
              아이디
            </Text>
          </Center>
          <Center>
            <Input type="email" w="350px" h="40px" mb="5px" bg="white" />
          </Center>
          <Center>
            <Text w="350px" h="10px" color="black" mb="20px">
              비밀번호
            </Text>
          </Center>
          <Center>
            <Input
              type={show ? "text" : "password"}
              w="350px"
              h="40px"
              mb="5px"
              bg="white"
            />
          </Center>

          <Center>
            <Text w="350px" h="10px" color="black" mb="20px">
              비밀번호 확인
            </Text>
          </Center>
          <Center>
            <Input
              type={show ? "text" : "password"}
              w="350px"
              h="40px"
              mb="50px"
              bg="white"
            />
          </Center>

          <Center>
            <Button
              w="355px"
              h="40px"
              bg="#FFA15D"
              color="black"
              type="submit"
              value="가입하기"
            >
              가입하기
            </Button>
          </Center>
        </Box>
      </Box>
    </Center>
  );
}

export default SignUp;
