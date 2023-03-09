import {
  HStack,
  Box,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { options, optionsMenu } from "../../services/data";
import { getActivePrices } from "../../utils/getActivePrices";
import { getPriceDisplay } from "../../utils/getPriceDisplay";

import OptionRangeSlider from "../Slider/RangeSlider";
import DataRadioCard from "../Radio/RadioCard";
import OptionDropdown from "./OptionDropdown";
import PricesMenu from "./PricesMenu";

function HouseOptMenu({ address }) {
  const [selectedOpts, setSelectedOpts] = useState(new Array(4).fill("전체"));
  const [activePrices, setActivePrices] = useState([true, true, true]);
  const [prices, setPrices] = useState([[], [], [], []]);

  useEffect(() => {
    const cellKind = selectedOpts[1];
    setActivePrices(getActivePrices(cellKind));
    console.log(selectedOpts);
  }, [selectedOpts]);

  useEffect(() => {
    console.log(prices);
  }, [prices]);

  return (
    <Flex justifyContent="space-between" w="100%">
      <HStack>
        {optionsMenu.map((item, idx) => {
          if (idx < 4) {
            if (idx == 2) {
              return (
                <Menu key={idx}>
                  <MenuButton
                    as={Button}
                    colorScheme="facebook"
                    p="15px"
                    rightIcon={<IoIosArrowDown />}
                  >
                    {item.kor + ` ${getPriceDisplay(prices[0])}`}
                  </MenuButton>
                  <MenuList py="20px" px="50px">
                    <OptionRangeSlider
                      idx={0}
                      names={item}
                      onUpdate={setPrices}
                    />
                  </MenuList>
                </Menu>
              );
            } else {
              return (
                <Menu key={idx}>
                  <MenuButton
                    as={Button}
                    colorScheme="facebook"
                    p="15px"
                    rightIcon={<IoIosArrowDown />}
                  >
                    {selectedOpts[idx] == "전체" ? item.kor : selectedOpts[idx]}
                  </MenuButton>
                  <MenuList p="20px" maxW={idx == 1 ? "" : "460px"}>
                    <Flex justifyContent="center">
                      <DataRadioCard
                        name={item.kor}
                        valueName={item.eng}
                        data={options[item.eng]}
                        defaultData={options[item.eng][0]}
                        onUpdate={setSelectedOpts}
                      />
                    </Flex>
                    {idx == 1 ? (
                      <PricesMenu
                        activePrices={activePrices}
                        setPrices={setPrices}
                      />
                    ) : (
                      ""
                    )}
                  </MenuList>
                </Menu>
              );
            }
          }
        })}
        <OptionDropdown address={address} />
      </HStack>
    </Flex>
  );
}
export default HouseOptMenu;
