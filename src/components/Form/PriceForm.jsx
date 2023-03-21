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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { HouseRegisterValues } from "../../services/data";

function PriceForm({ setUpdatedHouse, sellKind, values, names, labeles }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModify, setIsModify] = useState(false);

  const onEnter = (data) => {
    console.log("check", data);

    let nextHouse = {};
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
      <Flex justifyContent="space-between" w="100%">
        <Text>가격</Text>
        <Text>(만원)</Text>
      </Flex>
      <form onSubmit={handleSubmit(onEnter)}>
        <HStack w="70vw">
          <FormControl
            isInvalid={errors[names[0]]}
            id={names[0]}
            my="1"
            isDisabled={isModify ? (sellKind == "SALE" ? false : true) : true}
          >
            <FormLabel fontWeight="600">{labeles[0]}</FormLabel>
            <HStack>
              {isModify ? (
                <Input
                  w="70%"
                  type="number"
                  defaultValue={onPrice(Number(values[0] ? values[0] : 0))}
                  {...register(names[0], {
                    required: sellKind == "SALE" ? true : false,
                  })}
                />
              ) : (
                <Text w="70%" h="5.2vh">
                  {onPrice(values[0])}
                </Text>
              )}
            </HStack>
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
            <HStack>
              {isModify ? (
                <Input
                  w="70%"
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
                <Text w="70%" h="5.2vh">
                  {onPrice(values[1])}
                </Text>
              )}
            </HStack>
            <FormErrorMessage>{`${labeles[1]}을 입력하세요`}</FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack w="70vw">
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
                  w="70%"
                  type="number"
                  defaultValue={onPrice(values[2])}
                  {...register(names[2], {
                    required: sellKind == "MONTHLY_RENT" ? true : false,
                  })}
                />
              ) : (
                <Text w="70%" h="5.2vh">
                  {onPrice(values[2])}
                </Text>
              )}
            </HStack>
            <FormErrorMessage>{`${labeles[2]}를 입력하세요`}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors[names[3]]}
            id={names[3]}
            my="1"
            isDisabled={isModify ? false : true}
          >
            <FormLabel fontWeight="600">{labeles[3]}</FormLabel>
            {isModify ? (
              <Input
                w="70%"
                type="number"
                defaultValue={onPrice(Number(values[3] ? values[3] : 0))}
                {...register(names[3], { required: true })}
              />
            ) : (
              <Text w="70%" h="5.2vh">
                {onPrice(values[3])}
              </Text>
            )}
            <FormErrorMessage>{`관리비를 입력하세요`}</FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack w="100%" mt="4" mb="6" justifyContent="flex-end">
          {isModify ? (
            <ButtonGroup>
              <Button type="submit">입력</Button>
              <Button onClick={onModify}>취소</Button>
            </ButtonGroup>
          ) : (
            <Button onClick={onModify}>수정</Button>
          )}
        </HStack>
      </form>
    </>
  );
}

export default PriceForm;
