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
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        alignItems={"flex-start"}
        w={{
          sm: "60vw",
          md: "45vw",
          lg: "40vw",
          xl: "35vw",
        }}
      >
        <VStack alignItems={"center"} spacing="5" mb={"2"} w="100%">
          <Avatar size={"xl"} src={avatar} border={"1px solid gray"} />
          <FormControl w="100%">
            <HStack>
              <FormLabel
                color="blackAlpha.700"
                fontWeight="semibold"
                w="40%"
                m="0px"
              >
                사진 업로드
              </FormLabel>
              <Input
                m="0px"
                w="100%"
                type="file"
                {...register("avatar")}
                onChange={handleAvatarChange}
              />
            </HStack>
          </FormControl>
        </VStack>
        <FormControl isRequired>
          <FormLabel color="blackAlpha.700" fontWeight="semibold">
            ID
          </FormLabel>
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
          <FormLabel color="blackAlpha.700" fontWeight="semibold">
            비밀번호
          </FormLabel>
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
          <FormLabel color="blackAlpha.700" fontWeight="semibold">
            이름
          </FormLabel>
          <Input type="text" {...register("name", { required: true })} />
          {errors.name && (
            <Text fontSize="xs" color="red.500">
              이름을 입력해주세요.
            </Text>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="blackAlpha.700" fontWeight="semibold">
            전화번호
          </FormLabel>
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
          <FormLabel fontWeight="semibold">이메일주소</FormLabel>
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
            <FormLabel color="blackAlpha.700" fontWeight="semibold">
              성별
            </FormLabel>
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
          공인중개사
        </Checkbox>

        <Button
          isLoading={
            uploadURLMutation.isLoading ||
            uploadImageMutation.isLoading ||
            validateCheckMutation.isLoading ||
            signUpMutation.isLoading
          }
          backgroundColor="#ff404c"
          color="white"
          type="submit"
          width={"100%"}
        >
          가입하기
        </Button>
      </VStack>
    </Container>
  );
}
