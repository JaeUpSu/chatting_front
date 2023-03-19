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
  VStack,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

export default function ChangePasswordModal({ isOpen, onClose }) {
  return (
    <Modal motionPreset="scale" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent boxSize={"lg"}>
        <ModalHeader fontSize={"2xl"} textAlign={"center"} mt={"0"}>
          비밀번호 수정
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form">
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input placeholder="현재 비밀번호를 입력하세요." />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input placeholder="새로운 비밀번호를 입력하세요." />
            </InputGroup>
            <Button
              type="submit"
              mt="4"
              color={"white"}
              bg={"#ff404c"}
              _hover={{
                backgroundColor: "#ff7982",
              }}
              width={"100%"}
            >
              비밀번호 수정
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
