import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services/api";

export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getUserInfo, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  /*재시도를 막음*/
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
