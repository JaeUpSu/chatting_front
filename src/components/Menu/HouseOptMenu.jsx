import {
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  useDisclosure,
  Icon,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";

import { options, optionsMenu } from "../../services/data";
import { getActivePrices } from "../../utils/getActivePrices";

import OptionRangeSlider from "../Slider/RangeSlider";
import DataRadioCard from "../Radio/RadioCard";
import PricesMenu from "./PricesMenu";
import MenuDrawer from "./MenuDrawer";
import { RepeatIcon } from "@chakra-ui/icons";

function HouseOptMenu({ onUpdate, onInitOptions }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      if (idx < 5) {
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
      let newPrices = {};
      optionsMenu.forEach((item, idx) => {
        if (idx < 5) {
          newParams[item.eng] = selectedOpts[idx];
        } else {
          newPrices[item.eng] = opts[item.eng];
        }
      });
      // if (opts["dong"]) {
      //   newParams["dong"] = opts["dong"];
      // }
      return { ...newPrices, ...newParams };
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
    <Flex
      w="80vw"
      pl="10"
      justifyContent={{ base: "flex-end", xl: "flex-start" }}
    >
      <HStack
        display={{
          base: "none",
          xl: "block",
        }}
        w="100%"
        dir="row"
      >
        {optionsMenu.map((item, idx) => {
          if (idx < 5) {
            return (
              <Menu key={idx} border="2px solid black">
                <MenuButton
                  as={Button}
                  colorScheme="red"
                  p="1vw"
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
                <MenuList p="1vw" pos="absolute">
                  <Flex>
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
                  p="1vw"
                  rightIcon={<IoIosArrowDown />}
                >
                  {item.kor}
                </MenuButton>
                <MenuList
                  py="20px"
                  px="50px"
                  placement="bottom-end"
                  justifyContent="flex-start"
                >
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

        <Button as={Button} colorScheme="red" p="1vw" onClick={onInitOptions}>
          <RepeatIcon mr="2" />
          초기화
        </Button>
      </HStack>{" "}
      <IconButton
        colorScheme="red"
        aria-label="Open menu"
        display={{
          xl: "none",
          lg: "block",
        }}
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        activePrices={activePrices}
        setPrices={setPrices}
        setSelectedOpts={setSelectedOpts}
        selectedOpts={selectedOpts}
        onInitOptions={onInitOptions}
      />
    </Flex>
  );
}
export default HouseOptMenu;
