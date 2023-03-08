import {
  Grid,
  GridItem,
  Flex,
  Text,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { filterMenu, optionsMenu, rooms } from "../../services/data";
import { getOptionsSize } from "../../utils/getOptionsSize";
import { getOptionsByUrl } from "../../utils/getOptionsByUrl";
import { getDelOptionsUrl } from "../../utils/getDelOptionsUrl";

import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import HouseOptMenu from "../../components/Menu/HouseOptMenu";
import OptionBadge from "../../components/Badge/OptionBadge";
import { HiChevronDown } from "react-icons/hi";

function HouseList() {
  const params = useParams();
  const navigate = useNavigate();

  // optionsMenu 순서
  const [filter, setFilter] = useState({
    room_counts: "",
    toilet_counts: "",
    isStationArea: "",
  });
  const [isOption, setIsOption] = useState(false);
  const [orderBy, setOrderBy] = useState([
    "최근순",
    "좋아요순",
    "조회순",
    "낮은가격순",
  ]);

  const onDelete = (e) => {
    const name = e.currentTarget.children[0].getAttribute("name");
    navigate(
      `/houselist/${params.address}/${getDelOptionsUrl(
        getOptionsByUrl(params.options),
        name
      )}`
    );
  };

  const onOrderBy = (e) => {
    const value = e.currentTarget.getAttribute("value");
    setOrderBy((_orderBy) => {
      const newOrderBy = [value];
      _orderBy.forEach((item) => {
        if (item != value) {
          newOrderBy.push(item);
        }
      });
      return newOrderBy;
    });
  };

  useEffect(() => {
    if (params.options != "options=null") {
      setFilter(getOptionsByUrl(params.options));
      setIsOption(true);
    }
  }, [params]);

  useEffect(() => {
    console.log("filter", filter);
  }, [filter]);

  return (
    <Grid
      templateAreas={`"header" "searchResult" "main"`}
      gridTemplateRows={"1fr 20px 8.5fr"}
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
      </GridItem>{" "}
      <GridItem area={"searchResult"} ml="30px" w="100%">
        <HStack>
          <Text fontWeight="600" color="blackAlpha.800" fontSize="25px">
            부동산 목록 {rooms.length} 개
          </Text>
          <Flex
            w="76.5%"
            borderRadius="10px"
            mx="10px"
            alignItems="center"
            fontWeight="600"
            flexWrap="wrap"
          >
            {isOption && getOptionsSize(filter) > 0
              ? filterMenu.map((item, idx) => {
                  if (
                    filter[item.eng] === "" ||
                    filter[item.eng] === "[]" ||
                    filter[item.eng] === "undefined" ||
                    filter[item.eng] === undefined
                  ) {
                    return "";
                  } else {
                    console.log("checking", filter[item.eng]);
                    return (
                      <Flex key={idx} onClick={onDelete} cursor="pointer">
                        <OptionBadge
                          key={idx}
                          name={item.eng}
                          option={filter[item.eng]}
                        />
                      </Flex>
                    );
                  }
                })
              : "비어있습니다."}
          </Flex>

          <Menu pos="absolute" right="280%">
            <MenuButton as={Button} rightIcon={<HiChevronDown />}>
              {orderBy[0]}
            </MenuButton>
            <MenuList>
              {orderBy.map((item, idx) => {
                if (idx > 0) {
                  return (
                    <MenuItem key={idx} onClick={onOrderBy} value={item}>
                      {item}
                    </MenuItem>
                  );
                }
              })}
            </MenuList>
          </Menu>
        </HStack>
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
