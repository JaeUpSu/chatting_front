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

function OptionRangeSlider({ idx, name, label, onUpdate }) {
  //   const [values, setValues] = useState(moneyDefaults[name]);
  const [values, setValues] = useState([0, 10]);
  const [range, setRange] = useState("");

  const moneyRange = options[name].values;
  const labels = options[name].labels;

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  useEffect(() => {
    setRange(getPriceRange(values, options[name].steps));
  }, [values]);

  useEffect(() => {
    onUpdate((prices) => {
      const newPrices = prices.map((price, _idx) => {
        if (_idx == idx) {
          return getPrices(range);
        } else {
          return price;
        }
      });
      return newPrices;
    });
  }, [range]);

  return (
    <Box mt="20px">
      <Text fontWeight="bold" mb="10px" ml="-10px" fontSize="16px">
        {label}
        <Highlight
          query={range}
          styles={
            label.length < 3
              ? {
                  ml: "36px",
                  px: "2",
                  py: "1",
                  rounded: "full",
                  bg: "red.100",
                  fontSize: "15px",
                }
              : {
                  ml: "20px",
                  px: "2",
                  py: "1",
                  rounded: "full",
                  bg: "red.100",
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
        defaultValue={values}
        min={0}
        max={30}
        step={1}
        w="480px"
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
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb
          max={values[0] - 10}
          boxSize={8}
          index={0}
          boxShadow="0 0 1px 1px"
        >
          <Box color="tomato" position="absolute" left={0}>
            min
          </Box>
        </RangeSliderThumb>
        <RangeSliderThumb
          min={values[1] + 10}
          boxSize={8}
          index={1}
          boxShadow="0 0 1px 1px"
          ml={`12px`}
        >
          <Box color="tomato" position="absolute" left={0}>
            max
          </Box>
        </RangeSliderThumb>
      </RangeSlider>
    </Box>
  );
}
export default OptionRangeSlider;
