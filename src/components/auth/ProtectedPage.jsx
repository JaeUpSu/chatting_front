import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Loading from "../Loading/Loading";

// 로그인 여부 체크용
export default function ProtectedPage({ children }) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate("/errorpage");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  if (!userLoading) {
    return <>{children}</>;
  } else {
    return <Loading />;
  }
}
