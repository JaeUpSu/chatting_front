import { Flex, Box, Text, Center, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import RecentList from "./RecentList";
import LikedList from "./LikedList";
import useUser from "../../hooks/useUser";
import TopViewList from "./TopViewList";
import scrollbarStyle from "../../styles/scroll_bar";
import IconBtns from "./IconBtns";
import { Helmet } from "react-helmet";
import {
  MdApartment,
  MdOutlineVilla,
  MdOutlineBedroomChild,
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BiHomeHeart } from "react-icons/bi";
import { TbCampfire } from "react-icons/tb";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DivideLine = styled.div`
  border-top: 2px solid lightgray;
  margin: 70px auto;
  width: 600px;
`;

export default function Home() {
  const { isLoggedIn } = useUser();

  return (
    <Center flexDir="column" mt="10">
      <Helmet>
        <title>BANGSAM</title>
      </Helmet>{" "}
      <Heading fontSize="7xl" color={"#ff404c"} mb="10">
        BangSam
      </Heading>
      <Flex mt="2rem" justify={"space-around"} w="70vw" maxW="850px">
        <IconBtns icon={<MdApartment size={40} />}>아파트</IconBtns>
        <IconBtns icon={<MdOutlineVilla size={40} />}>빌라</IconBtns>
        <IconBtns icon={<HiOutlineOfficeBuilding size={40} />}>
          오피스텔
        </IconBtns>
        <IconBtns icon={<MdOutlineBedroomChild size={40} />}>원룸</IconBtns>
        <IconBtns icon={<BiHomeHeart size={40} />}>주택</IconBtns>
        <IconBtns icon={<TbCampfire size={40} />}>쉐어하우스</IconBtns>
      </Flex>
      <Box
        mt="5vh"
        overflowY="scroll"
        overflowX="hidden"
        height="80vh"
        sx={scrollbarStyle}
      >
        <TopViewList />
      </Box>
    </Center>
  );
}
