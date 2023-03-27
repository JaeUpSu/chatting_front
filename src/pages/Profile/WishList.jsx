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
import { getSaleContents } from "../../utils/getSaleContents";
import { Link } from "react-router-dom";
import { useState } from "react";
import scrollbarStyle from "../../styles/scroll_bar";
import PaginationCont from "./../../components/Pagination/PaginationCont";
import ListCard from "./../../components/Card/ListCard";

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
    <VStack>
      <VStack height="60vh" overflowY="scroll" sx={scrollbarStyle}>
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
                <ListCard {...item.house} />
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
      <PaginationCont
        activePage={page}
        itemsCountPerPage={9}
        totalItemsCount={data?.length ?? 0}
        pageRangeDisplayed={5}
        onChange={pageChange}
      />
    </VStack>
  );
}
