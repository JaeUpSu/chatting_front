import {
  Box,
  Button,
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services/api";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const mutation = useMutation(changePassword, {
    onSuccess: (d) => {
      reset();
      onClose();
      toast({
        title: "비밀번호가 변경되었습니다.",
        position: "top",
      });
    },
    onError: (e) => {
      toast({
        title: "비밀번호를 확인하세요.",
        position: "top",
      });
    },
  });
  const onSubmit = (e) => {
    mutation.mutate(e);
  };

  return (
    <Modal motionPreset="scale" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent boxSize={"sm"}>
        <ModalHeader fontSize={"2xl"} textAlign={"center"} mt="10">
          비밀번호 수정
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form">
          <VStack justifyContent="space-evenly" h={"80%"}>
            <VStack w={"100%"} spacing="5">
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color="gray.500">
                      <FaLock />
                    </Box>
                  }
                />
                <Input
                  {...register("old_password", { required: true })}
                  placeholder="현재 비밀번호를 입력하세요."
                  type={"password"}
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
                  {...register("new_password", { required: true })}
                  placeholder="새로운 비밀번호를 입력하세요."
                  type={"password"}
                />
              </InputGroup>
            </VStack>
            {mutation.isError ? (
              <Text color={"red.400"} textAlign={"center"}>
                비밀번호를 다시 확인하세요.
              </Text>
            ) : null}
            <Button
              onClick={handleSubmit(onSubmit)}
              mt="4"
              color={"white"}
              bg={"#ff404c"}
              _hover={{
                backgroundColor: "#ff7982",
              }}
              width={"100%"}
              isLoading={mutation.isLoading}
            >
              비밀번호 수정
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
