import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useInterval,
  VStack,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function SignUpSuceess() {
  const navigate = useNavigate();
  const [time, setTime] = useState(10);
  useInterval(() => {
    if (time >= 0) {
      setTime(time - 1);
    }
  }, 1000);
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Box>
      <Container mt={"36"}>
        <VStack spacing={"10"}>
          <Heading>회원가입이 완료되었습니다.</Heading>
          <Box color={"telegram.300"}>
            <FaCheck size={"50"} />
          </Box>
          <Link to="/">
            <Button size={"lg"} variant={"outline"} colorScheme={"telegram"}>
              Go home &rarr;
            </Button>
          </Link>
          <Text color={"skyblue"}>{time}초 뒤 메인화면으로 이동합니다.</Text>
        </VStack>
      </Container>
    </Box>
  );
}
