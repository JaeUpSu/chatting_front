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
import PricesMenu from "./PricesMenu";

function HouseOptMenu({ onUpdate }) {
  const [selectedOpts, setSelectedOpts] = useState(new Array(5).fill("전체"));
  const [activePrices, setActivePrices] = useState([true, false, false]);
  const [prices, setPrices] = useState([
    [0, 30],
    [0, 30],
    [0, 30],
    [0, 30],
  ]);

  // init
  useEffect(() => {
    let newParams = [];
    let newPrices = [];
    optionsMenu.forEach((item, idx) => {
      if (idx == 1) {
        newParams[idx] = sessionStorage.getItem(item.eng)
          ? sessionStorage.getItem(item.eng)
          : "매매";
      } else if (idx < 5) {
        newParams[idx] = sessionStorage.getItem(item.eng)
          ? sessionStorage.getItem(item.eng)
          : "전체";
      } else {
        newPrices[idx - 5] = sessionStorage.getItem(optionsMenu[idx].eng)
          ? sessionStorage.getItem(optionsMenu[idx].eng).split(",")
          : [0, 30];
      }
    });
    setPrices(newPrices);
    setSelectedOpts(newParams);
  }, []);

  // options setting
  useEffect(() => {
    const sellKind = selectedOpts[1];
    setActivePrices(getActivePrices(sellKind));
    onUpdate((opts) => {
      let newParams = {};
      optionsMenu.forEach((item, idx) => {
        if (idx < 5) {
          newParams[item.eng] = selectedOpts[idx];
        } else {
          newParams[item.eng] = prices[idx - 5].includes(",")
            ? prices[idx - 5].split(",")
            : [0, 30];
        }
      });

      return { ...opts, ...newParams };
    });
  }, [selectedOpts]);

  // price setting
  useEffect(() => {
    let newPriceOpts = {};
    prices.forEach((item, idx) => {
      newPriceOpts[optionsMenu[idx + 5].eng] = item;
    });
    onUpdate((opts) => {
      return { ...opts, ...newPriceOpts };
    });
  }, [prices]);

  return (
    <Flex w="100%">
      <HStack>
        {optionsMenu.map((item, idx) => {
          if (idx < 5) {
            return (
              <Menu key={idx}>
                <MenuButton
                  as={Button}
                  colorScheme="red"
                  p="15px"
                  rightIcon={<IoIosArrowDown />}
                >
                  {selectedOpts[idx] == "전체"
                    ? item.kor
                    : idx == 3
                    ? "화장실 " + selectedOpts[idx]
                    : idx == 4
                    ? "방 " + selectedOpts[idx]
                    : selectedOpts[idx]}
                </MenuButton>
                <MenuList p="20px" maxW={idx == 5 || idx == 1 ? "" : "460px"}>
                  <Flex px="2vw">
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
          } else if (idx == 5) {
            return (
              <Menu key={idx}>
                <MenuButton
                  as={Button}
                  colorScheme="red"
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
          }
        })}
      </HStack>
    </Flex>
  );
}
export default HouseOptMenu;
