import {
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Divider,
  VStack,
  HStack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { optionsMenu, rooms } from "../../services/data";

import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import HouseOptMenu from "../../components/Menu/HouseOptMenu";

function HouseList() {
  // optionsMenu 순서
  const params = useParams();

  return (
    <Grid
      templateAreas={`"header" "searchResult" "main"`}
      gridTemplateRows={"1fr 20px 8fr"}
    >
      <GridItem area={"header"}>
        <Flex w="100%" alignItems="center" p="20px" borderY="2px solid black">
          <Flex w="30%" alignItems="center">
            <AddressMenu />
          </Flex>

          <Flex w="80%" ml="20px">
            <HouseOptMenu />
          </Flex>
        </Flex>
        {/* <PricesMenu activePrices={activePrices} setPrices={setPrices} /> */}
      </GridItem>{" "}
      <GridItem area={"searchResult"} ml="30px">
        <Text fontWeight="600" color="blackAlpha.800" fontSize="25px">
          부동산 목록 {rooms.length} 개
        </Text>
      </GridItem>
      <GridItem area={"main"} mt="20px">
        <Flex
          flexWrap="wrap"
          overflow={"scroll"}
          height={"100vh"}
          css={{
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              width: "12px",
              background: "rgb(55,55,55,0.1)",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgb(55,55,55,0.5)",
              borderRadius: "20px",
            },
          }}
        >
          {rooms.map((item, idx) => {
            return <HouseCard key={idx} {...item} />;
          })}
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default HouseList;
