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
      ml="20px"
      mb="15px"
      _hover={{ backgroundColor: "rgb(110,110,110,0.1)" }}
      w="800px"
    >
      <CardBody
        onClick={onHouseDetail}
        cursor="pointer"
        w="55%"
        position="relative"
      >
        <HStack w="100%">
          <Image src={img} alt="house" borderRadius="lg" />
          <Box left="40px" top="-10px" spacing="3" position="relative" h="100%">
            <Flex position="absolute" bottom="-35px" right="10px">
              <Flex
                direction="column"
                mx="20px"
                position="relative"
                translateY="20%"
              >
                {seller.brokerActive ? <ActiveBadge /> : <PassiveBadge />}
                <FontAwesomeIcon size="2x" icon={faUserTie} />
                <Text>중개사</Text>
              </Flex>
              <Flex direction="column" position="relative">
                {seller.ownerActive ? <ActiveBadge /> : <PassiveBadge />}
                <FontAwesomeIcon size="2x" icon={faHomeUser} />
                <Text>집주인</Text>
              </Flex>
            </Flex>
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
