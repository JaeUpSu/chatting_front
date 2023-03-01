import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Box,
  Heading,
  Highlight,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../../services/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import DataRadio from "../Radio/Radio";
import DataRadioCard from "../Radio/RadioCard";
import DataCheckBox from "../CheckBox/CheckBox";
import DataCheckBoxCard from "../CheckBox/CheckBoxCard";

function OptionDropdown() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("");

  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(50);
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

    const cellKind = localStorage.getItem("cellKind");
    if (cellKind !== undefined && cellKind !== "undefined") {
      localStorage.setItem("cellKind", options.cellKind[0]);
      localStorage.setItem("room_counts", options.room_counts[0]);
      localStorage.setItem("toilet_counts", options.toilet_counts[0]);
      localStorage.setItem("isStationArea", options.isStationArea[0]);
    }
  }, []);

  const onMenuClose = () => {
    localStorage.setItem("isOption", true);
    onClose();
  };

  return (
    <>
      {" "}
      <FontAwesomeIcon
        size={"2x"}
        icon={faSliders}
        onClick={onOpen}
        cursor="pointer"
      />
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Heading lineHeight="tall" w="600px">
              <Highlight
                query={address}
                styles={{
                  mx: "10",
                  px: "2",
                  py: "1",
                  rounded: "full",
                  bg: "red.100",
                  fontSize: "23px",
                }}
              >
                {`House Option ${address}`}
              </Highlight>
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <br />
            <DataCheckBoxCard
              name={`매매 종류 (복수 선택 가능)`}
              valueName="cellKind"
              data={options.cellKind}
            />
            <br />
            <DataRadioCard
              name="방"
              valueName="room_counts"
              data={options.room_counts}
            />
            <br />
            <DataRadioCard
              name="화장실"
              valueName="toilet_counts"
              data={options.toilet_counts}
            />
            <br />
            <DataRadioCard
              name="역세권"
              valueName="isStationArea"
              data={options.isStationArea}
            />
            <br />
            <br />
            <br />
            <RangeSlider
              defaultValue={[0, 50]}
              min={0}
              max={350}
              step={10}
              w="500px"
              onChange={(val) => {
                setLeftValue(val[0]);
                setRightValue(val[1]);
              }}
            >
              {options.priceArr.map((item, idx) => {
                return (
                  <RangeSliderMark
                    key={idx}
                    value={item === "300+" ? 350 : item}
                  >
                    {item}
                  </RangeSliderMark>
                );
              })}
              <RangeSliderMark
                value={leftValue}
                textAlign="center"
                bg="gray.500"
                color="white"
                mt="-12"
                ml="-7"
                width="55px"
              >
                {leftValue > 300 ? "300 만" : leftValue + " 만"}
              </RangeSliderMark>
              <RangeSliderMark
                value={rightValue}
                textAlign="center"
                bg="gray.500"
                color="white"
                mt="-12"
                ml="-7"
                width="55px"
              >
                {rightValue > 300 ? "~" : rightValue + " 만"}
              </RangeSliderMark>
              <RangeSliderTrack bg="red.100">
                <RangeSliderFilledTrack bg="tomato" />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={8} index={0} boxShadow="0 0 1px 1px">
                <Box color="tomato">min</Box>
              </RangeSliderThumb>
              <RangeSliderThumb boxSize={8} index={1} boxShadow="0 0 1px 1px">
                <Box color="tomato">max</Box>
              </RangeSliderThumb>
            </RangeSlider>
          </DrawerBody>
          <br />
          <Button fontWeight="700" onClick={onMenuClose}>
            S e a r c h
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default OptionDropdown;
