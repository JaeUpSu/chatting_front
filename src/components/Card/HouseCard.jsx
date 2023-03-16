import { Card, Box, CardBody, Text, Heading, VStack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  RoomKindsToBack,
  CellKindsToBack,
  RoomKindsToFront,
  CellKindsToFront,
} from "../../services/data";
import { getSaleContents } from "../../utils/getSaleContents";
function HouseCard({
  thumnail,
  address,
  cell_kind,
  description,
  gu,
  dong,
  room_kind,
  id,
  deposit,
  monthly_rent,
  sale,
}) {
  const navigation = useNavigate();

  const onHouseDetail = () => {
    navigation(`house/${id}`);
  };

  return (
    <Card
      maxW="container.md"
      m="15px"
      w="22%"
      boxShadow="0px"
      _hover={{ backgroundColor: "rgb(140,140,140,0.1)" }}
    >
      <CardBody
        onClick={onHouseDetail}
        cursor="pointer"
        h="auto"
        // position="relative"
      >
        <VStack>
          <Box
            backgroundImage={thumnail}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            width="100%"
            alt="house"
            borderRadius="lg"
            boxShadow="0px 0px 1px 1px gray"
            css={{
              aspectRatio: "2 / 1",
            }}
          />
          <Box left="8%" top="10px" spacing="3" position="relative">
            <Box w="22vw">
              <Heading
                w="100%"
                size="md"
                mb="5px"
                fontSize="1.7em"
                color="blackAlpha.800"
              >
                {address}
              </Heading>
              <Text
                h="auto"
                w="100%"
                color="blackAlpha.800"
                fontSize="1.1em"
                mb="4"
              >
                {description.length > 17
                  ? description.substring(0, 17) + "..."
                  : description}
              </Text>
              <Text
                mt="5px"
                color="blackAlpha.800"
                fontSize="1.5em"
                fontWeight="600"
              >
                {`${RoomKindsToFront[room_kind]} ${CellKindsToFront[cell_kind]}`}
              </Text>
              <Text mt="5px" color="red.400" fontSize="1.4em" fontWeight="600">
                {`${getSaleContents(cell_kind, deposit, monthly_rent, sale)}`}
              </Text>
            </Box>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
}
export default HouseCard;
