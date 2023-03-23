import { Box, Button, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import FindId from "./FindId";
import FindPassword from "./FindPassword";

export default function () {
  const navigate = useNavigate();
  const { type } = useParams();
  if (type !== "id" && type !== "password") {
    navigate("./errorpage");
  }
  useEffect(() => {
    if (type !== "id" && type !== "password") {
      navigate("../../errorpage");
    }
  }, [type]);
  return (
    <Box mt={"10"} w={"100%"}>
      {type === "id" ? (
        <FindId />
      ) : type === "password" ? (
        <FindPassword />
      ) : null}
    </Box>
  );
}
