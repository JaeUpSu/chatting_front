import { useQuery } from "@tanstack/react-query";
import { getHouseLists } from "../../services/api";
import styled from "styled-components";
import {
  VStack,
  Card,
  CardBody,
  Image,
  Flex,
  Text,
  Box,
  CardFooter,
} from "@chakra-ui/react";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";
import { Link } from "react-router-dom";

export default function RecentView() {
  const { error, data } = useQuery(["recently_views"], getHouseLists);
  if (error) {
    return <div>Error...</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Flex wrap={"wrap"} h="60vh" width="75vw" overflowY="scroll">
      {data?.map((item, index) => {
        return (
          <Card w="190px" m="10px" overflow={"hidden"} ml="2rem">
            <Link to={`/houseList/house/${item.recently_views.id}`}>
              <Image src={item.recently_views.thumnail} w="24.9rem" h="12rem" />
            </Link>

            <CardBody>
              <Box fontWeight={600} mb="1rem">
                {item.recently_views.title}
              </Box>

              <Flex fontSize={"sm"}>
                <Text mr="0.5rem">
                  {RoomKindsToFront[item.recently_views.room_kind]}
                </Text>
                <Text>{SellKindsToFront[item.recently_views.sell_kind]}</Text>
              </Flex>

              <Flex fontSize={"sm"} color={"#ff404c"}>
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
        );
      })}
    </Flex>
  );
}
