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
import { HiChevronDown } from "react-icons/hi";
import styled from "styled-components";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { useQuery } from "@tanstack/react-query";
import { filterMenu, options, optionsMenu, rooms } from "../../services/data";
import { getOptionsSize } from "../../utils/getOptionsSize";
import { getOptionsByUrl } from "../../utils/getOptionsByUrl";
import { getDelOptionsUrl } from "../../utils/getDelOptionsUrl";
import { getBackOptions } from "../../utils/getBackOptions";
import { getOptionHouses } from "../../services/api";
import { getBackOrderBy } from "../../utils/getBackOrderBy";
import { throttle } from "../../utils/throttle";

import useInfiniteScroll from "../../utils/useInfiniteScroll";
import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import HouseOptMenu from "../../components/Menu/HouseOptMenu";
import OptionBadge from "../../components/Badge/OptionBadge";

const TopBtn = styled.div`
  position: fixed;
  top: 95%;
  right: 30px;
  width: 60px;
  height: 60px;
  transform: translateY(-50%);
  background-color: navy;
  border-radius: 50%;
  font-size: 17px;
  font-weight: bold;
  letter-spacing: -0.28px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;
  z-index: 99999;
`;

function HouseList() {
  const scrollRef = useRef(null);

  const [address, setAddress] = useState("");
  const [APIParams, setAPIParams] = useState({
    roomKind: sessionStorage.getItem("roomKind")
      ? sessionStorage.getItem("roomKind")
      : "전체",
    cellKind: "전체",
    py: "전체",
    toilet_counts: "전체",
    room_counts: "전체",
    maintenanceFeeRange: [0, 30],
    priceRange: [0, 30],
    depositRange: [0, 30],
    monthlyRentRange: [0, 30],
  });
  const [orderBy, setOrderBy] = useState(["최근순", "조회순", "낮은가격순"]);

  const { data, totalCounts, hasNextPage, setFetching, setBackParams } =
    useInfiniteScroll(getOptionHouses, { size: 24 });

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

  const onTop = () => {
    if (scrollRef.current.scrollTop == 0) return;

    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // init options
  useEffect(() => {
    // let initOptions = {};
    // optionsMenu.forEach((item, idx) => {
    //   if (idx < 5) {
    //     initOptions[item.eng] = sessionStorage.getItem(item.eng)
    //       ? sessionStorage.getItem(item.eng)
    //       : "전체";
    //   } else {
    //     console.log("deposit", sessionStorage.getItem("depositRange"));
    //     initOptions[item.eng] = sessionStorage.getItem(item.eng)
    //       ? sessionStorage.getItem(item.eng).split(",")
    //       : [options[item.eng].values[0], options[item.eng].values[3]];
    //   }
    // });
    // setAPIParams(initOptions);
  }, []);

  // scroll reload event
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        if (hasNextPage) {
          setFetching(true);
        }
      }
    };

    const throttleScrollHandler = throttle(handleScroll);

    scrollRef.current.addEventListener("scroll", throttleScrollHandler);

    scrollRef.current.addEventListener("beforeunload", () => {
      return () =>
        scrollRef.current.removeEventListener("scroll", throttleScrollHandler);
    });
  }, [data]);

  useEffect(() => {
    const sort_by = getBackOrderBy(orderBy[0]);
    sessionStorage.setItem("sort_by", sort_by);
    setAPIParams((params) => {
      return { ...params, sort_by };
    });
  }, [orderBy]);

  useEffect(() => {
    const apiParams = getBackOptions(APIParams);
    setBackParams(apiParams);
    // window.location.reload();
  }, [APIParams]);

  return (
    <>
      <Grid
        templateAreas={`"header" "searchResult" "main"`}
        gridTemplateRows={"0.3fr 0.005fr 8.5fr"}
      >
        <GridItem area={"header"}>
          <Flex w="100%" alignItems="center" p="20px" borderY="2px solid black">
            <Flex w="30%" alignItems="center">
              <AddressMenu onUpdate={setAddress} />
            </Flex>
            <Flex w="80%" ml="20px">
              <HouseOptMenu onUpdate={setAPIParams} address={address} />
            </Flex>
          </Flex>
        </GridItem>{" "}
        <GridItem
          area={"searchResult"}
          pl="3%"
          py="1%"
          w="100%"
          boxShadow="0 4px 4px -3px black"
        >
          <HStack>
            <Text
              fontWeight="600"
              color="blackAlpha.800"
              fontSize="25px"
              w="20vw"
              minW="250px"
              maxW="280px"
            >
              부동산 목록 {totalCounts ? totalCounts : ""} 개
            </Text>

            <Menu>
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
        <GridItem
          area={"main"}
          mt="0.2%"
          mr="0.3%"
          maxH="81vh"
          ref={scrollRef}
          overflowY={"scroll"}
          overflowX="hidden"
          css={{
            "&::-webkit-scrollbar": {
              width: "15px",
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
          <Flex flexWrap="wrap" maxH="100vh">
            {data?.map((item, idx) => {
              return <HouseCard key={idx} {...item} />;
            })}
          </Flex>
        </GridItem>
      </Grid>
      <TopBtn onClick={onTop}>Top</TopBtn>
    </>
  );
}

export default HouseList;
