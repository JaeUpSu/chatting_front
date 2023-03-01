import {
  HStack,
  Box,
  useCheckbox,
  useCheckboxGroup,
  Text,
  Flex,
} from "@chakra-ui/react";

import { useEffect } from "react";
function CheckBoxCard(props) {
  const { getCheckboxProps, getInputProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

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
          bg: "blue.700",
          color: "white",
          borderColor: "blue.700",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={4}
        py={2}
      >
        {props.value}
      </Box>
    </Box>
  );
}
function DataCheckBoxCard({ name, valueName, data }) {
  const _data = localStorage.getItem(valueName);

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: `${_data}`.split(","),
  });

  useEffect(() => {
    localStorage.setItem(valueName, value);
  }, [value]);

  return (
    <Box>
      <Text fontWeight="bold" mb="10px">
        {name}
      </Text>
      <HStack>
        {data.map((item) => {
          const checkbox = getCheckboxProps({ value: item });
          return (
            <CheckBoxCard key={item} name={name} {...checkbox}>
              {item}
            </CheckBoxCard>
          );
        })}
      </HStack>
    </Box>
  );
}

export default DataCheckBoxCard;
