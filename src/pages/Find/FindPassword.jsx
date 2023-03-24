import { useState } from "react";
import {
  Input,
  Button,
  Stack,
  Box,
  Text,
  Heading,
  Container,
  VStack,
  useToast,
  InputLeftElement,
  InputGroup,
  InputRightAddon,
  InputAddon,
  InputLeftAddon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { findPassword, newPassword } from "../../services/api";
import { type } from "@testing-library/user-event/dist/type";
import { FaEye, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FindPassword() {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const [firstVisible, setFirstVisible] = useState(false);
  const [secondVisible, setSecondVisible] = useState(false);
  const [password, setPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const newPasswordMutation = useMutation(newPassword, {
    onSuccess: () => {
      toast({
        title: "성공",
        description: "비밀 번호가 변경되었습니다. 3초 뒤 홈으로 이동합니다.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: ({ response }) => {
      toast({
        title: "실패",
        description: response.data.detail,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    },
  });

  const mutation = useMutation(findPassword, {
    onSuccess: () => {
      toast({
        title: "인증 성공",
        description: "비밀 번호를 재 설정해주세요.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setPassword(true);
    },
    onError: () => {
      toast({
        title: "인증 실패",
        description: "일치하는 회원 정보가 존재하지 않습니다.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    },
  });
  const onSubmit = (data) => {
    const { password, check_password } = data;
    if (password) {
      if (password !== check_password) {
        toast({
          title: "변경 실패",
          description: "입력한 비밀번호가 서로 다릅니다.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        return;
      }
      newPasswordMutation.mutate(data);
      return;
    }
    mutation.mutate(data);
  };
  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={8}>
        <Heading as="h2" size="lg" mb={4}>
          비밀번호 찾기
        </Heading>

        <FormControl id="id">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            ID
          </FormLabel>
          <Input
            isDisabled={password}
            type="text"
            {...register("id", { required: true })}
            placeholder="아이디을 입력하세요"
          />
        </FormControl>

        <FormControl id="name">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            이름
          </FormLabel>
          <Input
            isDisabled={password}
            type="text"
            {...register("name", { required: true })}
            placeholder="이름을 입력하세요"
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            이메일
          </FormLabel>
          <Input
            isDisabled={password}
            type="email"
            {...register("email", { required: true })}
            placeholder="이메일을 입력하세요"
          />
        </FormControl>

        <FormControl id="phone_number">
          <FormLabel mb="4" fontWeight="semibold" color="blackAlpha.700">
            전화번호
          </FormLabel>
          <Input
            isDisabled={password}
            type="number"
            {...register("phone_number", { required: true })}
            placeholder="전화번호를 입력하세요"
          />
        </FormControl>
        {!password ? (
          <VStack w={"100%"}>
            <Button
              type="submit"
              w={"100%"}
              backgroundColor="#ff404c"
              color="white"
              isLoading={mutation.isLoading}
            >
              비밀번호 찾기
            </Button>
          </VStack>
        ) : (
          <VStack spacing={"8"} w={"100%"}>
            <InputGroup>
              <Input
                {...register("password", { required: true })}
                type={firstVisible ? "text" : "password"}
                placeholder="비밀번호를 재설정하세요"
              />
              <InputRightAddon
                children={
                  <Box
                    color="gray.500"
                    cursor={"pointer"}
                    onClick={() => setFirstVisible(!firstVisible)}
                  >
                    <FaEye />
                  </Box>
                }
              />
            </InputGroup>
            <InputGroup>
              <Input
                {...register("check_password", { required: true })}
                type={secondVisible ? "text" : "password"}
                placeholder="비밀번호를 확인"
              />
              <InputRightAddon
                children={
                  <Box
                    color="gray.500"
                    cursor={"pointer"}
                    onClick={() => setSecondVisible(!secondVisible)}
                  >
                    <FaEye />
                  </Box>
                }
              />
            </InputGroup>
            <Button
              type="submit"
              w={"100%"}
              backgroundColor="#ff404c"
              color="white"
              isLoading={newPasswordMutation.isLoading}
            >
              비밀번호 재설정
            </Button>
            {error ? <Text>{error}</Text> : null}
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
