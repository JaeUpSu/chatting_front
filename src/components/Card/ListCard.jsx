import React from "react";
import {
  Card,
  Box,
  CardBody,
  Text,
  Image,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RoomKindsToFront, SellKindsToFront } from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";

function ListCard({
  thumnail,
  title,
  sell_kind,
  room_kind,
  id,
  deposit,
  monthly_rent,
  sale,
}) {
  return (
    <Card
      h="100%"
      w="100%"
      boxShadow="md"
      _hover={{ backgroundColor: "rgb(140,140,140,0.1)" }}
    >
      <Link to={`/houseList/house/${id}`}>
        <CardBody
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          cursor="pointer"
        >
          <VStack w={"100%"} alignItems="flex-start" spacing={"2"}>
            <Box
              backgroundImage={thumnail}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              width="100%"
              alt="house"
              borderRadius="lg"
              css={{
                aspectRatio: "1 / 1",
              }}
            />{" "}
            <Heading fontSize={"x-large"} color="blackAlpha.800">
              {title}
            </Heading>
            <Flex fontSize={"md"} fontWeight="600">
              <Text mr="0.5rem">{`${RoomKindsToFront[room_kind]}`}</Text>
              <Text>{`${SellKindsToFront[sell_kind]}`}</Text>
            </Flex>
            <Flex color={"#ff404c"} fontSize={"md"} fontWeight="600">
              <Text>
                {`${getSaleContents(sell_kind, deposit, monthly_rent, sale)}`}
              </Text>
            </Flex>
          </VStack>
        </CardBody>
      </Link>
    </Card>
  );
}

export default ListCard;
