import { useState } from "react";
import { options } from "../../services/data";
import { moneyStepRange } from "../../services/data";

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Text,
  Box,
  Highlight,
} from "@chakra-ui/react";

function OptionRangeSlider({ name, label, able }) {
  //   const [values, setValues] = useState(moneyDefaults[name]);
  const [values, setValues] = useState([0, 50]);
  const [steps, setSteps] = useState(options[name].steps);
  const [moneyRange, setMoneyRange] = useState(options[name].values);
  const [labels, setLabels] = useState(options[name].labels);

  const step = 10;

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <Box mt="20px">
      <Text fontWeight="bold" mb="10px" ml="-10px">
        {label}{" "}
        <Highlight
          query={`${values[0]} 만 ~ ${values[1]} 만`}
          styles={{
            ml: "20px",
            px: "2",
            py: "1",
            rounded: "full",
            bg: "red.100",
            fontSize: "15px",
          }}
        >{`${values[0]} 만 ~ ${values[1]} 만`}</Highlight>
      </Text>
      <RangeSlider
        mt="10px"
        mx="10px"
        defaultValue={values}
        min={moneyRange[0]}
        max={moneyRange[1]}
        step={steps[0]}
        w="480px"
        onChange={handleChange}
        position="relative"
        isDisabled={able}
      >
        {labels.map((item, idx) => {
          return (
            <RangeSliderMark
              key={idx}
              value={idx * 16.2 * steps[1]}
              mt="16px"
              w="100%"
              pos="absolute"
            >
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
