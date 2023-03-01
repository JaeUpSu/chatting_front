import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  FormControl,
  Highlight,
  Input,
  HStack,
  Text,
} from "@chakra-ui/react";
import { cities } from "../../services/data";
import SelectModal from "../Modal/SelectModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AddressMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [address, setAddress] = useState("Loading...");
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };

  useEffect(() => {
    const city = localStorage.getItem("시/도");
    if (city !== undefined && city !== "undefined") {
      setAddress(city);
    }
    const gugunsi = localStorage.getItem("구/군/시");
    if (gugunsi !== undefined && gugunsi !== "undefined") {
      setAddress((item) => item + " " + gugunsi);
    }
    const ebmyeondong = localStorage.getItem("읍/면/동");
    if (ebmyeondong !== undefined && ebmyeondong !== "undefined") {
      setAddress((item) => item + " " + ebmyeondong);
    }
  }, []);

  const onSearchAddress = () => {
    const city = localStorage.getItem("시/도");
    const gugunsi = localStorage.getItem("구/군/시");
    const ebmyeondong = localStorage.getItem("읍/면/동");
    setAddress(city + " " + gugunsi + " " + ebmyeondong);
    refreshPage();
    onClose();
  };

  return (
    <>
      <HStack onClick={onOpen} p="5px 20px">
        <Text color="#555" border="0px" mr="20px">
          {address}
        </Text>
        <FontAwesomeIcon size={"lg"} icon={faSearch} />
      </HStack>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Highlight
              query={address}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "red.100",
              }}
            >
              {address}
            </Highlight>
          </DrawerHeader>

          <DrawerBody>
            <FormControl
              display="grid"
              w="100%"
              gridTemplateColumns="repeat(5, 1fr)"
              gap="0px 10px"
            >
              <SelectModal list={cities} valName="시/도" />
              <SelectModal list={cities} valName="구/군/시" />
              <SelectModal list={cities} valName="읍/면/동" />
              <Button
                _hover={{ bg: "red.500" }}
                backgroundColor="red.300"
                color="white"
                w="60px"
                onClick={onSearchAddress}
              >
                찾기
              </Button>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AddressMenu;
