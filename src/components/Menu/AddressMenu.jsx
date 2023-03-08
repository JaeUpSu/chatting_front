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
  HStack,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Address, addressKinds, addressNameArr } from "../../services/data";
import SelectModal from "../Modal/SelectModal";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAddressUrl } from "../../utils/getAddressUrl";
import { getAddress } from "../../services/local";
import { isPrevChecking } from "../../utils/isPrevChecking";

function AddressMenu() {
  const navigate = useNavigate();
  const params = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [btnIdx, setBtnIdx] = useState(0);
  const [address, setAddress] = useState("");
  const [activeBtns, setActiveBtn] = useState([true, false, false]);

  const onHouseList = (_address) => {
    console.log(params);
    navigate(`/houseList/${_address}/options=`);
  };

  const onSearchAddress = () => {
    setAddress(getAddress());
    setBtnIdx(0);
    onClose();
  };

  const onNextActive = () => {
    setBtnIdx((i) => i + 1);
  };

  useEffect(() => {
    onHouseList(getAddressUrl(address));
  }, [address]);

  useEffect(() => {
    const new_ActiveBtn = activeBtns.map((data, idx) => {
      if (idx <= btnIdx) {
        return true;
      } else {
        return false;
      }
    });
    setActiveBtn(new_ActiveBtn);
  }, [btnIdx]);

  return (
    <div
      style={{
        width: "90%",
        minWidth: "250px",
        cursor: "pointer",
        transform: "translateX(20px)",
        border: "2px solid black",
        borderRadius: "10px",
        padding: "5px",
        marginRight: "50px",
      }}
    >
      <Flex
        onClick={onOpen}
        p="5px 20px"
        w="100%"
        justifyContent="space-around"
      >
        <Text
          color="#555"
          fontWeight="700"
          border="0px"
          w="80%"
          textAlign="center"
        >
          {address.length > 1 ? address : "Address Search ..."}
        </Text>
        <FontAwesomeIcon size={"lg"} icon={faSearch} />
      </Flex>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Text fontWeight="700">Address Search</Text>
          </DrawerHeader>

          <DrawerBody my="10px">
            <FormControl
              display="grid"
              w="100%"
              gridTemplateColumns="repeat(5, 1fr)"
              gap="0px 10px"
            >
              <HStack>
                {addressNameArr.map((item, idx) => {
                  return (
                    <Box key={idx}>
                      <SelectModal
                        list={idx == 0 ? ["서울"] : Address[addressKinds[idx]]}
                        name={addressKinds[idx]}
                        valName={item}
                        active={activeBtns[idx]}
                        onNextActive={onNextActive}
                      />
                    </Box>
                  );
                })}

                <Button
                  _hover={{ bg: "red.500" }}
                  backgroundColor="red.300"
                  color="white"
                  w="60px"
                  onClick={onSearchAddress}
                >
                  찾기
                </Button>
              </HStack>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default AddressMenu;
