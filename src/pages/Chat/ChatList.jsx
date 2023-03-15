import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import ProtectedPage from "../../components/auth/LoginOnlyPage";
import { useState } from "react";
import { getChatRoomList } from "../../services/api";
import ListChat from "../../components/List/ListChat";
import useUser from "../../hooks/useUser";

export default function ChatList() {
  const [chatRoomList, setChatRoomList] = useState([]);
  const { isLoading, data } = useQuery(["chatRoomList"], getChatRoomList, {
    onSuccess: setChatRoomList,
  });
  const params = useParams();
  const roomPk = params.chatRoomPk;
  const { user } = useUser();
  return (
    <ProtectedPage>
      <Container h={"80vh"} maxW="container.xl">
        <Grid templateColumns={"1fr 1fr"} mt={"14"}>
          <Container
            maxW="container.lg"
            mt={4}
            overflowY="scroll"
            maxHeight="70vh"
          >
            <Heading size="md" mb={4}>
              채팅방
            </Heading>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                {chatRoomList.map((room, index) => (
                  <ListChat
                    id={room.id}
                    users={room.users
                      .map((value) => (user.name == value.name ? null : value))
                      .filter((user) => user !== null)}
                    unread_messages={room.unread_messages}
                    updated_at={room.updated_at}
                    lastMessage={room.lastMessage}
                  />
                ))}
              </Box>
            )}
          </Container>
          <Outlet />
        </Grid>
      </Container>
    </ProtectedPage>
  );
}
