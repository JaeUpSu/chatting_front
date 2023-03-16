import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { getPrices } from "../../utils/getPrices";

function OptionRangeSlider({ idx, names, onUpdate }) {
  const [values, setValues] = useState(
    sessionStorage.getItem(names.eng)
      ? sessionStorage.getItem(names.eng).split(",")
      : [0, 30]
  );
  const [range, setRange] = useState("");

  const labels = options[names.eng].labels;

  const handleChange = (newValues) => {
    setValues(newValues);
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
  }, [range]);

  return (
    <Box my="20px">
      <Text fontWeight="bold" mb="10px" ml="-10px" fontSize="17px">
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
                  bg: "red.700",
                  color: "white",
                  fontSize: "15px",
                }
              : {
                  ml: "20px",
                  px: "3",
                  py: "2",
                  rounded: "full",
                  bg: "red.700",
                  color: "white",
                  fontSize: "15px",
                }
          }
        >
          {range}
        </Highlight>
      </Text>
      <RangeSlider
        mt="10px"
        mx="10px"
        defaultValue={values[0] ? values : [0, 30]}
        min={0}
        max={30}
        step={1}
        w="35vw"
        onChange={handleChange}
        position="relative"
      >
        {" "}
        {labels.map((item, idx) => {
          return (
            <RangeSliderMark key={idx} value={idx * 10} mt="16px" w="100%">
              {item}
            </RangeSliderMark>
          );
        })}
        <RangeSliderTrack bg="red.100">
          <RangeSliderFilledTrack bg="red.700" ml="10px" />
        </RangeSliderTrack>
        <RangeSliderThumb
          max={values[0] ? values[0] - 10 : -10}
          value={values[0] ? values[0] : 0}
          boxSize={8}
          index={0}
          border="2px solid black"
          ml={`11px`}
        >
          <Box color="red.700" position="absolute" left={0} fontWeight="600">
            min
          </Box>
        </RangeSliderThumb>
        <RangeSliderThumb
          min={values[0] ? values[1] + 10 : 10}
          value={values[0] ? values[1] : 30}
          boxSize={8}
          index={1}
          border="2px solid black"
          ml={`20px`}
        >
          <Box color="red.700" position="absolute" left={0} fontWeight="600">
            max
          </Box>
        </RangeSliderThumb>
      </RangeSlider>
    </Box>
  );
}
export default OptionRangeSlider;
