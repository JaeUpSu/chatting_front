import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  VStack,
  Button,
  Box,
  Avatar,
  Container,
  Text,
  HStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  getUploadURL,
  signup,
  signUpUser,
  uploadImage,
  validateCheck,
} from "../../services/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const signUpMutation = useMutation(signUpUser, {
    onMutate: (data) => {
      console.log("sign up mutation");
    },
    onSuccess: (data) => {
      toast({
        title: "회원가입 성공",
        description: `환영합니다.`,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      navigate("/signUpSuccess");
    },
    onError: (error) => {
      const detail_error = Object.values(error.response.data);
      toast({
        title: "회원가입 실패",
        description: `${detail_error[0]}`,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }) => {
      setValue("avatar", result.variants[0]);
      signUpMutation.mutate(watch());
      // watch("avatar") = result.variants;
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("avatar"),
      });
    },
  });
  const validateCheckMutation = useMutation(validateCheck, {
    onSuccess: ({ result }) => {
      uploadURLMutation.mutate();
    },
    onError: (error) => {
      const detail_error = Object.values(error.response.data);
      toast({
        title: "회원가입 실패",
        description: `${detail_error[0]}`,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    },
  });
  const onSubmit = (data) => {
    if (avatar) {
      validateCheckMutation.mutate(data);
    } else {
      signUpMutation.mutate(data);
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
    <Container display={"flex"} justifyContent={"center"}>
      <VStack
        as={"form"}
        mt={"3"}
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        alignItems={"flex-start"}
        w={"33vw"}
      >
        <HStack alignItems={"flex-end"} spacing="5" mb={"5"}>
          <Avatar size={"xl"} src={avatar} border={"1px solid gray"} />
          <FormControl>
            <FormLabel>사진 업로드</FormLabel>
            <Input
              type="file"
              {...register("avatar")}
              onChange={handleAvatarChange}
            />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel>ID</FormLabel>
          <Flex align="center">
            <Input {...register("username", { required: true })} />
            {/* <Button ml="3" colorScheme="red">
              중복확인
            </Button> */}
          </Flex>
          {errors.username && (
            <Text fontSize="xs" color="red.500">
              아이디를 입력해주세요.
            </Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>비밀번호</FormLabel>
          <Flex align="center">
            <Input
              type="password"
              {...register("password", { required: true })}
            />
            {/* <Button ml="3" colorScheme="red">
              중복확인
            </Button> */}
          </Flex>
          {errors.password && (
            <Text fontSize="xs" color="red.500">
              패스워드를 확인해주세요.
            </Text>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>이름</FormLabel>
          <Input type="text" {...register("name", { required: true })} />
          {errors.name && (
            <Text fontSize="xs" color="red.500">
              이름을 입력해주세요.
            </Text>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>전화번호</FormLabel>
          <Input
            type={"number"}
            {...register("phone_number", { required: true })}
          />
          {errors.phone_number && (
            <Text fontSize="xs" color="red.500">
              숫자만 입력해주세요.
            </Text>
          )}
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>이메일주소</FormLabel>
          <Input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <Text fontSize="xs" color="red.500">
              이메일주소를 입력해주세요.
            </Text>
          )}
        </FormControl>

        <FormControl isRequired>
          <HStack alignItems={"flex-start"}>
            <FormLabel>성별</FormLabel>
            <RadioGroup>
              <Radio {...register("gender")} mr={5} value="male">
                남
              </Radio>
              <Radio {...register("gender")} value="female">
                여
              </Radio>
            </RadioGroup>
          </HStack>
          {errors.gender && (
            <Text fontSize="xs" color="red.500">
              Please select your gender.
            </Text>
          )}
        </FormControl>
        <Checkbox {...register("isHost")} mr={"10"}>
          공인중개사입니다.
        </Checkbox>

        <Button
          isLoading={
            uploadURLMutation.isLoading ||
            uploadImageMutation.isLoading ||
            validateCheckMutation.isLoading ||
            signUpMutation.isLoading
          }
          colorScheme="blue"
          type="submit"
          width={"100%"}
        >
          Submit
        </Button>
      </VStack>
    </Container>
  );
}
