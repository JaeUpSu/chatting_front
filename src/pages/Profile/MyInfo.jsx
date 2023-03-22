import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ChangePasswordModal from "../../components/Modal/ChangePasswordModal";
import useUser from "../../hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../../services/api";
import { FaComment } from "react-icons/fa";

export default function MyInfo() {
  const { user } = useUser();
  const {
    isOpen: isPasswordEditOpen,
    onClose: onPasswordEditClose,
    onOpen: onPasswordEditOpen,
  } = useDisclosure();
  const [editedField, setEditedField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();

  const toastId = useRef();
  const mutation = useMutation(editUser, {
    onMutate: () => {
      toastId.current = toast({
        title: "수정 중",
        status: "loading",
        position: "top",
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries(["me"]);
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "수정 완료",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "수정 실패",
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    },
  });
  const handleEditButtonClick = (field) => {
    setEditedField(field);
    setEditedValue(user[field]);
    reset();
  };

  const handleSaveButtonClick = () => {
    onSubmit(editedField, watch(editedField));
    setEditedField(null);
    setEditedValue("");
    reset();
  };

  const handleCancelButtonClick = () => {
    setEditedField(null);
    setEditedValue("");
    reset();
  };

  const { register, handleSubmit, reset, watch } = useForm();
  const onSubmit = (type, value) => {
    let object = {};
    object[type] = value;
    mutation.mutate(object);
  };
  const editProfile = () => {
    console.log(1);
  };

  return (
    <Box
      mt={"10"}
      alignItems={"center"}
      justifyContent="center"
      h="70vh"
      overflowY="scroll"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid templateColumns={{ lg: "1fr 1fr", sm: "1fr" }} w={"100%"}>
        <VStack alignItems={"center"} justifyContent="center" spacing={"5"}>
          <Avatar boxSize={"xs"} src={user?.avatar} />
          <VStack spacing={"5"}>
            <Heading size={"md"}>{user?.name}</Heading>
            <Button size={"sm"} onClick={editProfile}>
              Edit Profile
            </Button>
          </VStack>
        </VStack>
        <VStack h={"60vh"} justifyContent={"center"} spacing={"10"} pr="20">
          <VStack w={"100%"} mt="10">
            <HStack justifyContent={"space-between"} w={"100%"}>
              <HStack spacing={"5"}>
                <Text minW={16} fontWeight={"bold"}>
                  아이디{" "}
                </Text>
                <Text>
                  {" "}
                  {user?.username}
                  {user?.is_naver ? (
                    <Text
                      as={"span"}
                      color={"white"}
                      backgroundColor="rgb(3, 199, 90)"
                      p={2}
                      ml="3"
                    >
                      Naver 로그인 계정
                    </Text>
                  ) : user?.is_kakao ? (
                    <Text
                      as={"span"}
                      color={"rgb(49,22,22)"}
                      p={2}
                      ml="3"
                      // color="yellow"
                      bg={"rgb(255,255,12)"}
                    >
                      Kakao 로그인 계정
                    </Text>
                  ) : null}
                </Text>
              </HStack>
            </HStack>
            {!user?.is_naver && !user?.is_kakao ? (
              <HStack justifyContent={"space-between"} w={"100%"}>
                <HStack spacing={"5"}>
                  <Text
                    minW={16}
                    overflowWrap={"break-word"}
                    fontWeight={"semibold"}
                  >
                    비밀번호
                  </Text>
                  <Text> *********</Text>
                </HStack>
                <Button size={"sm"} onClick={onPasswordEditOpen}>
                  수정
                </Button>
              </HStack>
            ) : null}

            <HStack justifyContent={"space-between"} w={"100%"}>
              <HStack spacing={"5"}>
                <Text minW={16} fontWeight={"semibold"}>
                  이름
                </Text>
                {editedField === "name" ? (
                  <Input {...register("name", { required: true })} />
                ) : (
                  <Text> {user?.name}</Text>
                )}
              </HStack>
              {editedField === "name" ? (
                <HStack>
                  <Button
                    type="submit"
                    size={"sm"}
                    onClick={handleSaveButtonClick}
                  >
                    저장
                  </Button>
                  <Button size={"sm"} onClick={handleCancelButtonClick}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => handleEditButtonClick("name")}
                >
                  수정
                </Button>
              )}
            </HStack>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <HStack spacing={"5"}>
                <Text minW={16} fontWeight={"semibold"}>
                  전화번호
                </Text>
                {editedField === "phone_number" ? (
                  <Input {...register("phone_number", { required: true })} />
                ) : (
                  <Text> {user?.phone_number}</Text>
                )}
              </HStack>
              {editedField === "phone_number" ? (
                <HStack>
                  <Button
                    type="submit"
                    size={"sm"}
                    onClick={handleSaveButtonClick}
                  >
                    저장
                  </Button>
                  <Button size={"sm"} onClick={handleCancelButtonClick}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => handleEditButtonClick("phone_number")}
                >
                  수정
                </Button>
              )}
            </HStack>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <HStack spacing={"5"}>
                <Text minW={16} fontWeight={"semibold"}>
                  이메일
                </Text>
                {editedField === "email" ? (
                  <Input {...register("email", { required: true })} />
                ) : (
                  <Text> {user?.email}</Text>
                )}
              </HStack>
              {editedField === "email" ? (
                <HStack>
                  <Button
                    type="submit"
                    size={"sm"}
                    onClick={handleSaveButtonClick}
                  >
                    저장
                  </Button>
                  <Button size={"sm"} onClick={handleCancelButtonClick}>
                    취소
                  </Button>
                </HStack>
              ) : (
                <Button
                  size={"sm"}
                  onClick={() => handleEditButtonClick("email")}
                >
                  수정
                </Button>
              )}
            </HStack>
          </VStack>

          <VStack
            w="100%"
            alignItems={"flex-start"}
            spacing={5}
            pb={{ sm: 20, md: 0 }}
          >
            <HStack spacing={"5"}>
              <Heading size={"md"}>자기소개</Heading>
              <Button boxSize={"7"} fontSize={"sm"}>
                편집
              </Button>
            </HStack>
            <Textarea
              variant={"filled"}
              // isDisabled
              placeholder="Enter your text here"
              resize="vertical"
              h="32"
            />
          </VStack>
        </VStack>
      </Grid>
      <ChangePasswordModal
        isOpen={isPasswordEditOpen}
        onClose={onPasswordEditClose}
      />
    </Box>
  );
}
