import {
  Card,
  CardBody,
  Image,
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { getWishLists } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { getSaleContents } from "../../utils/getSaleContents";
import { Link } from "react-router-dom";
import { useState } from "react";
import scrollbarStyle from "../../styles/scroll_bar";

const PagenationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

export default function WishList() {
  const { isLoading, data } = useQuery(["house"], getWishLists);
  const [page, setPage] = useState(1);
  const pageChange = (page) => {
    setPage(page);
  };

  const startIdx = (page - 1) * 12;
  const endIdx = startIdx + 12;
  const currentPageData = data?.slice(startIdx, endIdx);

  return (
    <VStack height="60vh" overflowY="scroll" sx={scrollbarStyle}>
      <VStack>
        <Grid
          gridTemplateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap="2"
          columnGap="8"
          py="7"
        >
          {currentPageData?.map((item, index) => {
            return (
              <GridItem key={index}>
                <Card w="230px" h="350px" m="10px" overflow={"hidden"}>
                  <Link to={`/houseList/house/${item.house.id}`}>
                    <Image src={item.house.thumnail} w="20rem" h="12rem" />
                  </Link>
                  <CardBody>
                    <Box
                      fontWeight={600}
                      mb="0.7rem"
                      fontSize={"x-large"}
                      color="blackAlpha.800"
                    >
                      {item.house.title}
                    </Box>
                    <Flex fontSize={"md"} fontWeight="600">
                      <Text mr="0.5rem">
                        {RoomKindsToFront[item.house.room_kind]}
                      </Text>
                      <Text>{SellKindsToFront[item.house.sell_kind]}</Text>
                    </Flex>

                    <Flex color={"#ff404c"} fontSize={"md"} fontWeight="600">
                      <Text>
                        {`${getSaleContents(
                          item.house.sell_kind,
                          item.house.deposit,
                          item.house.monthly_rent,
                          item.house.sale
                        )}`}
                      </Text>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
        </Grid>

        <PagenationBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={9}
            totalItemsCount={data?.length ?? 0}
            pageRangeDisplayed={5}
            prevPageText="<"
            nextPageText=">"
            onChange={pageChange}
          ></Pagination>
        </PagenationBox>
      </VStack>
    </VStack>
  );
}
