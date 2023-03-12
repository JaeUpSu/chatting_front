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
import { infiniteQuery, useQuery } from "react-query";
import { filterMenu, rooms } from "../../services/data";
import { getOptionsSize } from "../../utils/getOptionsSize";
import { getOptionsByUrl } from "../../utils/getOptionsByUrl";
import { getDelOptionsUrl } from "../../utils/getDelOptionsUrl";

import HouseCard from "../../components/Card/HouseCard";
import AddressMenu from "../../components/Menu/AddressMenu";
import HouseOptMenu from "../../components/Menu/HouseOptMenu";
import OptionBadge from "../../components/Badge/OptionBadge";
import { getOptionHouses } from "../../services/api";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import { throttle } from "../../utils/throttle";

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

function HouseList({ room_kind }) {
  const params = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [address, setAddress] = useState("");
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

  const { data, totalCounts, hasNextPage, setFetching } = useInfiniteScroll(
    getOptionHouses,
    {
      size: 24,
    }
  );

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

  const onTop = () => {
    if (scrollRef.current.scrollTop == 0) return;
    // 현재 위치가 이미 최상단일 경우 return

    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    if (params.options != "options=null") {
      setFilter(getOptionsByUrl(params.options));
      setIsOption(true);
    }
  }, [params]);

  // useEffect(() => {
  //   console.log("filter", filter);
  // }, [filter]);

  useEffect(() => {
    console.log("data", {
      data,
      hasNextPage,
    });
  }, [data]);

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
              <HouseOptMenu address={address} />
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
              w="30vw"
            >
              부동산 목록 {totalCounts ? totalCounts : ""} 개
            </Text>
            <Flex
              w="76.5%"
              borderRadius="10px"
              px="10px"
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
        <GridItem
          area={"main"}
          mt="0.2%"
          mr="0.3%"
          maxH="74.5vh"
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
