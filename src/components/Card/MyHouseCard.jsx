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

  useEffect(() => {
    console.log(title, title.length);
  }, [title]);

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
          <Heading fontSize="1.5em" color="blackAlpha.800" w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Text>
                {title?.length > 10 ? title.substring(0, 6) + "..." : title}
              </Text>
              <Text fontSize={"lg"} color="red.400" fontWeight={"bold"}>
                {is_sale ? "판매중" : "판매 완료"}
              </Text>
            </HStack>
          </Heading>
          <VStack alignItems={"flex-start"} width="100%">
            <Text color="blackAlpha.800" fontSize="1.1em" fontWeight="600">
              {`${RoomKindsToFront[room_kind]} ${SellKindsToFront[sell_kind]}`}
            </Text>
            <Text fontSize="1.1em" fontWeight="600">
              {`${getSaleContents(sell_kind, deposit, monthly_rent, sale)}`}
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
export default MyHouseCard;
