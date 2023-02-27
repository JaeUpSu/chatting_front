import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Highlight,
  Input,
} from "@chakra-ui/react";

import { useState } from "react";
import SelectModal from "../../components/Modal/SelectModal";
import { cellKind, priceArr, cities } from "../../services/data";

function HouseList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(50);
  const [address, setAddress] = useState("서울 강남구 잠원동");

  const onSearchAddress = () => {
    const city = localStorage.getItem("시/도");
    const gugunsi = localStorage.getItem("구/군/시");
    const ebmyeondong = localStorage.getItem("읍/면/동");
    setAddress(city + " " + gugunsi + " " + ebmyeondong);
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Open
      </Button>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            House Option
            <Highlight
              query={address}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "red.100",
                mx: "10",
              }}
            >
              {address}
            </Highlight>
            <br />
            <br />
            <FormControl
              display="grid"
              w="100%"
              gridTemplateColumns="repeat(5, 1fr)"
              gap="0px 10px"
            >
              <SelectModal list={cities} valName="시/도" />
              <SelectModal list={cellKind} valName="구/군/시" />
              <SelectModal list={cellKind} valName="읍/면/동" />
              <Button
                colorScheme="gray"
                border="2px"
                borderColor="red.300"
                color="#666"
                w="60px"
                onClick={onSearchAddress}
              >
                찾기
              </Button>
            </FormControl>
          </DrawerHeader>

          <DrawerBody>
            <br />
            <FormControl as="fieldset">
              <FormLabel as="legend">Radio Group</FormLabel>
              <RadioGroup defaultValue="">
                <HStack spacing="24px">
                  {cellKind?.map((item, idx) => {
                    return (
                      <Radio key={idx} value={item}>
                        {item}
                      </Radio>
                    );
                  })}
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <FormLabel as="legend">Checkbox Group</FormLabel>
            <CheckboxGroup colorScheme="green">
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                {cellKind?.map((item, idx) => {
                  return (
                    <Checkbox
                      key={idx}
                      size="md"
                      colorScheme="blue"
                      value={item}
                    >
                      {item}
                    </Checkbox>
                  );
                })}
              </Stack>
            </CheckboxGroup>
            <br />
            <br />
            <RangeSlider
              defaultValue={[0, 50]}
              min={0}
              max={300}
              step={10}
              w="500px"
              onChange={(val) => {
                setLeftValue(val[0]);
                setRightValue(val[1]);
              }}
            >
              {priceArr.map((item, idx) => {
                return (
                  <RangeSliderMark key={idx} value={item}>
                    {item}
                  </RangeSliderMark>
                );
              })}
              <RangeSliderMark
                value={leftValue}
                textAlign="center"
                bg="gray.500"
                color="white"
                mt="-10"
                ml="-7"
                width="55px"
              >
                {leftValue} 만
              </RangeSliderMark>
              <RangeSliderMark
                value={rightValue}
                textAlign="center"
                bg="gray.500"
                color="white"
                mt="-10"
                ml="-7"
                width="55px"
              >
                {rightValue} 만
              </RangeSliderMark>
              <RangeSliderTrack bg="red.100">
                <RangeSliderFilledTrack bg="tomato" />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
          </DrawerBody>
          <br />
          <Button fontWeight="700" onClick={onClose}>
            S e a r c h
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default HouseList;
