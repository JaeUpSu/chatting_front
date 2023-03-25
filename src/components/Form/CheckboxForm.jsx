import {
  Button,
  HStack,
  VStack,
  FormLabel,
  FormControl,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { HouseRegisterValues } from "../../services/data";
import { isSameOptions } from "../../utils/isSameOptions";
import {
  getProcessOptionsToBack,
  getProcessOptionsToFront,
} from "../../utils/getProcessOptions";

const CheckboxForm = ({
  setUpdatedHouse,
  setUpdatedData,
  values,
  name,
  label,
  api,
}) => {
  const [options, setOptions] = useState([]);
  const [isInit, setIsInit] = useState(true);
  const [isModify, setIsModify] = useState(false);

  const optionsData = useQuery([name], api);

  const onEnter = () => {
    let nextHouse = {};
    let nextData = {};
    let isChange = false;

    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (item.eng == name) {
          if (prevHouse[item.eng]) {
            if (!isSameOptions(options, prevHouse[item.eng])) {
              nextHouse[item.eng] = getProcessOptionsToBack(options);
              isChange = true;
            } else {
              nextHouse[item.eng] = prevHouse[item.eng];
            }
          } else {
            nextHouse[item.eng] = getProcessOptionsToBack(options);
            isChange = true;
          }
        } else {
          nextHouse[item.eng] = prevHouse[item.eng];
        }
      });
      return nextHouse;
    });

    setUpdatedData((prevData) => {
      HouseRegisterValues.forEach((item) => {
        if (item.eng === name) {
          nextData[item.eng] = getProcessOptionsToBack(options, []);
        } else if (prevData[item.eng]) {
          nextData[item.eng] = prevData[item.eng];
        }
      });
      return nextData;
    });
    if (isChange) {
      setIsModify(false);
    }
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  useEffect(() => {
    if (values && isInit) {
      setOptions(getProcessOptionsToFront(values));
      setIsInit(false);
    }
  }, [values]);

  return (
    <VStack w="40vw" minW="450px">
      <FormLabel marginBottom="0px" w="100%" fontWeight="600" minW="450px">
        {label}
      </FormLabel>
      <form>
        <FormControl id={name} my="1" w="40vw" minW="450px">
          <FormControl id={`${name}`} mt="2" mb="7" w="45vw">
            <CheckboxGroup
              colorScheme="green"
              value={options}
              onChange={(values) => setOptions(values)}
              isDisabled={!isModify}
            >
              {optionsData?.data?.map((item, idx) => {
                return (
                  <Checkbox
                    key={idx}
                    value={item.name}
                    mx="3"
                    minW="110px"
                    w="13vw"
                    h="5vh"
                  >
                    {item.name}
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          </FormControl>

          {isModify ? (
            <HStack w="100%" justifyContent="flex-end">
              <Button onClick={onEnter} w="5vw">
                입력
              </Button>
              <Button onClick={onModify} w="5vw">
                취소
              </Button>
            </HStack>
          ) : (
            <HStack w="100%" justifyContent="flex-end">
              <Button onClick={onModify} w="5.5vw">
                수정
              </Button>
            </HStack>
          )}
        </FormControl>
      </form>
    </VStack>
  );
};

export default CheckboxForm;
