import styled from "styled-components";
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
} from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";
import { HiChevronDown } from "react-icons/hi";

import { useEffect, useState, useRef, useLayoutEffect } from "react";

import { getOptionHouses } from "../../services/api";
import { getInitOrderBy } from "../../services/local";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import { throttle } from "../../utils/throttle";
import { getBackOptions } from "../../utils/getBackOptions";
import { getBackOrderBy } from "../../utils/getBackOrderBy";

import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import HouseOptMenu from "../../components/Menu/HouseOptMenu";

import LoadingHouseCard from "../../components/Loading/LoadingHouseCard";
import scrollbarStyle from "../../styles/scroll_bar";
import { Helmet } from "react-helmet";

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
  const [isInit, setIsInit] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isSellKind, setIsSellKind] = useState(false);
  const [orderBy, setOrderBy] = useState(getInitOrderBy(isSellKind));

  const {
    data,
    isFetching,
    totalCounts,
    hasNextPage,
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

  // scroll reload event
  useEffect(() => {
    if (isInit) setIsInit(false);
    // if (isLastPage) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      if (scrollTop + clientHeight >= scrollHeight * 0.7) {
        setFetching(true);
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
    if (hasNextPage) {
      setLoading(isFetching);
    }
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
    setOrderBy(getInitOrderBy(isSellKind));
  }, [isSellKind]);

  return (
    <>
      <VStack h={"100vh"} pb="10vh" justifyContent="flex-start">
        <Helmet>
          <title>부동산 - BANGSAM</title>
        </Helmet>
        <HStack w="100%" pl={"5%"} pr="10%" pb={5} pt={2}>
          <AddressMenu onUpdate={setAddress} />
          <HouseOptMenu onUpdate={setAPIParams} onInitOptions={onInitOptions} />
        </HStack>
        <HStack w="100%" pl="7%" pr="7%">
          <HStack justifyContent={"space-between"} w="98.5%">
            <Text
              fontWeight="600"
              color="blackAlpha.800"
              fontSize={"xl"}
              w="100%"
              minW="180px"
              maxW="210px"
            >
              {totalCounts < 0 || (isLoading && hasNextPage) ? (
                <>
                  Loading...
                  <Button
                    isLoading={isLoading}
                    icon={<SpinnerIcon boxSize={50} />}
                    backgroundColor="transparent"
                  />
                </>
              ) : totalCounts ? (
                `부동산 목록 ${totalCounts} 개`
              ) : (
                "비어있습니다"
              )}
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
        {totalCounts > 0 ? (
          <Grid
            w={"100vw"}
            pl="5vw"
            pr="5vw"
            gridTemplateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            ref={scrollRef}
            overflowY={"scroll"}
            h="100%"
            sx={scrollbarStyle}
          >
            {data?.map((item, idx) => {
              return (
                <GridItem key={idx}>
                  <HouseCard {...item} />
                </GridItem>
              );
            })}
          </Grid>
        ) : totalCounts == 0 ? (
          <Flex
            alignItems="center"
            justifyContent="center"
            height="65vh"
            fontWeight="600"
            ref={scrollRef}
          >
            해당 옵션을 가진 제품은 없습니다.
          </Flex>
        ) : (
          <Grid
            w={"100vw"}
            pl="5vw"
            pr="5vw"
            sx={scrollbarStyle}
            gridTemplateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            ref={scrollRef}
            overflowY={"scroll"}
            h="100%"
          >
            {Array.from({ length: 8 }).map((idx) => {
              return (
                <GridItem
                  key={idx}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent="center"
                >
                  <LoadingHouseCard />
                </GridItem>
              );
            })}
          </Grid>
        )}
      </VStack>
      <TopBtn onClick={onTop}>&uarr;</TopBtn>
    </>
  );
}

export default HouseList;
