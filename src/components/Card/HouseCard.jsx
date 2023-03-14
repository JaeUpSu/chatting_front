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
  Image,
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
            backgroundImage={Image[0].url}
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
              <Heading w="100%" size="md" mb="5px" fontSize="26px">
                {address}
              </Heading>
              <Text h="auto" w="100%" fontSize="17px">
                {description.length > 17
                  ? description.substring(0, 17) + "..."
                  : description}
              </Text>
              <Text mt="5px" color="blue.600" fontSize="25px">
                {`${RoomKindsToFront[room_kind]} ${CellKindsToFront[cell_kind]}`}
              </Text>
              <Text mt="5px" color="blue.600" fontSize="22px">
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
