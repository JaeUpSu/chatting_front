import React, { useState } from "react";
import {
  Box,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  List,
  ListItem,
  Image,
} from "@chakra-ui/react";

// Component for registering a house
function RegisterHouse(props) {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save the house details to the backend
    // ...
    // Show a success message to the user
    alert("House registered successfully!");
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h3" size="md" mb="4">
        Register a House
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Register House
        </Button>
      </form>
    </Box>
  );
}

function ViewHouses(props) {
  // Retrieve the landlord's registered houses and transaction records from the backend
  const houses = [
    {
      id: 1,
      address: "123 Main St",
      bedrooms: 2,
      bathrooms: 2,
      rent: 2500,
      imageUrl: "https://cdn.imweb.me/thumbnail/20191030/5ec98b32ba90f.png",
    },
    {
      id: 2,
      address: "456 Elm St",
      bedrooms: 3,
      bathrooms: 2,
      rent: 3000,
      imageUrl: "https://cdn.imweb.me/thumbnail/20191030/5ec98b32ba90f.png",
    },
    {
      id: 3,
      address: "789 Oak St",
      bedrooms: 1,
      bathrooms: 1,
      rent: 1500,
      imageUrl: "https://cdn.imweb.me/thumbnail/20191030/5ec98b32ba90f.png",
    },
  ];

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h3" size="md" mb="4">
        Your Registered Houses
      </Heading>
      <List display="flex" flexWrap="wrap">
        {houses.map((house) => (
          <ListItem
            key={house.id}
            mb="4"
            flex="1"
            minWidth="300px"
            marginRight="4"
          >
            <Image src={house.imageUrl} alt={house.address} mr="4" w="200px" />
            <Box>
              <Heading as="h4" size="md" mb="2">
                {house.address}
              </Heading>
              <p>
                {house.bedrooms} bedroom, {house.bathrooms} bathroom - $
                {house.rent}/month
              </p>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function Profile(props) {
  const [userType, setUserType] = useState("general"); // Set the user type to 'general' by default

  // Handle changing the user type
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <Box maxWidth="100vw" margin="0 auto">
      <Box
        w="70vw"
        mx="auto"
        my="8"
        h="800px"
        overflowY="scroll"
        boxShadow="0px 3px 3px 1px black"
        padding="20px"
        borderRadius="10px"
      >
        <Box borderWidth="1px" borderRadius="lg" p="4" mb="5">
          <Heading as="h3" size="md" mb="4">
            User Profile
          </Heading>
          <List styleType="none" mt="4">
            <ListItem>Name: John Doe</ListItem>
            <ListItem>Email: john.doe@example.com</ListItem>
            <ListItem>Membership Status: Active</ListItem>
            <ListItem>Membership Type: Premium</ListItem>
          </List>
        </Box>
        <FormControl mb="4">
          <FormLabel>User Type</FormLabel>
          <Select value={userType} onChange={handleUserTypeChange}>
            <option value="landlord">Landlord</option>
            <option value="broker">Broker</option>
          </Select>
        </FormControl>

        {userType === "landlord" && (
          <>
            <RegisterHouse />
            <ViewHouses />
          </>
        )}

        {userType === "broker" && (
          <Box borderWidth="1px" borderRadius="lg" p="4">
            <Heading as="h3" size="md" mb="4">
              Broker Profile
            </Heading>
            <p>Here is a list of registered houses and transaction records:</p>
            <List mt="4">
              <ListItem>
                123 Main St - 2 bedroom, 2 bathroom apartment - $2,500/month
              </ListItem>
              <ListItem>
                456 Elm St - 3 bedroom, 2 bathroom house - $3,000/month
              </ListItem>
              <ListItem>
                789 Oak St - 1 bedroom, 1 bathroom studio - $1,500/month
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
