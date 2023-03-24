import { Card, Box, CardBody, Text, Heading, VStack } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { RoomKindsToFront, SellKindsToFront } from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";

function MyHouseCard({
  thumnail,
  title,
  sell_kind,
  room_kind,
  id,
  deposit,
  monthly_rent,
  sale,
  is_sale,
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
            <VStack alignItems="flex-start" pl="3" pt="4">
              <Heading fontSize={"x-large"} color="blackAlpha.800">
                {title}
              </Heading>
              <Text fontSize={"md"} color="red.400" fontWeight={"bold"} pt="2">
                {is_sale ? "판매중" : "판매 완료"}
              </Text>
              <VStack alignItems={"flex-start"}>
                <Text color="blackAlpha.800" fontSize="md" fontWeight="600">
                  {`${RoomKindsToFront[room_kind]} ${SellKindsToFront[sell_kind]}`}
                </Text>
                <Text fontSize="md" fontWeight="600">
                  {`${getSaleContents(sell_kind, deposit, monthly_rent, sale)}`}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </CardBody>
      </Link>
    </Card>
  );
}
export default MyHouseCard;
