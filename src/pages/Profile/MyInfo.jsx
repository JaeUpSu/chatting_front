import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
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
import { editUser, getUploadURL, uploadImage } from "../../services/api";
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

  const uploadImageMutation = useMutation(uploadImage, {
    onMutate: () => {
      toastId.current = toast({
        title: "업로드 중",
        status: "loading",
        position: "top",
        isClosable: true,
      });
    },
    onSuccess: ({ result }) => {
      setValue("avatar", result.variants[0]);
      mutation.mutate({ avatar: watch("avatar") });
      // watch("avatar") = result.variants;
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onMutate: () => {
      toastId.current = toast({
        title: "수정 중",
        status: "loading",
        duration: "3000",
        position: "top",
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("avatar"),
      });
    },
  });
  const mutation = useMutation(editUser, {
    onMutate: () => {
      if (editedField !== "avatar") {
        toastId.current = toast({
          title: "수정 중",
          status: "loading",
          position: "top",
        });
      }
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
      setEditedField(null);
      setEditedValue("");
      reset();
    },
    onError: (e) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "수정 실패",
          description: e.response.data[editedField],
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

  const handleCancelButtonClick = () => {
    if (editedField === "avatar") {
      setAvatar(user?.avatar);
    }
    setEditedField(null);
    setEditedValue("");
    reset();
  };
  const [avatar, setAvatar] = useState(user?.avatar);
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const onSubmit = (data) => {
    if (editedField !== "avatar") {
      mutation.mutate(data);
    } else {
      uploadURLMutation.mutate();
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      mt={"10"}
      alignItems={"center"}
      justifyContent="center"
      h="70vh"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid templateColumns={{ lg: "1fr 1fr", sm: "1fr" }} w={"100%"}>
        <VStack alignItems={"center"} justifyContent="center" spacing={"5"}>
          <Avatar boxSize={"xs"} src={avatar} />
          <VStack spacing={"5"}>
            <Heading size={"md"} noOfLines="1">
              {user?.name}
            </Heading>
            {editedField === "avatar" ? (
              <VStack>
                <Input
                  type="file"
                  {...register("avatar", { required: true })}
                  onChange={handleAvatarChange}
                />
                <HStack>
                  <Button
                    type="submit"
                    size={"sm"}
                    isLoading={
                      mutation.isLoading ||
                      uploadImageMutation.isLoading ||
                      uploadURLMutation.isLoading
                    }
                  >
                    저장
                  </Button>
                  <Button size={"sm"} onClick={handleCancelButtonClick}>
                    취소
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Button
                size={"sm"}
                onClick={() => handleEditButtonClick("avatar")}
              >
                프로필 사진 수정
              </Button>
            )}
          </VStack>
        </VStack>
        <VStack h={"60vh"} justifyContent={"center"} spacing={"10"} pr="20">
          <VStack w={"100%"} mt="10">
            <HStack justifyContent={"space-between"} w={"100%"}>
              <HStack spacing={"5"}>
                <Text minW={16} fontWeight={"bold"} noOfLines="1">
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
                <Text minW={16} fontWeight={"semibold"} noOfLines="1">
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
                    isLoading={mutation.isLoading}
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
                    isLoading={mutation.isLoading}
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
                <Text minW={16} fontWeight={"semibold"} noOfLines="1">
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
                    isLoading={mutation.isLoading}
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
            <HStack spacing={"5"} justifyContent="space-between" w="100%">
              <Heading size={"md"}>자기소개</Heading>
              {editedField === "desc" ? (
                <ButtonGroup>
                  <Button
                    type="submit"
                    size={"sm"}
                    fontSize={"sm"}
                    isLoading={mutation.isLoading}
                  >
                    저장
                  </Button>
                  <Button
                    size={"sm"}
                    fontSize={"sm"}
                    onClick={handleCancelButtonClick}
                  >
                    취소
                  </Button>
                </ButtonGroup>
              ) : (
                <Button
                  size={"sm"}
                  fontSize={"sm"}
                  onClick={() => handleEditButtonClick("desc")}
                >
                  수정
                </Button>
              )}
            </HStack>
            {editedField === "desc" ? (
              <Textarea
                {...register("desc")}
                variant={"filled"}
                placeholder="Enter your text here"
                resize="vertical"
                h="32"
              />
            ) : (
              <Text noOfLines={4}>{user?.desc ?? "자기소개가 없습니다"}</Text>
            )}
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
