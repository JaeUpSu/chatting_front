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
import { isLocal } from "../../services/local";

function RadioCard({ name, radio }) {
  const { getInputProps, getCheckboxProps } = useRadio(radio);
  const [checked, setChecked] = useState(false);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const onRadio = () => {
    const value = localStorage.getItem(name);
    localStorage.setItem(name, input.value);
    if (input.value != value) {
      setChecked(!checked);
    }
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
        w="120px"
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
function DataRadioCard({ name, valueName, data, defaultData }) {
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
            <RadioCard key={value} name={valueName} radio={radio}>
              {value}
            </RadioCard>
          );
        })}
      </Flex>
    </Box>
  );
}

export default DataRadioCard;
