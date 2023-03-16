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
        pt="20vh"
        w="100vw"
        borderWidth="1px"
        borderRadius="lg"
        overflow="auto"
        maxHeight="90vh"
      >
        <form onSubmit={handleSubmit} style={{ width: "30vw" }}>
          <FormControl id="title" isRequired>
            <FormLabel>제목</FormLabel>
            <Input type="text" name="title" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="gu" isRequired>
            <FormLabel>구</FormLabel>
            <Select
              placeholder="구를 선택해주세요"
              onChange={handleInputChange}
              name="gu"
            >
              <option value="Jongno-gu">Jongno-gu</option>
              <option value="Gangnam-gu">Gangnam-gu</option>
              <option value="Mapo-gu">Mapo-gu</option>
              <option value="Seocho-gu">Seocho-gu</option>
            </Select>
          </FormControl>
          <FormControl id="dong" isRequired>
            <FormLabel>동</FormLabel>
            <Input type="text" name="dong" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="room_kind" isRequired>
            <FormLabel>방 종류</FormLabel>
            <Select
              placeholder="방 종류를 선택해주세요"
              onChange={handleInputChange}
              name="room_kind"
            >
              <option value="SHARE_HOUSE">쉐어하우스</option>
              <option value="ONE_ROOM">원룸</option>
              <option value="TWO_ROOM">투룸</option>
              <option value="THREE_ROOM">쓰리룸</option>
            </Select>
          </FormControl>
          <FormControl id="sell_kind" isRequired>
            <FormLabel>거래종류</FormLabel>
            <Select
              placeholder="거래종류를 선택해주세요"
              onChange={handleInputChange}
              name="sell_kind"
            >
              <option value="CHARTER">월세</option>
              <option value="JEONSE">전세</option>
              <option value="SELL">매매</option>
            </Select>
          </FormControl>
          <FormControl id="sale" isRequired>
            <FormLabel>매매가</FormLabel>
            <Input type="number" name="sale" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="monthly_rent" isRequired>
            <FormLabel>월세</FormLabel>
            <Input
              type="number"
              name="monthly_rent"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="deposit" isRequired>
            <FormLabel>보증금</FormLabel>
            <Input type="number" name="deposit" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="maintenance_cost" isRequired>
            <FormLabel>관리비</FormLabel>
            <Input
              type="number"
              name="maintenance_cost"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="room" isRequired>
            <FormLabel>방 개수</FormLabel>
            <Input type="number" name="room" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="toilet" isRequired>
            <FormLabel>화장실 개수</FormLabel>
            <Input type="number" name="toilet" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="pyeongsu" isRequired>
            <FormLabel>평수</FormLabel>
            <Input type="number" name="pyeongsu" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>설명</FormLabel>
            <Input
              type="number"
              name="description"
              onChange={handleInputChange}
            />
          </FormControl>
          <Button mt="5%">판매 등록</Button>
        </form>
      </Center>
    </VStack>
  );
};
export default HouseSell;
