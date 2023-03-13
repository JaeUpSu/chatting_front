import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Heading,
  Text,
  Image,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";

import { getHouse } from "../../services/api";
import { getSaleContents } from "../../utils/getSaleContents";

function House() {
  const params = useParams();
  const id = params.houseId;
  const { data, isLoading } = useQuery(["house", id], getHouse);

  useEffect(() => {
    console.log("Detail", id);
  }, [id]);

  useEffect(() => {
    console.log("Detail", data);
  }, [data]);

  return (
    <Box>
      <Heading as="h1" fontSize="3xl" mb="4">
        Beautiful House in the Countryside
      </Heading>
      <Text mb="4">
        This is a stunning house in a peaceful rural location. It features three
        bedrooms, two bathrooms, a spacious living room, and a fully equipped
        kitchen. The house is surrounded by beautiful gardens and has a private
        swimming pool.
      </Text>
      <Image src="https://via.placeholder.com/800x600" alt="House" mb="4" />
      <Heading as="h2" fontSize="2xl" mb="2">
        Details
      </Heading>
      <List mb="4">
        <ListItem>Bedrooms: 3</ListItem>
        <ListItem>Bathrooms: 2</ListItem>
        <ListItem>Maximum occupancy: 6</ListItem>
        <ListItem>Minimum stay: 3 nights</ListItem>
        <ListItem>Price per night: $150</ListItem>
      </List>
      <Button colorScheme="blue" size="lg">
        Book Now
      </Button>
    </Box>
  );
}

export default House;
