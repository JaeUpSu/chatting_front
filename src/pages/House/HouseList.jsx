import { Grid, GridItem, Flex, Box, Text, Divider } from "@chakra-ui/react";
import { useState } from "react";

import { rooms, options, optionsMenu } from "../../services/data";
import { isLocal } from "../../services/local";

import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import DataRadioCard from "../../components/Radio/RadioCard";
import OptionRangeSlider from "../../components/Slider/RangeSlider";

function HouseList() {
  const [btnActives, setBtnActives] = useState([true, true, true]);
  // const [cellKinds, setCellKinds]

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateRows={"20px 1fr"}
      gridTemplateColumns={"580px 1fr"}
      gap="2"
      mx="10px"
      w="100%"
    >
      <GridItem
        area={"nav"}
        overflow="auto"
        h="837px"
        w="100%"
        p="20px"
        minW="400px"
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
          />
          <Divider mt="30px" borderColor="black.200" />

          <OptionRangeSlider
            name={optionsMenu[5].eng}
            label={optionsMenu[5].kor}
          />
          <Divider mt="30px" borderColor="black.200" />

          <OptionRangeSlider
            name={optionsMenu[6].eng}
            label={optionsMenu[6].kor}
          />
          <Divider mt="30px" borderColor="black.200" />

          <OptionRangeSlider
            name={optionsMenu[7].eng}
            label={optionsMenu[7].kor}
          />
          <Divider mt="30px" borderColor="black.200" />

          <OptionRangeSlider
            name={optionsMenu[8].eng}
            label={optionsMenu[8].kor}
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
      <GridItem area={"main"} my="35px" mr="35px">
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Box
            boxShadow="0px 0px 1px 2px black"
            h="100%"
            w="95%"
            py="10px"
            px="30px"
          >
            <Text fontWeight="600" color="blackAlpha.700">
              부동산 목록 {rooms.length} 개
            </Text>
          </Box>
        </Flex>

        <Flex
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
