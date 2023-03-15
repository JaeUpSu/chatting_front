import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

export default function ListChat({
  id,
  users,
  unread_messages,
  updated_at,
  lastMessage,
}) {
  const navigate = useNavigate();
  console.log(users);
  const { user } = useUser();
  const handleChatClick = (id) => {
    navigate(`/chatlist/${id}`);
  };
  return (
    <HStack
      p="5"
      spacing={"5"}
      borderTopWidth="1px"
      borderColor="gray.200"
      onClick={() => handleChatClick(id)}
    >
      <Avatar name={users[0]?.name} src={users[0]?.avatar} />
      <VStack alignItems={"flex-start"}>
        <Heading size="sm" mb={2}>
          {users[0]?.name} 님과의 채팅방
          {unread_messages !== 0 ? (
            <Text
              as="span"
              p={1.5}
              ml={3}
              rounded={"20%"}
              bg="red.300"
              width={"100%"}
              textAlign="center"
            >
              + {unread_messages}
            </Text>
          ) : null}
        </Heading>

        <Text fontSize="sm" color="gray.500">
          {lastMessage}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Last message :{" "}
          {updated_at.split(".")[0].split("T")[0] +
            "  /  " +
            updated_at.split(".")[0].split("T")[1]}
        </Text>
      </VStack>
    </HStack>
  );
}
