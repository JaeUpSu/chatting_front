import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HouseRegisterValues } from "../../services/data";

const TripleForm = ({
  setUpdatedHouse,
  setUpdatedData,
  values,
  names,
  labeles,
}) => {
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
            nextHouse[item.eng] = data[item.eng];
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
          nextData[item.eng] = data[item.eng];
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

  return (
    <HStack w="40vw" alignItems="center">
      {isModify ? (
        <form onSubmit={handleSubmit(onEnter)}>
          <HStack alignItems="center">
            <FormControl isInvalid={errors[names[0]]} id={names[0]} my="1">
              <FormLabel marginBottom="0px" fontWeight="600">
                {labeles[0]}
              </FormLabel>
              <Input
                type="text"
                defaultValue={values[0]}
                {...register(names[0], { required: true })}
              />
              <FormErrorMessage>{`${labeles[0]}을 적어주세요`}</FormErrorMessage>
            </FormControl>{" "}
            <FormControl isInvalid={errors[names[1]]} id={names[1]} my="1">
              <FormLabel marginBottom="0px" fontWeight="600">
                {labeles[1]}
              </FormLabel>
              <Input
                type="text"
                defaultValue={values[1]}
                {...register(names[1], { required: true })}
              />
              <FormErrorMessage>{`${labeles[1]}을 적어주세요`}</FormErrorMessage>
            </FormControl>{" "}
            <FormControl isInvalid={errors[names[2]]} id={names[2]} my="1">
              <FormLabel marginBottom="0px" fontWeight="600">
                {labeles[2]}
              </FormLabel>
              <Input
                type="text"
                defaultValue={values[2]}
                {...register(names[2], { required: true })}
              />
              <FormErrorMessage>{`${labeles[2]}을 적어주세요`}</FormErrorMessage>
            </FormControl>
            <HStack alignItems="center">
              <Button type="submit">입력</Button>
              <Button onClick={onModify}>취소</Button>
            </HStack>
          </HStack>
        </form>
      ) : (
        <VStack w="40vw" h="5.3vh">
          <HStack w="40vw" justifyContent="space-between">
            <Text
              w="70%"
              h="3.7vh"
              pl="3"
              border={"1px solid rgb(200,200,200, 0.3)"}
              borderRadius="md"
              lineHeight="10"
            >
              {values[0]}
            </Text>

            <Text
              w="70%"
              h="3.7vh"
              pl="3"
              border={"1px solid rgb(200,200,200, 0.3)"}
              borderRadius="md"
              lineHeight="10"
            >
              {values[1]}
            </Text>

            <Text
              w="70%"
              h="3.7vh"
              pl="3"
              border={"1px solid rgb(200,200,200, 0.3)"}
              borderRadius="md"
              lineHeight="10"
            >
              {values[2]}
            </Text>
            <Button onClick={onModify}>수정</Button>
          </HStack>
        </VStack>
      )}
    </HStack>
  );
};

export default TripleForm;
