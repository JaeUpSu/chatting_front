import {
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { isLocal } from "../../services/local";
import { getActivePrices } from "../../utils/getActivePrices";
import { rooms, options, optionsMenu } from "../../services/data";

import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import DataRadioCard from "../../components/Radio/RadioCard";
import OptionRangeSlider from "../../components/Slider/RangeSlider";

function HouseList() {
  // optionsMenu 순서
  const [selectedOpts, setSelectedOpts] = useState(new Array(5).fill("전체"));
  const [prices, setPrices] = useState([[], [], [], []]);

  const [activePrices, setActivePrices] = useState([true, true, true]);

  useEffect(() => {
    const cellKind = selectedOpts[0];
    setActivePrices(getActivePrices(cellKind));
    console.log(selectedOpts);
  }, [selectedOpts]);

  useEffect(() => {
    console.log(prices);
  }, [prices]);

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateColumns={"4fr 7fr"}
      gap="2"
      mx="10px"
    >
      <GridItem
        area={"nav"}
        overflow="auto"
        overflowX="hidden"
        h="100vh"
        p="20px"
        css={{
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            width: "12px",
            background: "rgb(55,55,55,0.1)",
            zIndex: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(55,55,55,0.5)",
            borderRadius: "20px",
            zIndex: 2,
          },
        }}
      >
        <Flex direction="column" fontWeight="600" alignItems="center">
          <AddressMenu />
          <Divider my="30px" borderColor="black.200" />
          <DataRadioCard
            name={optionsMenu[0].kor}
            valueName={optionsMenu[0].eng}
            data={options[optionsMenu[0].eng]}
            defaultData={
              isLocal(localStorage.getItem(optionsMenu[0].eng))
                ? localStorage.getItem(optionsMenu[0].eng)
                : options[optionsMenu[0].eng][0]
            }
            onUpdate={setSelectedOpts}
          />
          <Divider mt="30px" borderColor="black.200" />
          {optionsMenu.map((item, idx) => {
            if (idx > 5) {
              if (activePrices[idx - 6]) {
                return (
                  <Box key={item + idx}>
                    <OptionRangeSlider
                      idx={idx - 5}
                      name={item.eng}
                      label={item.kor}
                      onUpdate={setPrices}
                    />
                    <Divider mt="30px" borderColor="black.200" />
                  </Box>
                );
              }
            }
          })}{" "}
          <OptionRangeSlider
            idx={0}
            name={optionsMenu[5].eng}
            label={optionsMenu[5].kor}
            onUpdate={setPrices}
          />
          <Divider mt="30px" borderColor="black.200" />
          <Grid gap="10px">
            {optionsMenu.map((op, idx) => {
              if (idx < 5 && idx > 0) {
                return (
                  <GridItem key={idx}>
                    <br />
                    <DataRadioCard
                      name={op.kor}
                      valueName={op.eng}
                      data={options[op.eng]}
                      defaultData={
                        isLocal(localStorage.getItem(op.eng))
                          ? localStorage.getItem(op.eng)
                          : options[op.eng][0]
                      }
                      onUpdate={setSelectedOpts}
                    />
                    <Divider mt="30px" borderColor="black.200" />
                  </GridItem>
                );
              } else {
                return "";
              }
            })}
            <br />
          </Grid>
        </Flex>
      </GridItem>{" "}
      <GridItem area={"main"}>
        <VStack
          spacing={"10"}
          justifyContent="center"
          alignItems="center"
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
          <Box
            boxShadow="0px 0px 1px 2px black"
            w="100%"
            // py="10px"
            // px="30px"
          >
            <Text fontWeight="600" color="blackAlpha.700">
              부동산 목록 {rooms.length} 개
            </Text>
          </Box>

          {/* <Flex
          direction="column"
          h="750px"
          my="20px"
          overflow="auto"
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
        > */}
          {rooms.map((item, idx) => {
            return <HouseCard key={idx} {...item} />;
          })}
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default HouseList;
