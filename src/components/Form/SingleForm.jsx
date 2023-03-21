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

const SingleForm = ({ setUpdatedHouse, value, name, label }) => {
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
    if (isChange) {
      setIsModify(false);
    }
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  return (
    <>
      <FormLabel marginBottom="0px" w="60vw" fontWeight="600">
        {label}
      </FormLabel>
      {isModify ? (
        <form onSubmit={handleSubmit(onEnter)}>
          <FormControl isInvalid={errors[name]} id={name} my="1" w="60vw">
            <HStack>
              <Input
                type="text"
                defaultValue={value}
                {...register(name, { required: true })}
              />
              <Button type="submit">입력</Button>
              <Button onClick={onModify}>취소</Button>
            </HStack>
            <FormErrorMessage>{`${label}을 적어주세요`}</FormErrorMessage>
          </FormControl>
        </form>
      ) : (
        <VStack w="60vw">
          <HStack w="60vw" justifyContent="space-between">
            <Text w="70%">{value}</Text>
            <Button onClick={onModify}>수정</Button>
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default SingleForm;
