import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  FormErrorMessage,
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
    setUpdatedHouse((prevHouse) => {
      HouseRegisterValues.forEach((item) => {
        if (prevHouse[item.eng]) {
          if (data[item.eng]) {
            nextHouse[item.eng] = data[item.eng];
          } else {
            nextHouse[item.eng] = prevHouse[item.eng];
          }
        }
      });
      return nextHouse;
    });
  };

  const onModify = () => {
    setIsModify(!isModify);
  };

  return (
    <form onSubmit={handleSubmit(onEnter)}>
      <FormControl isInvalid={errors[name]} id={name} my="1" w="60vw">
        <FormLabel fontWeight="600">{label}</FormLabel>
        {isModify ? (
          <HStack>
            <Input
              type="text"
              defaultValue={value}
              {...register(name, { required: true })}
            />
            <Button type="submit">입력</Button>
            <Button onClick={onModify}>취소</Button>
          </HStack>
        ) : (
          <HStack my="4">
            <Text>{value}</Text>
            <Button position="absolute" right="1%" onClick={onModify}>
              수정
            </Button>
          </HStack>
        )}
        <FormErrorMessage>{`${label}을 적어주세요`}</FormErrorMessage>
      </FormControl>
    </form>
  );
};

export default SingleForm;
