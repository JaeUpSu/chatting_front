import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg={"gray.100"} justifyContent="center" border={"1px"} minH="100vh">
      <Heading>Page Not Found 404</Heading>
      <Text>잘못된 요청입니다.</Text>
      <Link to="/">
        <Button size={"lg"} variant={"outline"} colorScheme={"telegram"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
