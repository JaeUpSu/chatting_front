import {
  Heading,
  Spinner,
  Text,
  Toast,
  ToastId,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogin } from "../../services/api";
export default function NaverConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = useRef();
  const mutation = useMutation(naverLogin, {
    onMutate: () => {
      toastId.current = toast({
        title: "Log In...",
        status: "loading",
        position: "top",
      });
    },
    onSuccess: async () => {
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
    const state = params.get("state");
    const data = { code: params.get("code"), state: params.get("state") };

    if (code) {
      if (state === "OzCoding") {
        mutation.mutate(data);
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent="center" mt="40">
      <Heading>Processing Log In...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
