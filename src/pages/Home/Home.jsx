import { Flex, Box, Text, Center, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import TopViewList from "./TopViewList";
import scrollbarStyle from "../../styles/scroll_bar";
import IconBtns from "./IconBtns";
import { Helmet } from "react-helmet";
import { FaBed } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdApartment } from "react-icons/md";
import { HiOfficeBuilding } from "react-icons/hi";
import { BsFillBuildingsFill, BsFillHousesFill } from "react-icons/bs";

export default function Home() {
  const navigate = useNavigate();

  const onHouseList = () => {
    navigate(`/houselist`);
  };

  return (
    <Center
      flexDir="column"
      mt="10"
      overflowY="scroll"
      h="80vh"
      w="100%"
      sx={scrollbarStyle}
    >
      <Helmet>
        <title>BANGSAM</title>
      </Helmet>{" "}
      <Heading
        fontSize="7xl"
        color={"#ff404c"}
        mb="5"
        onClick={onHouseList}
        cursor="pointer"
      >
        BangSam
      </Heading>
      <Flex mt="3rem" justify={"space-around"} w="70vw" maxW="850px">
        <IconBtns icon={<MdApartment size={40} />}>아파트</IconBtns>
        <IconBtns icon={<BsFillBuildingsFill size={40} />}>빌라</IconBtns>
        <IconBtns icon={<HiOfficeBuilding size={40} />}>오피스텔</IconBtns>
        <IconBtns icon={<FaBed size={40} />}>원룸</IconBtns>
        <IconBtns icon={<GiFamilyHouse size={40} />}>주택</IconBtns>
        <IconBtns icon={<BsFillHousesFill size={40} />}>쉐어하우스</IconBtns>
      </Flex>
      <Box
        mt="3vh"
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
