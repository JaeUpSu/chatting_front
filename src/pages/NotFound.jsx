import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  keyframes,
  Text,
  usePrefersReducedMotion,
  VStack,
} from "@chakra-ui/react";
import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function NotFound() {
  const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 15s linear`;
  return (
    <HStack bg="white" justifyContent="space-evenly" minH="100vh">
      <VStack h="100vh" justifyContent={"center"}>
        <Image
          position={"relative"}
          left="10"
          src="https://cdn.discordapp.com/attachments/1057626057227903036/1088392281092005918/ufo.png"
          h={"40vh"}
        />
        <Image
          position={"relative"}
          bottom="10"
          animation={animation}
          h={"30vh"}
          src="https://cdn.discordapp.com/attachments/1057626057227903036/1088393831289995315/astronaut-ingravity.png"
        />
      </VStack>
      <VStack
        h={"100vh"}
        alignItems={"flex-start"}
        justifyContent="center"
        position={"relative"}
        spacing="10"
        bottom="30"
      >
        <VStack alignItems={"flex-start"}>
          <Heading size={"4xl"}>404 </Heading>
          <Heading size={"2xl"}>NOT FOUND </Heading>
        </VStack>
        <Link to="/">
          <Button
            size={"lg"}
            position="relative"
            top={"20"}
            variant={"solid"}
            bg={"gray.400"}
          >
            Go home &rarr;
          </Button>
        </Link>
      </VStack>
    </HStack>
  );
}
