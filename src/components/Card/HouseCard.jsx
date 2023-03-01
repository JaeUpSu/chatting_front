import {
  Card,
  Box,
  CardBody,
  Image,
  Text,
  Heading,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";

import { faUserTie, faHomeUser } from "@fortawesome/free-solid-svg-icons";
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
    <Card maxW="container.md">
      <CardBody>
        <Image src={img} alt="house" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{address}</Heading>
          <Text>{info}</Text>
          <Text color="blue.600" fontSize="2xl">
            {contents}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter w="380px">
        <Flex justifyContent="spaca-between" alignItems="center" w="100%">
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={onHouseDetail}>
              Detail
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>

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
      </CardFooter>
    </Card>
  );
}
export default HouseCard;
