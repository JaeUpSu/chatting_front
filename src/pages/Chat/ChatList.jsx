import { Box, Container, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import ProtectedPage from "../../components/auth/LoginOnlyPage";
import { useEffect, useRef, useState } from "react";
import { getChatRoomList } from "../../services/api";
import ListChat from "../../components/List/ListChat";
import useUser from "../../hooks/useUser";

export default function ChatList() {
  const [chatRoomList, setChatRoomList] = useState([]);
  const { isLoading } = useQuery(["chatRoomList"], getChatRoomList, {
    retry: false,
    onSuccess: setChatRoomList,
  });
  const [read, setRead] = useState(false);
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const { userLoading, user: username } = useUser();
  const sender = username?.username;
  const params = useParams();
  const roomPk = params.chatRoomPk;
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      const socketUrl = `wss://bangsam.onrender.com/notifications?user=${user.id}`;
      socketRef.current = new WebSocket(socketUrl);
      setSocket(socketRef.current);

      socketRef.current.onopen = () => {
        if (params) {
          socketRef.current?.send(
            JSON.stringify({
              type: "read_msg",
              sender: sender,
              room: roomPk,
            })
          );
        }
      };

      socketRef.current.onmessage = (event) => {
        const new_chat = JSON.parse(event.data);
        if (new_chat.type === "new_data") {
          // Update the chat room list with the new last message
          const updatedChatRoomList = chatRoomList.map((room) => {
            if (room.id === new_chat.room_id) {
              return {
                ...room,
                lastMessage: new_chat.text,
                unread_messages: new_chat.unread_count,
                updated_at: new_chat.updated_at,
              };
            } else {
              return room;
            }
          });
          setChatRoomList(updatedChatRoomList);
        } else if (new_chat.type === "update_read") {
          setRead(true);
        }
      };

      return () => {
        socketRef.current?.close();
      };
    }
  }, [userLoading, chatRoomList, user, roomPk]);
  if (!isLoading && !userLoading) {
    return (
      <ProtectedPage>
        <Container h={"80vh"} maxW="container.xl">
          <Grid templateColumns={"1fr 1fr"} mt={"14"}>
            <Container maxW="container.lg" overflowY="scroll" maxHeight="70vh">
              {isLoading ? (
                <Text>Loading...</Text>
              ) : (
                <Box overflow="hidden">
                  {chatRoomList.length > 0 ? (
                    chatRoomList.map((room, index) => (
                      <ListChat
                        id={room.id}
                        key={index}
                        house={room.house}
                        users={room.users
                          .map((value) =>
                            user.name == value.name ? null : value
                          )
                          .filter((user) => user !== null)}
                        unread_messages={room.unread_messages}
                        updated_at={room.updated_at}
                        lastMessage={room.lastMessage}
                      />
                    ))
                  ) : (
                    <Text>채팅방이 없습니다.</Text>
                  )}
                </Box>
              )}
            </Container>
            {roomPk ? (
              <Outlet context={{ read, setRead }} />
            ) : (
              <VStack minH={"lg"} justifyContent={"center"}>
                <Heading color={"red.300"}>BangSam</Heading>
              </VStack>
            )}
          </Grid>
        </Container>
      </ProtectedPage>
    );
  }
}
