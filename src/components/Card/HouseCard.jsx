import {
  Card,
  Box,
  CardBody,
  Image,
  Text,
  Heading,
  VStack,
  Divider,
  CardFooter,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";

import {
  faUserTie,
  faHomeUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import ActiveBadge from "../Badge/ActiveBadge";
import PassiveBadge from "../Badge/PassiveBadge";

function HouseCard({ id, img, address, info, contents, seller }) {
  const navigation = useNavigate();

  const onHouseDetail = () => {
    navigation(`house/${id}`);
  };
  return (
    <Card
      maxW="container.md"
      _hover={{ backgroundColor: "rgb(110,110,110,0.1)" }}
    >
      <CardBody
        onClick={onHouseDetail}
        cursor="pointer"
        w="55%"
        // position="relative"
      >
        <HStack>
          <Image src={img} alt="house" borderRadius="lg" />
          <Box left="40px" top="-10px" spacing="3" position="relative" h="100%">
            <Box>
              <Heading size="md" mb="30px" fontSize="26px">
                {address}
              </Heading>
              <Text h="25px" w="280px" fontSize="17px">
                {info.length > 17 ? info.substring(0, 17) + "..." : info}
              </Text>
              <Text mt="35px" color="blue.600" fontSize="28px">
                {contents}
              </Text>
            </Box>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
}
export default HouseCard;
