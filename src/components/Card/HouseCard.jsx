import {
  Card,
  Box,
  CardBody,
  Image,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";

import {
  faUserTie,
  faHomeUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function HouseCard({ id, img, address, info, contents, seller }) {
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
          <Image
            src={img}
            alt="house"
            borderRadius="lg"
            boxShadow="0px 0px 1px 1px gray"
          />
          <Box left="8%" top="10px" spacing="3" position="relative">
            <Box w="22vw">
              <Heading w="100%" size="md" mb="5px" fontSize="26px">
                {address}
              </Heading>
              <Text h="auto" w="100%" fontSize="17px">
                {info.length > 17 ? info.substring(0, 17) + "..." : info}
              </Text>
              <Text mt="5px" color="blue.600" fontSize="28px">
                {contents}
              </Text>
            </Box>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
}
export default HouseCard;
