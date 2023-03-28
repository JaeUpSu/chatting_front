import { useState } from "react";
import { Flex, Box, useRadio, useRadioGroup } from "@chakra-ui/react";

import { optionsMenu } from "../../services/data";

function RadioCard({ name, radio, onSelect }) {
  const { getInputProps, getCheckboxProps } = useRadio(radio);
  const [checked, setChecked] = useState(false);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const onRadio = () => {
    const value = sessionStorage.getItem(name);
    const idx = optionsMenu.findIndex((val) => val.eng === name);

    sessionStorage.setItem(name, input.value);
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
        backgroundColor="rgb(233,239,244)"
        cursor="pointer"
        fontWeight="600"
        fontSize="sm"
        borderRadius="md"
        _checked={{
          bg: "red.300",
          color: "white",
        }}
        px={3}
        py={2}
        w="25"
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
        ></Box>
        {radio.value}
      </Flex>
    </Box>
  );
}
function DrawerRadioCard({ name, valueName, data, defaultData, onUpdate }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: `${name}`,
    defaultValue: `${
      sessionStorage.getItem(valueName)
        ? sessionStorage.getItem(valueName)
        : defaultData
    }`,
  });

  const group = getRootProps();

  return (
    <Flex direction="column" w="100%">
      <Flex
        {...group}
        flexWrap="wrap"
        alignItems={"center"}
        justifyContent="flex-start"
        w="100%"
      >
        {data.map((value) => {
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
    </Flex>
  );
}

export default DrawerRadioCard;
