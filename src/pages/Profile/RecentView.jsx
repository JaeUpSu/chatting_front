import { useQuery } from "@tanstack/react-query";
import { getHouseLists } from "../../services/api";
import {
  Card,
  CardBody,
  Image,
  Flex,
  Grid,
  GridItem,
  Text,
  Box,
  Center,
  VStack,
} from "@chakra-ui/react";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";
import { Link } from "react-router-dom";
import scrollbarStyle from "../../styles/scroll_bar";
import ListCard from "../../components/Card/ListCard";

export default function RecentView() {
  const { isLoading, data } = useQuery(["recently_views"], getHouseLists);

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
          {data?.map((item, index) => {
            return (
              <GridItem key={index}>
                <ListCard {...item.recently_views} />
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
    </VStack>
  );
}
