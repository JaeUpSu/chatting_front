import {
  VStack,
  Card,
  CardBody,
  Image,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { getWishLists } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "react-bootstrap";
import { useEffect } from "react";
import { SellKindsToFront, RoomKindsToFront } from "../../services/data";

export default function WishList() {
  const { data } = useQuery(["house"], getWishLists);

  return (
    <Flex>
      {data?.map((item, index) => {
        return (
          <Card w="250px" m="20px">
            <Image src={item.house.thumnail} h="150px" />
            <CardBody>
              <Flex justify={"space-between"}>
                <Box fontWeight={600}>{item.house.title}</Box>
                {RoomKindsToFront[item.house.room_kind]}
              </Flex>

              <Flex justify={"space-around"}>
                <Box>{SellKindsToFront[item.house.sell_kind]}</Box>
                {item?.house.deposit !== 0
                  ? item?.house.deposit
                  : item?.house.sale !== 0
                  ? item?.house.sale
                  : null}
                <Box>
                  {item?.house.monthly_rent !== 0
                    ? item?.house.monthly_rent
                    : null}
                </Box>
              </Flex>
            </CardBody>
          </Card>
        );
      })}
    </Flex>
  );
}
