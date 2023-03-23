import {
  Card,
  Box,
  CardBody,
  Text,
  Heading,
  VStack,
  HStack,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoomKindsToFront, SellKindsToFront } from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";

function MyHouseCard({
  thumnail,
  title,
  sell_kind,
  description,
  room_kind,
  id,
  deposit,
  monthly_rent,
  sale,
  is_sale,
}) {
  const navigation = useNavigate();

  const onHouseDetail = () => {
    navigation(`house/${id}`);
  };

  // useEffect(() => {
  //   console.log({
  //     thumnail,
  //     sell_kind,
  //     description,
  //     room_kind,
  //     id,
  //     deposit,
  //     monthly_rent,
  //     sale,
  //     is_sale,
  //   });
  // }, [address]);

  return (
    <Card
      w="100%"
      boxShadow="0px"
      _hover={{ backgroundColor: "rgb(140,140,140,0.1)" }}
    >
      <CardBody
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        onClick={onHouseDetail}
        cursor="pointer"
      >
        <VStack w={"100%"} alignItems="flex-start" spacing={"5"}>
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
          />
          <VStack alignItems={"flex-start"}>
            <Heading
              size="sm"
              fontSize="1.5em"
              color="blackAlpha.800"
              noOfLines={1}
            >
              <HStack>
                <Text> {title}</Text>
                <Text fontSize={"lg"} color="red.400" fontWeight={"bold"}>
                  {is_sale ? "판매중" : "판매 완료"}
                </Text>
              </HStack>
            </Heading>
            <Text
              h="auto"
              color="blackAlpha.800"
              fontSize="1.1em"
              noOfLines={1}
            >
              {description?.length > 10
                ? description.substring(0, 10) + "..."
                : description}
            </Text>
            <VStack spacing={"0"} alignItems={"flex-start"}>
              <HStack alignItems="center">
                <Text color="blackAlpha.800" fontSize="1.1em" fontWeight="600">
                  {`${RoomKindsToFront[room_kind]} ${SellKindsToFront[sell_kind]}`}
                </Text>
              </HStack>
              <Text fontSize="1.1em" fontWeight="600">
                {`${getSaleContents(sell_kind, deposit, monthly_rent, sale)}`}
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
export default MyHouseCard;
