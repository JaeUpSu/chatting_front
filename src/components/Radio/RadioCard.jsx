import { HStack, Box, useRadio, useRadioGroup, Text } from "@chakra-ui/react";

import { useEffect } from "react";
function RadioCard({ name, radio }) {
  const { getInputProps, getCheckboxProps } = useRadio(radio);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const onRadio = () => {
    console.log(name + " => " + input.value);
    localStorage.setItem(name, input.value);
  };

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
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
        px={4}
        py={2}
        onClick={onRadio}
      >
        {radio.value}
      </Box>
    </Box>
  );
}
function DataRadioCard({ name, valueName, data }) {
  const _data = localStorage.getItem(valueName);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: `${name}`,
    defaultValue: `${_data}`,
  });

  const group = getRootProps();

  // useEffect(() => {
  // }, [value]);

  return (
    <Box>
      <Text fontWeight="bold" mb="10px">
        {name}
      </Text>
      <HStack {...group}>
        {data.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} name={valueName} radio={radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </Box>
  );
}

export default DataRadioCard;
