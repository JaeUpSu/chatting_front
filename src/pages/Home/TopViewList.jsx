import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { FaArrowLeft } from "react-icons/fa";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getTopViewHouse } from "../../services/api";
import { Link } from "react-router-dom";
import { getSaleContents } from "../../utils/getSaleContents";
import { RoomKindsToFront, SellKindsToFront } from "../../services/data";
import React from "react";
import styled from "styled-components";
export default function TopViewList() {
  const { isLoading, data } = useQuery(["TopViewHouse"], getTopViewHouse);

  return <Box border={"1px solid blue"}></Box>;
}
