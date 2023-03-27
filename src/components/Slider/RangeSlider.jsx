import { useEffect, useRef, useState } from "react";
import { options } from "../../services/data";
import { getPriceRange } from "../../utils/getPriceRange";

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Text,
  Box,
  Highlight,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import { getPrices } from "../../utils/getPrices";

function OptionRangeSlider({ idx, names, onUpdate }) {
  const [values, setValues] = useState(
    sessionStorage.getItem(names.eng)
      ? sessionStorage.getItem(names.eng).split(",")
      : [0, 30]
  );
  const [range, setRange] = useState("");
  const [isFetch, setFetch] = useState(false);

  const labels = options[names.eng].labels;

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  const handleFetch = () => {
    console.log("fetch", values);
    setFetch(!isFetch);
  };

  useEffect(() => {
    sessionStorage.setItem(names.eng, values);
    setRange(getPriceRange(values, options[names.eng].steps));
  }, [values]);

  useEffect(() => {
    onUpdate((prices) => {
      const newPrices = prices.map((price, _idx) => {
        if (_idx == idx) {
          const newPrice = getPrices(range);
          return newPrice;
        } else {
          return price;
        }
      });
      return newPrices;
    });
  }, [isFetch]);

  return (
    <Box mx="2vw" my="2vh">
      <HStack justifyContent="space-between" w="100%">
        <Text fontWeight="bold" fontSize="17px">
          {names.kor}
          <Highlight
            query={range}
            styles={
              names.kor.length < 3
                ? {
                    ml: "36px",
                    px: "3",
                    py: "2",
                    rounded: "full",
                    color: "gray",
                    fontSize: "15px",
                  }
                : {
                    ml: "20px",
                    px: "3",
                    py: "2",
                    rounded: "full",
                    color: "gray",
                    fontSize: "15px",
                  }
            }
          >
            {range}
          </Highlight>
        </Text>
        <Button colorScheme="red" size="sm" onClick={handleFetch}>
          Search
        </Button>
      </HStack>
      <RangeSlider
        mt="20px"
        mb="20px"
        mx="10px"
        defaultValue={values[0] ? values : [0, 30]}
        min={0}
        max={30}
        step={1}
        w="450px"
        onChange={handleChange}
      >
        {labels.map((item, idx) => {
          return (
            <RangeSliderMark key={idx} value={idx * 10} mt="16px" w="100%">
              {item}
            </RangeSliderMark>
          );
        })}
        <RangeSliderTrack bg="red.100" ml="10px">
          <RangeSliderFilledTrack bg="red.200" w="100%" />
        </RangeSliderTrack>
        <RangeSliderThumb
          max={values[0] ? values[0] - 10 : -10}
          value={values[0] ? values[0] : 0}
          boxSize={5}
          index={0}
          bg="red.400"
          mr={`20px`}
        />
        <RangeSliderThumb
          min={values[0] ? values[1] + 10 : 10}
          value={values[0] ? values[1] : 30}
          boxSize={5}
          index={1}
          bg="red.400"
          ml={`20px`}
        />
      </RangeSlider>
    </Box>
  );
}
export default OptionRangeSlider;
