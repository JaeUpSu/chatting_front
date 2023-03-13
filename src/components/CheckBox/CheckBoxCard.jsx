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
  // const _data = sessionStorage.getItem(valueName);

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: `${data[0]}`.split(","),
  });

  const onCheck = (e) => {
    const _value =
      e.currentTarget.children[0].children[0].getAttribute("value");
    console.log(_value);
    console.log(value);
    console.log(getCheckboxProps());
    sessionStorage.setItem(valueName, value);
  };

  return (
    <Box>
      <Text fontWeight="bold" mb="10px">
        {name}
      </Text>
      <HStack>
        {data.map((item) => {
          const checkbox = getCheckboxProps({ value: item });
          return (
            <div key={item} onClick={onCheck}>
              {" "}
              <CheckBoxCard name={name} {...checkbox}>
                {item}
              </CheckBoxCard>
            </div>
          );
        })}
      </HStack>
    </Box>
  );
}

export default DataCheckBoxCard;
