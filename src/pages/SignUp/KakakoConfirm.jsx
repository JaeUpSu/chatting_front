import {
  Heading,
  Spinner,
  Text,
  ToastId,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../services/api";
export default function KakaoConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = useRef();
  const mutation = useMutation(kakaoLogin, {
    onMutate: () => {
      toastId.current = toast({
        title: "Log In...",
        status: "loading",
        position: "top",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Log In Success",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Log In failed",
          status: "error",
          position: "top",
        });
      }
    },
  });
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent="center" mt="40">
      <Heading>로그인 중...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
