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

function HouseOptMenu({ onUpdate, address }) {
  const [selectedOpts, setSelectedOpts] = useState(new Array(3).fill("전체"));
  const [activePrices, setActivePrices] = useState([true, true, true]);
  const [prices, setPrices] = useState([[], [], [], []]);

  // state init
  // { eng: "roomKind", kor: "방 종류" },
  // { eng: "cellKind", kor: "매매 종류" },
  // { eng: "maintenanceFeeRange", kor: "관리비" },
  // { eng: "py", kor: "평수" },
  // { eng: "priceRange", kor: "매매가" },
  // { eng: "depositRange", kor: "보증금" },
  // { eng: "monthlyRentRange", kor: "월세" },
  useEffect(() => {
    let newParams = [];
    let newPrices = [];
    optionsMenu.forEach((item, idx) => {
      if (idx < 4 && idx != 2) {
        newParams[idx] = sessionStorage.getItem(item.eng)
          ? sessionStorage.getItem(item.eng)
          : "전체";
      }
    });
    prices.forEach((item, idx) => {
      if (idx == 0) {
        newPrices[idx] = sessionStorage.getItem(optionsMenu[2].eng)
          ? sessionStorage.getItem(optionsMenu[2].eng)
          : [];
      } else {
        newPrices[idx] = sessionStorage.getItem(optionsMenu[idx + 3].eng)
          ? sessionStorage.getItem(optionsMenu[idx + 3].eng)
          : [];
      }
    });
    console.log("newPrices", newPrices);
    setPrices(newPrices);
    setSelectedOpts(newParams);
  }, []);

  useEffect(() => {
    const cellKind = selectedOpts[1];
    setActivePrices(getActivePrices(cellKind));

    onUpdate((opts) => {
      let newParams = {};
      optionsMenu.forEach((item, idx) => {
        if (idx < 4 && idx != 2) {
          newParams[item.eng] = selectedOpts[idx];
        } else {
          newParams[item.eng] = opts[item.eng];
        }
      });
      console.log("opts", opts);

      return { ...opts, ...newParams };
    });

    console.log("select", selectedOpts);
  }, [selectedOpts]);

  // price
  useEffect(() => {
    let newPriceOpts = {};
    prices.forEach((item, idx) => {
      if (idx == 0) {
        newPriceOpts[optionsMenu[idx + 2].eng] = item;
        sessionStorage.setItem(optionsMenu[idx + 2].eng, item);
      } else {
        newPriceOpts[optionsMenu[idx + 3].eng] = item;
        sessionStorage.setItem(optionsMenu[idx + 3].eng, item);
      }
    });
    onUpdate((opts) => {
      console.log("prices", opts);
      return { ...opts, ...newPriceOpts };
    });
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
                        defaultData={
                          selectedOpts[idx] != "전체"
                            ? selectedOpts[idx]
                            : options[item.eng][0]
                        }
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
