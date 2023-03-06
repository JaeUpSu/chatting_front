import {
  Flex,
  HStack,
  Box,
  useRadio,
  useRadioGroup,
  Text,
} from "@chakra-ui/react";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { optionsMenu } from "../../services/data";

function RadioCard({ name, radio, onSelect }) {
  const { getInputProps, getCheckboxProps } = useRadio(radio);
  const [checked, setChecked] = useState(false);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const onRadio = () => {
    const value = localStorage.getItem(name);
    const idx = optionsMenu.findIndex((val) => val.eng === name);

    localStorage.setItem(name, input.value);
    if (input.value != value) {
      setChecked(!checked);
    }

    onSelect((opts) => {
      const newOpts = opts.map((item, i) => {
        if (idx != i) {
          return item;
        } else {
          return input.value;
        }
      });
      return newOpts;
    });
  };

  return (
    <Box as="label" m="5px">
      <input {...input} />
      <Flex
        {...checkbox}
        backgroundColor="white"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "red.300",
          color: "white",
          borderColor: "red.300",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={3}
        py={2}
        w="32"
        onClick={onRadio}
        justifyContent="center"
        position="relative"
      >
        <Box
          {...checkbox}
          opacity="0"
          position="absolute"
          left="10px"
          _checked={{
            opacity: "1",
          }}
          _focus={{ opacity: "1" }}
        >
          <FontAwesomeIcon
            size="lg"
            icon={faCheck}
            style={{ marginRight: "10px" }}
          />{" "}
        </Box>
        {radio.value}
      </Flex>
    </Box>
  );
}
function DataRadioCard({ name, valueName, data, defaultData, onUpdate }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: `${name}`,
    defaultValue: `${defaultData}`,
  });

  const group = getRootProps();

  return (
    <Box>
      <Text fontWeight="bold" mb="10px">
        {name}
      </Text>
      <Flex {...group} flexWrap="wrap">
        {data.map((value, idx) => {
          const radio = getRadioProps({ value });

          return (
            <RadioCard
              key={value}
              name={valueName}
              radio={radio}
              onSelect={onUpdate}
            >
              {value}
            </RadioCard>
          );
        })}
      </Flex>
    </Box>
  );
}

export default DataRadioCard;
