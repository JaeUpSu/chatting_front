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
      address: "123 Main St",
      price: 100000,
      transactions: [{ date: "01/01/2023", amount: 50000 }],
    },
    {
      address: "456 Maple Ave",
      price: 200000,
      transactions: [
        { date: "02/01/2023", amount: 100000 },
        { date: "03/01/2023", amount: 50000 },
      ],
    },
  ];

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="h3" size="md" mb="4">
        Your Registered Houses
      </Heading>
      <List>
        {houses.map((house) => (
          <ListItem key={house.address} mb="4">
            <Box borderWidth="1px" borderRadius="lg" p="4">
              <p>
                <strong>Address:</strong> {house.address}
              </p>
              <p>
                <strong>Price:</strong> {house.price}
              </p>
              <Heading as="h4" size="sm" mt="4" mb="2">
                Transaction Records
              </Heading>
              <List>
                {house.transactions.map((transaction) => (
                  <ListItem key={transaction.date} mb="2">
                    <p>
                      <strong>Date:</strong> {transaction.date}
                    </p>
                    <p>
                      <strong>Amount:</strong> {transaction.amount}
                    </p>
                  </ListItem>
                ))}
              </List>
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
    <Box maxW="md" mx="auto" my="8" h="800px" overflowY="scroll">
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Heading as="h3" size="md" mb="4">
          Gneral User Profile
        </Heading>
        <p>Welcome to your profile page!</p>
        <p>Here is some general information about you:</p>
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
          <option value="general">General</option>
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
  );
}

export default Profile;
