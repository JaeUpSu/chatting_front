import { Grid, GridItem, Flex, Box, Text } from "@chakra-ui/react";

import OptionBadge from "../../components/Badge/OptionBadge";
import HouseCard from "../../components/Card/HouseCard";
import { rooms } from "../../services/data";
import { useState, useEffect } from "react";

function HouseList() {
  const [options, setOptions] = useState([
    "월세",
    "화장실 1개",
    "평수",
    "역세권",
  ]);

  // const [isOption, setIsOption] = useState(false);

  // useEffect(() => {
  //   if (isOption) {
  //     const newOptions = [];
  //     const cellKinds = localStorage.getItem("cellKinds");
  //     for (let i = 0; i < cellKinds.length; i++) {
  //       newOptions.push(cellKinds[i]);
  //     }
  //     const toilet_counts = localStorage.getItem("toilet_counts");
  //     newOptions.push(toilet_counts);
  //     const room_counts = localStorage.getItem("room_counts");
  //     newOptions.push(room_counts);

  //     const isStationArea = localStorage.getItem("isStationArea");
  //     newOptions.push(isStationArea);
  //     setOptions(options);
  //   }
  // }, [options]);

  return (
    <Flex justifyContent="center" direction="column">
      <Flex
        w="800px"
        h="50px"
        backgroundColor="blackAlpha.200"
        borderRadius="10px"
        py="10px"
        px="20px"
        margin="18px 30px"
      >
        {options.map((item, idx) => {
          return <OptionBadge key={idx} option={item} mx="20px" />;
        })}
      </Flex>
      <Grid templateColumns="repeat(4,1fr)" gap="5" p="20px" m="0px auto">
        {rooms.map((item, idx) => {
          return (
            <GridItem key={idx}>
              <HouseCard {...item} />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
}

export default HouseList;
