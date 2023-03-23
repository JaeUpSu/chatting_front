import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Flex,
  FormErrorMessage,
  VStack,
  ButtonGroup,
  Text,
  Box,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { HouseRegisterValues } from "../../services/data";

function PriceForm({
  setUpdatedHouse,
  setUpdatedData,
  sellKind,
  values,
  names,
  labeles,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModify, setIsModify] = useState(false);

  const onEnter = (data) => {
    console.log("check", data);

    let nextHouse = {};
    let nextData = {};
    let isChange = false;
    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (data[item.eng]) {
          if (data[item.eng] !== prevHouse[item.eng]) {
            nextHouse[item.eng] = Number(data[item.eng]) * 10000;
            isChange = true;
          } else {
            nextHouse[item.eng] = prevHouse[item.eng];
          }
        } else {
          nextHouse[item.eng] = prevHouse[item.eng];
        }
      });
      return nextHouse;
    });

    setUpdatedData((prevData) => {
      HouseRegisterValues.forEach((item) => {
        if (data[item.eng]) {
          nextData[item.eng] = Number(data[item.eng]) * 10000;
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

  const onPrice = (money) => {
    const price = money / 10000;
    return String(price);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onEnter)}>
        <HStack w="40vw" minW="450px">
          <FormControl
            isInvalid={errors[names[0]]}
            id={names[0]}
            my="1"
            isDisabled={isModify ? (sellKind == "SALE" ? false : true) : true}
          >
            <FormLabel fontWeight="600">{labeles[0]}</FormLabel>
            {isModify ? (
              <Input
                w="100%"
                type="number"
                defaultValue={onPrice(Number(values[0] ? values[0] : 0))}
                {...register(names[0], {
                  required: sellKind == "SALE" ? true : false,
                })}
              />
            ) : (
              <Text
                w="100%"
                h="3.7vh"
                pl="3"
                border={"1px solid rgb(200,200,200, 0.3)"}
                borderRadius="md"
                lineHeight="10"
              >
                {onPrice(values[0])}
              </Text>
            )}
            <FormErrorMessage>{`${names[0]}를 입력하세요`}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors[names[1]]}
            id={names[1]}
            my="1"
            isDisabled={
              isModify
                ? sellKind == "CHARTER" || sellKind == "MONTHLY_RENT"
                  ? false
                  : true
                : true
            }
          >
            <FormLabel fontWeight="600">{labeles[1]}</FormLabel>
            {isModify ? (
              <Input
                w="100%"
                type="number"
                defaultValue={onPrice(values[1])}
                {...register(names[1], {
                  required:
                    sellKind == "CHARTER" || sellKind == "MONTHLY_RENT"
                      ? true
                      : false,
                })}
              />
            ) : (
              <Text
                w="100%"
                h="3.7vh"
                pl="3"
                border={"1px solid rgb(200,200,200, 0.3)"}
                borderRadius="md"
                lineHeight="10"
              >
                {onPrice(values[1])}
              </Text>
            )}
            <FormErrorMessage>{`${labeles[1]}을 입력하세요`}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors[names[2]]}
            id={names[2]}
            my="1"
            isDisabled={
              isModify ? (sellKind == "MONTHLY_RENT" ? false : true) : true
            }
          >
            <FormLabel fontWeight="600">{labeles[2]}</FormLabel>
            <HStack>
              {isModify ? (
                <Input
                  w="100%"
                  type="number"
                  defaultValue={onPrice(values[2])}
                  {...register(names[2], {
                    required: sellKind == "MONTHLY_RENT" ? true : false,
                  })}
                />
              ) : (
                <Text
                  w="100%"
                  h="3.7vh"
                  pl="3"
                  border={"1px solid rgb(200,200,200, 0.3)"}
                  borderRadius="md"
                  lineHeight="10"
                >
                  {onPrice(values[2])}
                </Text>
              )}
            </HStack>
            <FormErrorMessage>{`${labeles[2]}를 입력하세요`}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors[names[3]]} id={names[3]} my="1">
            <FormLabel fontWeight="600">{labeles[3]}</FormLabel>
            {isModify ? (
              <Input
                w="100%"
                type="number"
                defaultValue={onPrice(Number(values[3] ? values[3] : 0))}
                {...register(names[3], { required: true })}
              />
            ) : (
              <Text
                w="100%"
                h="3.7vh"
                pl="3"
                border={"1px solid rgb(200,200,200, 0.3)"}
                borderRadius="md"
                lineHeight="10"
              >
                {onPrice(values[3])}
              </Text>
            )}
            <FormErrorMessage>{`관리비를 입력하세요`}</FormErrorMessage>
          </FormControl>
          <Box pt="8" justifyContent="flex-end" alignItems="flex-end">
            {isModify ? (
              <ButtonGroup>
                <Button type="submit">입력</Button>
                <Button onClick={onModify}>취소</Button>
              </ButtonGroup>
            ) : (
              <Button onClick={onModify}>수정</Button>
            )}
          </Box>
        </HStack>
      </form>
    </>
  );
}

export default PriceForm;
