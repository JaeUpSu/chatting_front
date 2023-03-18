import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";

// URL 에 userName 포함한 경우 사용
export default function OnlyMePage({ children }) {
  const { isLoggedIn, userLoading, user } = useUser();
  const { userName } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (isLoggedIn) {
        if (user?.username != userName) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn, user]);
  return <>{children}</>;
}
