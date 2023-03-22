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
  VStack,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";

import { useEffect, useState, useRef } from "react";

import { getBackOptions } from "../../utils/getBackOptions";
import { getOptionHouses, getWishLists } from "../../services/api";
import { getBackOrderBy } from "../../utils/getBackOrderBy";
import { throttle } from "../../utils/throttle";

import useInfiniteScroll from "../../utils/useInfiniteScroll";
import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import HouseOptMenu from "../../components/Menu/HouseOptMenu";
import { getInitOrderBy, initParams } from "../../services/local";
import { useQuery } from "@tanstack/react-query";

const TopBtn = styled.div`
  position: fixed;
  bottom: 2%;
  right: 2%;
  width: 40px;
  height: 40px;
  transform: translateY(-50%);
  background-color: #ff404c;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
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

  const [isInit, setIsInit] = useState(true);
  const [address, setAddress] = useState("");
  const [APIParams, setAPIParams] = useState({
    roomKind: sessionStorage.getItem("roomKind")
      ? sessionStorage.getItem("roomKind")
      : "전체",
    sellKind: "전체",
    py: "전체",
    toilet_counts: "전체",
    room_counts: "전체",
    maintenanceFeeRange: [0, 30],
    priceRange: [0, 30],
    depositRange: [0, 30],
    monthlyRentRange: [0, 30],
  });
  const [isSellKind, setIsSellKind] = useState(false);
  const [orderBy, setOrderBy] = useState(getInitOrderBy(isSellKind));
  const [isLoading, setLoading] = useState(false);

  const {
    hasNextPage,
    data,
    totalCounts,
    isFetching,
    setFetching,
    setBackParams,
  } = useInfiniteScroll(getOptionHouses, { size: 24 });

  // orderBy rearrange
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

  // scroll top
  const onTop = () => {
    if (scrollRef.current.scrollTop == 0) return;

    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // init
  const onInitOptions = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  // useEffect(() => {
  //   if (isInit) {
  //     sessionStorage.removeItem("gugunsi");
  //     sessionStorage.removeItem("gugunsiIdx");
  //     sessionStorage.removeItem("ebmyeondong");
  //     sessionStorage.removeItem("ebmyeondongIdx");
  //   }
  // }, []);

  // scroll reload event
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setFetching(true);
        setLoading(true);
      }
    };

    const throttleScrollHandler = throttle(handleScroll);

    scrollRef.current.addEventListener("scroll", throttleScrollHandler);
    scrollRef.current.addEventListener("beforeunload", () => {
      return () =>
        scrollRef.current.removeEventListener("scroll", throttleScrollHandler);
    });
  }, [data]);

  // loading set
  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching]);

  // orderBy => params
  useEffect(() => {
    const sort_by = getBackOrderBy(orderBy[0]);
    sessionStorage.setItem("sort_by", sort_by);
    setAPIParams((params) => {
      return { ...params, sort_by };
    });
  }, [orderBy]);

  // address => params
  useEffect(() => {
    const dong = sessionStorage.getItem("ebmyeondongIdx")
      ? sessionStorage.getItem("ebmyeondongIdx")
      : "-1";

    setAPIParams((params) => {
      return { ...params, dong };
    });
  }, [address]);

  // options => params
  useEffect(() => {
    const sellKind = sessionStorage.getItem("sellKind");
    if (sellKind !== undefined && sellKind !== null && sellKind !== "전체") {
      setIsSellKind(true);
    } else {
      setIsSellKind(false);
    }
    const apiParams = getBackOptions(APIParams);
    setBackParams(apiParams);
  }, [APIParams]);

  useEffect(() => {
    // sessionStorage.removeItem("sort_by");
    setOrderBy(getInitOrderBy(isSellKind));
  }, [isSellKind]);

  return (
    <>
      <VStack h={"100vh"} pb="10vh">
        <HStack spacing={"5"} w="100vw" pl={"5%"} pr={"5%"} pb={5} pt={2}>
          <HStack spacing={"10"}>
            <AddressMenu onUpdate={setAddress} />
            <HouseOptMenu onUpdate={setAPIParams} />
          </HStack>
          <Button size="sm" onClick={onInitOptions}>
            {" "}
            초기화
          </Button>
        </HStack>
        <HStack w="100vw" pl="7%" pr="7%">
          <HStack justifyContent={"space-between"} w="100%">
            <Text
              fontWeight="600"
              color="blackAlpha.800"
              fontSize={"xl"}
              w="20vw"
              minW="250px"
              maxW="280px"
            >
              {isLoading
                ? "Loading..."
                : totalCounts
                ? `부동산 목록 ${totalCounts} 개`
                : "비어있습니다"}
            </Text>
            {isLoading ? (
              "Loading..."
            ) : totalCounts ? (
              <HStack>
                <Menu>
                  <MenuButton
                    size="sm"
                    as={Button}
                    rightIcon={<HiChevronDown />}
                  >
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
            ) : null}
          </HStack>
        </HStack>

        {totalCounts ? (
          <Grid
            w={"100vw"}
            pl="5vw"
            pr="5vw"
            // mt="0.2%"
            // maxH="30vh"
            // rowGap={3}
            gridTemplateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            ref={scrollRef}
            // overflowX="hidden"
            overflowY={"scroll"}
            // sx={{
            //   "&::-webkit-scrollbar": {
            //     width: "15px",
            //   },
            //   "&::-webkit-scrollbar-track": {
            //     width: "12px",
            //     background: "rgb(55,55,55,0.1)",
            //   },
            //   "&::-webkit-scrollbar-thumb": {
            //     background: "rgb(55,55,55,0.5)",
            //     borderRadius: "20px",
            //   },
            h="100%"
            // }}
          >
            {data?.map((item, idx) => {
              return (
                <GridItem
                  key={idx}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent="center"
                >
                  <HouseCard key={idx} {...item} />
                </GridItem>
              );
            })}
          </Grid>
        ) : (
          <Flex
            alignItems="center"
            justifyContent="center"
            height="65vh"
            fontWeight="600"
            ref={scrollRef}
          >
            해당 옵션을 가진 제품은 없습니다.
          </Flex>
        )}
      </VStack>
      <TopBtn onClick={onTop}>&uarr;</TopBtn>
    </>
  );
}

export default HouseList;
