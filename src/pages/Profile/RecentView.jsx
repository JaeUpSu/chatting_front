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

export default function RecentView() {
  const { isLoading, data } = useQuery(["recently_views"], getHouseLists);

  return (
    <VStack wrap={"wrap"} height="60vh" overflowY="scroll" sx={scrollbarStyle}>
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
              <Card w="230px" h="350px" m="10px" overflow={"hidden"}>
                <Link to={`/houseList/house/${item.recently_views.id}`}>
                  <Image
                    src={item.recently_views.thumnail}
                    w="24.9rem"
                    h="12rem"
                  />
                </Link>

                <CardBody>
                  <Box
                    fontWeight={600}
                    mb="0.7rem"
                    fontSize={"x-large"}
                    color="blackAlpha.800"
                  >
                    {item.recently_views.title}
                  </Box>

                  <Flex fontSize={"md"} fontWeight="600">
                    <Text mr="0.5rem">
                      {RoomKindsToFront[item.recently_views.room_kind]}
                    </Text>
                    <Text>
                      {SellKindsToFront[item.recently_views.sell_kind]}
                    </Text>
                  </Flex>

                  <Flex
                    fontSize={"md"}
                    color={"#ff404c"}
                    fontWeight={"bold"}
                    mb="1rem"
                  >
                    <Text>
                      {`${getSaleContents(
                        item.recently_views.sell_kind,
                        item.recently_views.deposit,
                        item.recently_views.monthly_rent,
                        item.recently_views.sale
                      )}`}
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
}
