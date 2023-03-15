import {
  Avatar,
  AvatarBadge,
  Box,
  HStack,
  LightMode,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const ChatMessage = ({ message, isSentByCurrentUser, isRead, time }) => {
  const align = isSentByCurrentUser ? "flex-end" : "flex-start";
  const borderRadius = isSentByCurrentUser
    ? "10px 0 10px 10px"
    : "0 10px 10px 10px";

  const bg = isSentByCurrentUser ? "#ffd9db" : "gray.200";
  return (
    <VStack
      borderRadius={borderRadius}
      // p={2}
      maxW="100%"
      alignItems={align}
      justifyContent={align}
    >
      {!isSentByCurrentUser ? (
        <HStack>
          <Avatar
            size={"md"}
            src={message.sender.avatar}
            name={message.sender.username}
          />
          <VStack alignItems={"flex-start"} p="2">
            <Text>{message.sender.name}</Text>
            <HStack alignItems={"flex-end"}>
              <Box
                bg={bg}
                p={4}
                pt={1}
                pb={1}
                rounded="md"
                // maxWidth="80%"
                wordBreak="break-word"
              >
                <LightMode>
                  <Text color="black">{message.text}</Text>
                </LightMode>
              </Box>
              <Text as={"span"} fontSize="2xs" textAlign={"right"}>
                {time}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      ) : (
        <VStack mr={4} alignItems={"flex-end"}>
          <HStack alignItems={"flex-end"}>
            <VStack spacing={0} alignItems={"flex-end"}>
              {!isRead ? (
                <Text fontSize={"xs"} color={"#ff7982"} fontWeight={"bold"}>
                  1
                </Text>
              ) : null}
              <Text as={"span"} fontSize="2xs" textAlign={"right"}>
                {time}
              </Text>
            </VStack>
            <Box
              bg={bg}
              p={4}
              pt={1}
              pb={1}
              rounded="md"
              // maxWidth="80%"
              wordBreak="break-word"
            >
              <LightMode>
                <Text color="black">{message.text}</Text>
              </LightMode>
            </Box>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export default ChatMessage;
