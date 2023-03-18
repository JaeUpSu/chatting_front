import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { HouseRegisterValues } from "../../services/data";

const HouseSell = () => {
  const [formData, setFormData] = useState({
    title: "",
    gu: "",
    dong: "",
    room_kind: "",
    sell_kind: "",
    sale: "",
    deposit: "",
    monthly_rent: "",
    maintenance_cost: "",
    room: "",
    toilet: "",
    pyeongsu: "",
    distance_to_station: "",
    address: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <VStack>
      <Center
        p={10}
        pt="5vh"
        w="120vw"
        borderWidth="1px"
        borderRadius="lg"
        overflowY="scroll"
        maxHeight="90vh"
      >
        <form onSubmit={handleSubmit} style={{ width: "30vw", height: "90vh" }}>
          {HouseRegisterValues.map((item, idx) => {
            return (
              <FormControl
                key={idx}
                id={item.eng}
                isRequired={item.isRequired}
                my="3"
              >
                <FormLabel>{item.kor}</FormLabel>
                <Input
                  type="text"
                  name={item.eng}
                  onChange={handleInputChange}
                />
              </FormControl>
            );
          })}

          <Button my="5%">판매 등록</Button>
        </form>
      </Center>
    </VStack>
  );
};
export default HouseSell;
