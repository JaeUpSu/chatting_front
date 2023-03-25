import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getGuList, getDongList } from "../../services/api";
import { Address, addressKinds, addressNameArr } from "../../services/data";

import SelectModal from "../Modal/SelectModal";

function AddressMenu({ onUpdate }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [guIdx, setGuIdx] = useState(0);

  const [btnIdx, setBtnIdx] = useState(1);
  const [address, setAddress] = useState(
    sessionStorage.getItem("ebmyeondong")
      ? `서울 ${sessionStorage.getItem("gugunsi")} ${sessionStorage.getItem(
          "ebmyeondong"
        )}`
      : sessionStorage.getItem("gugunsi")
      ? `서울 ${sessionStorage.getItem("gugunsi")}`
      : "Address Search"
  );
  const [activeBtns, setActiveBtn] = useState([false, true, false]);
  const [addressList, setAddressList] = useState(["서울", "", ""]);

  const guList = useQuery(["gulist"], getGuList);
  const dongList = useQuery(["donglist", guIdx], getDongList);

  const onHouseList = () => {
    navigate(`/houseList`);
  };

  const onMenuOpen = () => {
    setBtnIdx(1);
    onOpen();
  };

  const onSearchAddress = () => {
    let _address = `서울`;
    const dong = sessionStorage.getItem("ebmyeondong")
      ? sessionStorage.getItem("ebmyeondong")
      : "nothing";

    if (dong != "nothing") {
      _address += ` ${sessionStorage.getItem("gugunsi")} ${dong}`;

      setAddress(_address);
      onUpdate(address);
      setBtnIdx(0);
      onClose();
    } else {
      alert("구/동 모두 선택해야 버튼을 누를 수 있습니다.");
    }
  };

  const onNextActive = () => {
    setBtnIdx((i) => i + 1);
  };

  useEffect(() => {
    let index = 0;
    const gugunsi = sessionStorage.getItem("gugunsi");
    guList?.data?.forEach((item) => {
      if (item.name == gugunsi) {
        index = item.pk;
      }
    });
    setGuIdx(index);
  }, [addressList]);

  useEffect(() => {
    onHouseList();
  }, [address]);

  useEffect(() => {
    const new_ActiveBtn = activeBtns.map((data, idx) => {
      if (idx <= btnIdx && idx > 0) {
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
        minWidth: "250px",
        cursor: "pointer",
        transform: "translateX(20px)",
        backgroundColor: "rgb(233,239,244)",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      <Flex
        onClick={onMenuOpen}
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
          {address}
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
                        list={
                          idx == 1
                            ? guList?.isLoading
                              ? []
                              : guList?.data
                            : dongList?.isLoading
                            ? []
                            : dongList?.data
                        }
                        name={addressKinds[idx]}
                        valName={item}
                        active={activeBtns[idx]}
                        onNextActive={onNextActive}
                        onSetAddress={setAddressList}
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
