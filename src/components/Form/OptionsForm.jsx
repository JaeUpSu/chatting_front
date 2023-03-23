import { additionalOptions, safetyOptions } from "../../services/data";

import {
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

export default function OptionsForm() {
  return (
    <>
      {" "}
      <FormControl id="additionalOptions" mt="2" mb="7" w="45vw">
        <FormLabel>추가옵션</FormLabel>
        <CheckboxGroup colorScheme="green">
          {additionalOptions.map((item, idx) => {
            if ((idx + 1) % 3 === 0) {
              return (
                <>
                  <Checkbox
                    key={idx}
                    value={item}
                    mx="3"
                    w="13vw"
                    h="5vh"
                    minW="110px"
                  >
                    {item}
                  </Checkbox>
                  <br />
                </>
              );
            } else {
              return (
                <Checkbox key={idx} mx="3" w="13vw" minW="110px" h="5vh">
                  {item}
                </Checkbox>
              );
            }
          })}
        </CheckboxGroup>
      </FormControl>
      <Divider
        borderWidth="1.2px"
        my="5"
        borderColor="blackAlpha.400"
        w="40vw"
      />
      <FormControl id="safetyOptions" mt="2" mb="7" w="45vw">
        <FormLabel>안전옵션</FormLabel>
        <CheckboxGroup colorScheme="green">
          {safetyOptions.map((item, idx) => {
            if ((idx + 1) % 3 === 0) {
              return (
                <>
                  <Checkbox
                    key={idx}
                    value={item}
                    mx="3"
                    w="13vw"
                    minW="110px"
                    h="5vh"
                  >
                    {item}
                  </Checkbox>
                  <br />
                </>
              );
            } else {
              return (
                <Checkbox key={idx} mx="3" minW="110px" w="13vw" h="5vh">
                  {item}
                </Checkbox>
              );
            }
          })}
        </CheckboxGroup>
      </FormControl>
    </>
  );
}
