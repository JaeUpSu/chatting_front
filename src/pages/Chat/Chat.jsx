import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDidMountEffect } from "../../hooks/useDidMoutEffect";
import { getChatList } from "../../services/api";
import ChatMessage from "../../components/Card/ChatMessage";
import IconBtns from "../Home/IconBtns";
import { FaArrowLeft } from "react-icons/fa";
import ProtectedPage from "../../components/auth/ProtectedPage";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
const ChatRoom = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { chatRoomPk } = useParams();
  const socketRef = useRef(null);
  const { user } = useUser();
  const sender = user?.username;
  const QueryClient = useQueryClient();
  const chatBoxRef = useRef(null);
  const params = useParams().chatRoomPk;
  const [serverConnect, setServerConnect] = useState(true);
  const { read, setRead } = useOutletContext();
  useDidMountEffect(() => {
    if (read) {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.sender.username == sender
            ? { ...message, is_read: true }
            : message
        )
      );
      setRead(false);
    }
  }, [read, sender]);

  useEffect(() => {
    {
      socketRef.current?.readyState
        ? setServerConnect(true)
        : setServerConnect(false);
    }
  }, [socketRef.current?.readyState]);
  const onSubmit = () => {
    const text = watch("text");
    if (!text) return;
    socketRef.current?.send(JSON.stringify({ text, sender }));
    setValue("text", "");
  };

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = new WebSocket(
      // `ws://127.0.0.1:8000/ws/${chatRoomPk}`
      `wss://backend.bangsam.site/ws/${chatRoomPk}`
    );
    setSocket(socketRef.current);

    // Load chat history
    socketRef.current.onopen = () => {
      socketRef.current?.send(
        JSON.stringify({ type: "read_msg", sender: sender, room: params })
      );
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        setMessages(data.reverse());
      } else {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, data];
          if (user?.username !== data.sender.username) {
            return updatedMessages.map((message) => ({
              ...message,
              is_read: true,
            }));
          } else {
            return updatedMessages;
          }
        });
      }
    };

    // Clean up
    return () => {
      socketRef.current?.close();
    };
  }, [chatRoomPk]);

  const { isLoading, data } = useQuery([`chatList`, chatRoomPk], getChatList, {
    onSuccess: setMessages,
    cacheTime: 0,
  });

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Clear messages when chat room changes
    setMessages([]);
  }, [chatRoomPk]);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };
  const navigate = useNavigate();
  if (!isLoading) {
    return (
      <ProtectedPage>
        <Helmet>
          <title>{`채팅하기 - BangSam `}</title>
        </Helmet>
        <VStack
          as={"form"}
          w="100%"
          spacing="0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <VStack spacing={5} width={"100%"}>
            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              p={4}
              h={"65vh"}
              w={"100%"}
              overflowY="scroll"
              ref={chatBoxRef}
            >
              <HStack
                position={"fixed"}
                zIndex={1}
                justifyContent={"space-between"}
              >
                <Button onClick={() => navigate("../")}>
                  <FaArrowLeft />
                </Button>
              </HStack>
              {messages.map((message, i) =>
                message.sender.username === sender ? (
                  <Box key={i} mb={5} mr={4}>
                    <ChatMessage
                      key={i}
                      message={message}
                      isSentByCurrentUser={true}
                      isRead={message.is_read}
                      time={message.time}
                    />
                  </Box>
                ) : (
                  <Box key={i} mb={2} ml={4}>
                    <ChatMessage
                      key={i}
                      message={message}
                      isSentByCurrentUser={false}
                      isRead={message.is_read}
                      time={message.time}
                    />
                  </Box>
                )
              )}
            </Box>
            <Grid
              as={"div"}
              w={"100%"}
              templateColumns={"6fr 1fr"}
              gap="5"
              alignItems="center"
            >
              <Input
                onClick={handleClick}
                {...register("text", { required: true })}
                focusBorderColor="gray.300"
                // isDisabled={!serverConnect}
                placeholder={"채팅을 입력하세요."}
              />

              <Button type="submit">Send</Button>
            </Grid>
          </VStack>
        </VStack>
      </ProtectedPage>
    );
  } else {
    return (
      <Box>
        <Loading />
      </Box>
    );
  }
};

export default ChatRoom;
