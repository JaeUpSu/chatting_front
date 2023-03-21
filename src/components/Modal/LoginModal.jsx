import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { login } from "../../services/api";
import SocialLogin from "../Button/SocialLogin";

export default function LoginModal({ isOpen, onClose }) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
  //   const { name, value } = event.currentTarget;
  //   if (name === "username") {
  //     setUsername(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   }
  // };
  // const onSubmit = (event: React.SyntheticEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   console.log(username, password);
  // };
  const textColor = useColorModeValue("red.500", "red.200");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(login, {
    onMutate: (data) => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      toast({
        title: "Log In Success",
        description: `Welcome!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: () => {
      reset();
    },
  });
  const onSubmit = ({ username, password }) => {
    mutation.mutate({ username, password });
  };
  // watch()  == username, password
  // handleSubmit() -> event.preventDefault(), validate data
  // formstate() -> 에러 확인 가능
  return (
    <Modal motionPreset={"scale"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="5" pt="10" pb={"10"}>
        <ModalHeader fontSize={"2xl"} textAlign={"center"} mt={"5"}>
          로그인
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={"5"} pb={"5"}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                required
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", { required: "아이디를 입력하세요." })}
                variant={"outline"}
                focusBorderColor="gray.300"
                placeholder="아이디"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                required
                type={"password"}
                isInvalid={Boolean(errors.username?.message)}
                {...register("password", {
                  required: "비밀번호를 압력하세요.",
                })}
                variant={"outline"}
                focusBorderColor="gray.300"
                placeholder="비밀번호"
              />
            </InputGroup>
            {mutation.isError ? (
              <Text color={textColor} textAlign={"center"}>
                Username or Password are wrong.
              </Text>
            ) : null}
            <Button
              // isLoading={mutation.isLoading}
              type="submit"
              mt="4"
              color={"white"}
              bg={"#ff404c"}
              _hover={{
                backgroundColor: "#ff7982",
              }}
              width={"100%"}
            >
              로그인
            </Button>
            <HStack
              fontSize={"sm"}
              pl={5}
              pr={5}
              w={"100%"}
              justifyContent={"center"}
            >
              <Link>아이디 찾기</Link>
              <Text>|</Text>
              <Link>비밀번호 찾기</Link>
              <Text>|</Text>
              <Link to={"/signup"} onClick={() => onClose()}>
                회원가입
              </Link>
            </HStack>
            <SocialLogin />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
